"""Rule-based chatbot for Keshav's portfolio.

All of the *content* (bio, experience, project blurbs, skills, links, small-talk
replies) lives in ``knowledge.json`` — this module is only the matching engine.
To change what the bot says, edit the JSON; no code change needed.

How matching works: the user's message is scored against every topic in the
knowledge base using

* phrase containment on a normalised string (multi-word cues),
* token containment for single words,
* fuzzy token matching (``difflib``) so typos still land ("langchian",
  "freequadamy", "postgre").

The best-scoring topic wins. Several strongly-matching *combinable* topics (the
skill areas) get merged into one reply. A weak best score returns a
"did you mean …" prompt instead of a blind guess.

Public API is unchanged: ``generate_chat_response(str) -> str``.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass
from difflib import SequenceMatcher
from pathlib import Path

KNOWLEDGE_FILE = Path(__file__).with_name("knowledge.json")


@dataclass(frozen=True)
class Topic:
    id: str
    title: str
    answer: str
    keywords: tuple[tuple[str, float], ...] = ()
    aliases: tuple[str, ...] = ()
    combinable: bool = False


@dataclass(frozen=True)
class SmallTalkRule:
    answer: str
    equals: frozenset[str] = frozenset()
    tokens: frozenset[str] = frozenset()
    starts: tuple[str, ...] = ()
    contains: tuple[str, ...] = ()


@dataclass(frozen=True)
class KnowledgeBase:
    topics: tuple[Topic, ...]
    smalltalk: tuple[SmallTalkRule, ...]
    fallback: str
    weak_match: str
    merge_joiner: str


def _load_knowledge(path: Path = KNOWLEDGE_FILE) -> KnowledgeBase:
    try:
        raw = json.loads(path.read_text("utf-8"))
    except (OSError, json.JSONDecodeError) as exc:  # pragma: no cover
        raise RuntimeError(f"Cannot load knowledge base at {path}: {exc}") from exc

    links: dict[str, str] = raw.get("links", {})

    def fill(text: str) -> str:
        for key, value in links.items():
            text = text.replace("{" + key + "}", value)
        return text

    topics = tuple(
        Topic(
            id=t["id"],
            title=t["title"],
            answer=fill(t["answer"]),
            keywords=tuple((k[0], float(k[1])) for k in t.get("keywords", [])),
            aliases=tuple(t.get("aliases", [])),
            combinable=bool(t.get("combinable", False)),
        )
        for t in raw.get("topics", [])
    )

    smalltalk = tuple(
        SmallTalkRule(
            answer=fill(r["answer"]),
            equals=frozenset(r.get("equals", [])),
            tokens=frozenset(r.get("tokens", [])),
            starts=tuple(r.get("starts", [])),
            contains=tuple(r.get("contains", [])),
        )
        for r in raw.get("smalltalk", [])
    )

    resp = raw.get("responses", {})
    return KnowledgeBase(
        topics=topics,
        smalltalk=smalltalk,
        fallback=fill(resp.get("fallback", "Sorry, I don't have an answer for that.")),
        weak_match=fill(
            resp.get(
                "weak_match",
                "I'm not sure — did you mean {options}?",
            )
        ),
        merge_joiner=resp.get("merge_joiner", " "),
    )


_KB = _load_knowledge()


# --------------------------------------------------------------------------
# Matching engine
# --------------------------------------------------------------------------
_NORM_RE = re.compile(r"[^a-z0-9.+#/\- ]+")
_TOKEN_RE = re.compile(r"[a-z0-9.+#]+")

# short filler tokens that should never drive fuzzy matches
_STOP = frozenset(
    "a an the is are was were be been being do does did i you he she it we they "
    "me him her us them my your his our their to of in on at for with about and "
    "or but so as by from this that these those what which who whom whose how "
    "why when where can could would should will shall may might must have has "
    "had tell me more please give know want".split()
)


def _normalize(text: str) -> str:
    t = (text or "").lower().replace("'", "").replace("’", "")
    t = _NORM_RE.sub(" ", t)
    return re.sub(r"\s+", " ", t).strip()


def _fuzzy(token: str, target: str) -> float:
    """Similarity in [0, 1] for near-miss / typo tokens, else 0."""
    if len(token) < 4 or len(target) < 4:
        return 0.0
    if abs(len(token) - len(target)) > 3:
        return 0.0
    ratio = SequenceMatcher(None, token, target).ratio()
    return ratio if ratio >= 0.84 else 0.0


def _score(topic: Topic, norm: str, tokens: list[str], tokenset: set[str]) -> float:
    score = 0.0
    for alias in topic.aliases:
        if alias in norm:
            score += 4.5

    # Pass 1 — exact phrase / token hits.
    exact: set[str] = set()
    fuzzy_terms: list[tuple[str, float]] = []
    for phrase, weight in topic.keywords:
        if " " in phrase or "-" in phrase or "/" in phrase:
            if phrase in norm:
                score += weight
            continue
        if phrase in tokenset:
            score += weight
            exact.add(phrase)
        else:
            fuzzy_terms.append((phrase, weight))

    # Pass 2 — typo-tolerant hits, ignoring tokens already credited exactly
    # (stops "project" also fuzzy-matching the "projects" keyword, etc.).
    for phrase, weight in fuzzy_terms:
        best = 0.0
        for tok in tokens:
            if tok in _STOP or tok in exact:
                continue
            best = max(best, _fuzzy(tok, phrase))
            if best == 1.0:
                break
        if best:
            score += weight * 0.85 * best
    return score


def _oxford(items: list[str]) -> str:
    if len(items) == 1:
        return items[0]
    if len(items) == 2:
        return f"{items[0]} or {items[1]}"
    return ", ".join(items[:-1]) + f", or {items[-1]}"


def _tok_align(a: str, b: str) -> bool:
    """`a` (a word from the user) lines up with `b` (a word from a phrase):
    identical, a truncation of it ("y" → "you"), or a small typo ("wat" → "what")."""
    if a == b:
        return True
    if a and b.startswith(a) and len(b) - len(a) <= 3:
        return True
    return len(a) >= 3 and len(b) >= 3 and SequenceMatcher(None, a, b).ratio() >= 0.8


def _near_phrase(phrase: str, norm: str) -> bool:
    """True if `norm` is basically `phrase` with a typo or a dropped/partial
    word — "how are y" ≈ "how are you". The first *and* last words must line
    up, so "what do you do" is not read as "what do you know" / "what can you
    do", and "where do you work" is not read as "how do you work"."""
    if phrase in norm:
        return True
    if len(phrase) < 5 or abs(len(norm) - len(phrase)) > 5:
        return False
    pt, nt = phrase.split(), norm.split()
    if not pt or not nt:
        return False
    if not _tok_align(nt[0], pt[0]) or not _tok_align(nt[-1], pt[-1]):
        return False
    return SequenceMatcher(None, phrase, norm).ratio() >= 0.84


