"""Rule-based chatbot for Keshav's portfolio.

Ported from the previous Express implementation. Ordering matters: more
specific / substring-prone branches are checked first (e.g. "blockchain"
contains the substring "ai", so Web3 is matched before the AI branch).
"""
from __future__ import annotations


def generate_chat_response(user_message: str) -> str:
    msg = (user_message or "").lower().strip()

    def has(*words: str) -> bool:
        return any(w in msg for w in words)

    # Greeting
    if has("hello", "hi", "hey", "greetings"):
        return (
            "Hello! I'm Keshav's AI assistant. I can tell you about his "
            "background, skills, projects, and more. What would you like to know?"
        )

    # About Keshav
    if has("who are you", "about keshav", "tell me about yourself", "who is keshav"):
        return (
            "I'm Keshav Singh — an AI engineer and full-stack Web3 developer. I "
            "build modern apps with Next.js and FastAPI, ship RAG systems and AI "
            "agents across the LLM ecosystem, and craft on-chain experiences with "
            "Solidity and Web3. I love bringing ideas to life through technology!"
        )

    # Specific projects (checked first for precise matching)
    if has("apc", "ngo", "community"):
        return (
            "APC is a community-driven NGO engagement platform Keshav built with "
            "Next.js, React, FastAPI, WebSockets, and Tailwind CSS. It manages "
            "members, volunteers, books, and initiatives, with role-based "
            "onboarding, contribution tracking, and real-time engagement dashboards."
        )

    if has("trv", "trv technologies"):
        return (
            "Keshav developed the official website for TRV Technologies LLP, "
            "showcasing their services, portfolio, and contact information. The "
            "site features a professional design with smooth animations and a "
            "responsive layout."
        )

    if has("freequademy", "learning platform"):
        return (
            "Freequademy is Keshav's AI-powered learning platform built with "
            "Next.js, FastAPI, LangChain, LlamaIndex, and RAG. It offers free "
            "learning resources, mentorship, and community features, plus a "
            "RAG-based AI chatbot that answers queries from uploaded notes, PDFs, "
            "and syllabus documents, along with MCQ generation and LLM-powered "
            "content summarisation."
        )

    # Frontend
    if has("next", "frontend", "shadcn", "framer", "tailwind", "typescript"):
        return (
            "On the frontend, Keshav builds with Next.js, React, and TypeScript, "
            "styled with Tailwind CSS and shadcn/ui, and brings interfaces to life "
            "with Framer Motion animations. He focuses on fast, accessible, "
            "production-grade UIs."
        )

    if has("react", "component"):
        return (
            "Keshav builds component-driven UIs with React and Next.js in "
            "TypeScript, using shadcn/ui for polished components and Framer Motion "
            "for animation. He ships responsive, server-rendered apps with great UX."
        )

    # Backend
    if has("fastapi", "backend", "websocket", "streaming", "sse", "rest"):
        return (
            "For backends, Keshav uses FastAPI with Python to build fast REST APIs, "
            "real-time WebSocket services, and SSE token streaming for AI "
            "responses. He focuses on clean, scalable, well-typed server code."
        )

    if has("python"):
        return (
            "Python is core to Keshav's backend and AI work. He builds "
            "high-performance APIs with FastAPI and uses Python across his RAG "
            "pipelines, AI agents, and LLM integrations."
        )

    # Blockchain / Web3 (before AI: "blockchain" contains the substring "ai")
    if has(
        "blockchain", "web3", "solidity", "smart contract", "nft", "defi",
        "dao", "ethereum", "metamask", "hardhat", "erc20",
    ):
        return (
            "On the Web3 side, Keshav writes smart contracts in Solidity "
            "(developed and tested with Hardhat), integrates them into apps with "
            "Ethers.js and MetaMask, and works with NFTs, ERC20 tokens, DeFi, and "
            "DAO patterns."
        )

    # AI Stack
    if has(
        "ai", "genai", "llm", "langchain", "llama", "ollama", "gemini",
        "openai", "agent", "mcp", "vllm", "rag",
    ):
        return (
            "AI is Keshav's core focus. He builds RAG systems, AI agents, and "
            "multi-agent workflows using LangChain and LlamaIndex, runs models via "
            "Ollama, vLLM, the OpenAI API, and Google Gemini, and connects tools "
            "through the Model Context Protocol (MCP)."
        )

    # Crypto APIs
    if has(
        "crypto", "coingecko", "coinmarketcap", "binance", "tradingview",
        "market data", "trading",
    ):
        return (
            "For live crypto market data, Keshav integrates the CoinGecko, "
            "CoinMarketCap, and Binance APIs, and embeds TradingView widgets for "
            "real-time charts inside his Web3 dashboards."
        )

    if has("database", "mysql", "mongodb"):
        return (
            "Keshav works with various databases including MySQL for relational "
            "data and MongoDB for NoSQL solutions. He designs efficient database "
            "schemas and optimizes queries for better performance."
        )

    if has("git", "github", "version control"):
        return (
            "Keshav uses Git for version control and maintains his projects on "
            "GitHub: https://github.com/keshav3815"
        )

    if has("experience", "background", "work experience"):
        return (
            "Keshav has hands-on experience across full-stack web development, "
            "applied Generative AI, and Web3. He's built an AI-powered learning "
            "platform, a community NGO platform, and a corporate website, and "
            "enjoys taking on challenging, real-world projects."
        )

    if has("education", "degree", "study", "college"):
        return (
            "Keshav is pursuing a Bachelor of Engineering in Computer Science at "
            "Chandigarh University, India (2022–2026). He continuously expands his "
            "knowledge through certifications (NPTEL, SWAYAM, Infosys Springboard) "
            "and hands-on projects, and believes in lifelong learning."
        )

    if has("contact", "hire", "work with", "reach"):
        return (
            "You can contact Keshav through the contact form on this site. He's "
            "always open to new opportunities and collaborations! LinkedIn: "
            "https://www.linkedin.com/in/keshav-singh3815/, GitHub: "
            "https://github.com/keshav3815"
        )

    if has("email", "mail"):
        return (
            "You can reach Keshav at keshavsingh3815@gmail.com or through the "
            "contact form on this website. He'll get back to you as soon as possible!"
        )

    if has("linkedin", "social media"):
        return (
            "Connect with Keshav on LinkedIn: "
            "https://www.linkedin.com/in/keshav-singh3815/. You can also find him "
            "on Instagram: https://www.instagram.com/thisiskeshavsingh/ and GitHub: "
            "https://github.com/keshav3815"
        )

    # General skills
    if has("skill", "technology", "programming", "expertise", "stack", "tech"):
        return (
            "Keshav's stack spans four areas: Frontend (Next.js, React, "
            "TypeScript, Tailwind CSS, Framer Motion, shadcn/ui), Backend "
            "(FastAPI, Python, REST APIs, WebSockets, SSE streaming), AI "
            "(LangChain, LlamaIndex, Ollama, OpenAI, Google Gemini, vLLM, MCP, AI "
            "agents, RAG, multi-agent systems), and Web3 (Solidity, Hardhat, "
            "Ethers.js, MetaMask, smart contracts, NFTs, DeFi, DAOs) — plus live "
            "crypto data via CoinGecko, CoinMarketCap, Binance, and TradingView."
        )

    # Projects general
    if has("project", "work", "portfolio"):
        return (
            "Keshav has worked on several projects including Freequademy (an "
            "AI-powered learning platform with a RAG chatbot), the TRV "
            "Technologies LLP corporate website, and APC (a community & NGO "
            "engagement platform). Check out the Projects section above!"
        )

    if has("location", "where", "live", "based"):
        return (
            "Keshav is based in India and studies at Chandigarh University. He's "
            "open to remote work opportunities and collaborations worldwide."
        )

    if has("hobby", "interest", "free time", "passion"):
        return (
            "Besides coding, Keshav enjoys exploring new AI/ML applications, "
            "contributing to open source, and diving into Web3 and blockchain. He "
            "also likes reading tech blogs and staying updated with industry trends."
        )

    return (
        "I'm not sure about that specific question, but I'd be happy to tell you "
        "about Keshav's skills, projects, or background. What would you like to know?"
    )