def _near_token(word: str, tokens: list[str]) -> bool:
    """Exact for tiny words ("hi", "yo"), fuzzy for longer ("helo"→"hello")."""
    if len(word) < 4:
        return word in tokens
    return any(
        t == word or (len(t) >= 3 and SequenceMatcher(None, word, t).ratio() >= 0.8)
        for t in tokens
    )


def _smalltalk(norm: str, tokens: list[str], tokenset: set[str]) -> str | None:
    for rule in _KB.smalltalk:
        if (
            (rule.equals and (norm in rule.equals
                              or any(_near_phrase(e, norm) for e in rule.equals)))
            or (rule.tokens and (tokenset & rule.tokens
                                 or any(_near_token(w, tokens) for w in rule.tokens)))
            or (rule.starts and norm.startswith(rule.starts))
            or any(_near_phrase(sub, norm) for sub in rule.contains)
        ):
            return rule.answer
    return None


def generate_chat_response(user_message: str) -> str:
    norm = _normalize(user_message)
    if not norm:
        return _KB.fallback

    tokens = _TOKEN_RE.findall(norm)
    tokenset = set(tokens)

    small = _smalltalk(norm, tokens, tokenset)
    if small:
        return small

    ranked = sorted(
        ((_score(t, norm, tokens, tokenset), t) for t in _KB.topics),
        key=lambda pair: pair[0],
        reverse=True,
    )
    top_score, top = ranked[0]

    # Nothing meaningful matched.
    if top_score < 1.5:
        near = [t.title for s, t in ranked if s >= 0.7][:3]
        if near:
            return _KB.weak_match.format(options=_oxford(near))
        return _KB.fallback

    # Merge several strong skill-area hits into one reply.
    if top.combinable:
        picks = [
            t for s, t in ranked
            if t.combinable and s >= max(1.8, top_score * 0.6)
        ][:3]
        if len(picks) > 1:
            return _KB.merge_joiner.join(p.answer for p in picks)

    return top.answer
