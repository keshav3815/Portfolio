"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const CYAN = "#38bdf8";
const PALE = "#93c5fd";
const LOOP = 20;
const TAU = Math.PI * 2;
const HALF_FOV_TAN = Math.tan(THREE.MathUtils.degToRad(21));
const SCENE_W = 6.1;
const SCENE_H = 4.1;
const FOCUS = new THREE.Vector3(0, 0.3, 0);
const PLATFORM_Y = -1.25;

// ---------- theme ----------

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => mo.disconnect();
}

function useIsDark() {
  return useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

// ---------- canvas textures (labels, glows) ----------

// Lucide icon bodies (24x24 viewBox, stroke-based).
const ICONS = {
  brain:
    '<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  file: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  chart:
    '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  code: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  workflow:
    '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  layers:
    '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  container:
    '<path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/>',
  atom: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/>',
};
type IconName = keyof typeof ICONS;

type LabelSpec = {
  title: string;
  sub?: string;
  icon: IconName;
  bars?: boolean;
  w: number;
  h: number;
};

function makeLabel(spec: LabelSpec, dark: boolean) {
  const W = 640;
  const H = Math.round((W * spec.h) / spec.w);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  // CPU-backed: Chrome may evict GPU-backed canvases that aren't in the DOM.
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const font = getComputedStyle(document.body).fontFamily || "sans-serif";
  const pad = 8;

  const draw = (icon?: HTMLImageElement) => {
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    ctx.roundRect(pad, pad, W - pad * 2, H - pad * 2, 34);
    const bg = ctx.createLinearGradient(0, 0, W, H);
    if (dark) {
      bg.addColorStop(0, "rgba(30,48,110,0.88)");
      bg.addColorStop(1, "rgba(49,46,129,0.7)");
    } else {
      bg.addColorStop(0, "rgba(255,255,255,0.94)");
      bg.addColorStop(1, "rgba(219,234,254,0.82)");
    }
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = dark ? "rgba(125,170,255,0.75)" : "rgba(147,197,253,1)";
    ctx.stroke();

    const s = H - pad * 2 - 48;
    const ix = pad + 26;
    const iy = (H - s) / 2;
    ctx.beginPath();
    ctx.roundRect(ix, iy, s, s, 22);
    const ig = ctx.createLinearGradient(ix, iy, ix + s, iy + s);
    ig.addColorStop(0, "#3b82f6");
    ig.addColorStop(1, "#6366f1");
    ctx.fillStyle = ig;
    ctx.fill();

    const tx = ix + s + 26;
    const maxW = W - tx - pad - 22;
    let size = Math.min(56, H * 0.3);
    ctx.font = `700 ${size}px ${font}`;
    while (ctx.measureText(spec.title).width > maxW && size > 20) {
      size -= 2;
      ctx.font = `700 ${size}px ${font}`;
    }
    ctx.fillStyle = dark ? "#e6efff" : "#0f1f4d";
    ctx.textBaseline = "middle";
    const hasSecond = spec.sub || spec.bars;
    ctx.fillText(spec.title, tx, hasSecond ? H * 0.4 : H / 2);

    if (spec.sub) {
      ctx.font = `500 ${Math.round(size * 0.62)}px ${font}`;
      ctx.fillStyle = dark ? "rgba(191,213,255,0.85)" : "rgba(37,70,160,0.8)";
      ctx.fillText(spec.sub, tx, H * 0.68);
    } else if (spec.bars) {
      ctx.fillStyle = dark ? "rgba(125,170,255,0.55)" : "rgba(59,130,246,0.45)";
      ctx.beginPath();
      ctx.roundRect(tx, H * 0.62, maxW * 0.85, 9, 5);
      ctx.fill();
      ctx.fillStyle = dark ? "rgba(125,170,255,0.3)" : "rgba(59,130,246,0.25)";
      ctx.beginPath();
      ctx.roundRect(tx, H * 0.62 + 20, maxW * 0.5, 9, 5);
      ctx.fill();
    }

    if (icon) ctx.drawImage(icon, ix + s * 0.2, iy + s * 0.2, s * 0.6, s * 0.6);
    tex.needsUpdate = true;
  };
  draw();

  const img = new Image();
  img.onload = () => draw(img);
  img.src =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[spec.icon]}</svg>`,
    );
  return tex;
}

function radialTexture(stops: [number, string][], size = 128) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function starTexture(size = 256) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const h = size / 2;
  const core = ctx.createRadialGradient(h, h, 0, h, h, h);
  core.addColorStop(0, "rgba(255,255,255,1)");
  core.addColorStop(0.08, "rgba(255,255,255,0.95)");
  core.addColorStop(0.2, "rgba(255,255,255,0.35)");
  core.addColorStop(0.5, "rgba(255,255,255,0.06)");
  core.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    const len = (i % 2 ? 0.55 : 1) * h;
    const g = ctx.createLinearGradient(
      h,
      h,
      h + Math.cos(a) * len,
      h + Math.sin(a) * len,
    );
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = i % 2 ? 1.5 : 2.5;
    ctx.beginPath();
    ctx.moveTo(h, h);
    ctx.lineTo(h + Math.cos(a) * len, h + Math.sin(a) * len);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function verticalFade(color: string) {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function useDisposed<T extends { dispose(): void }>(value: T) {
  useEffect(() => () => value.dispose(), [value]);
  return value;
}

// ---------- brain ----------

function perlin3(seed: number) {
  const r = rng(seed);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const grad = (h: number, x: number, y: number, z: number) => {
    const k = h & 15;
    const u = k < 8 ? x : y;
    const v = k < 4 ? y : k === 12 || k === 14 ? x : z;
    return (k & 1 ? -u : u) + (k & 2 ? -v : v);
  };
  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;
    return lerp(
      lerp(
        lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
        lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
        v,
      ),
      lerp(
        lerp(
          grad(perm[AA + 1], x, y, z - 1),
          grad(perm[BA + 1], x - 1, y, z - 1),
          u,
        ),
        lerp(
          grad(perm[AB + 1], x, y - 1, z - 1),
          grad(perm[BB + 1], x - 1, y - 1, z - 1),
          u,
        ),
        v,
      ),
      w,
    );
  };
}

type Shaped = { p: THREE.Vector3; g: number; lobe: THREE.Color };

const LOBES = {
  frontal: new THREE.Color("#4f86ff"),
  parietal: new THREE.Color("#6d5cff"),
  temporal: new THREE.Color("#9b6bff"),
  occipital: new THREE.Color("#38b6ff"),
  cerebellum: new THREE.Color("#5ec8ff"),
};

// Gyri: rounded plateaus separated by narrow sulci where the noise crosses zero.
function gyrus(n: number, width: number) {
  const k = Math.min(Math.abs(n) / width, 1);
  return 1 - (1 - k) * (1 - k);
}

function smooth(a: number, b: number, x: number) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

// Direction space: x = lateral, y = up, z = front.
function makeHemisphere(noise: ReturnType<typeof perlin3>, side: number) {
  return (d: THREE.Vector3): Shaped => {
    const lat = side * d.x;

    // Sylvian (lateral) fissure: runs from the front-bottom up toward the back,
    // separating the temporal lobe below from the frontal/parietal lobes above.
    const fissureY = -0.02 - 0.4 * d.z;
    const sylvian =
      Math.exp(-(((d.y - fissureY) / 0.07) ** 2)) *
      smooth(-0.45, -0.25, d.z) *
      (1 - smooth(0.5, 0.62, d.z)) *
      smooth(0.1, 0.35, lat);

    // Central sulcus: from the crown down to the fissure, frontal vs parietal.
    const centralZ = 0.18 - (0.2 * (d.y - fissureY)) / (1 - fissureY + 1e-3);
    const central =
      Math.exp(-(((d.z - centralZ) / 0.05) ** 2)) *
      smooth(fissureY + 0.04, fissureY + 0.14, d.y) *
      smooth(-0.2, 0.05, lat + d.y * 0.3);

    let g =
      0.72 * gyrus(noise(d.x * 3.4 + side * 7, d.y * 3.4, d.z * 3.4), 0.24) +
      0.28 * gyrus(noise(d.x * 7.5 + 11, d.y * 7.5, d.z * 7.5), 0.32);
    g *= 1 - 0.9 * Math.max(sylvian, central * 0.85);

    const p = new THREE.Vector3(d.x * 0.58, d.y * 0.64, d.z * 0.9);
    if (p.y < 0) p.y *= 0.6;
    p.y -= 0.16 * Math.max(0, -d.y) * Math.max(0, d.z + 0.1);
    p.y += 0.05 * Math.max(0, -d.z) * Math.max(0, d.y);
    if (lat < 0) p.x *= 0.3;
    p.multiplyScalar(1 + 0.035 * (g - 1) - 0.09 * sylvian - 0.05 * central);
    // Hemispheres taper toward their poles, so pull them to the midline there.
    const girth =
      Math.sqrt(Math.max(0, 1 - d.z * d.z)) *
      Math.sqrt(Math.max(0, 1 - Math.max(0, d.y) ** 2));
    p.x += side * (0.03 + 0.17 * girth);

    // Soft lobe weights so the tints blend instead of meeting at hard edges.
    const front = smooth(centralZ - 0.06, centralZ + 0.06, d.z);
    const temporal =
      smooth(fissureY + 0.03, fissureY - 0.08, d.y) *
      smooth(-0.45, -0.25, d.z) *
      smooth(-0.3, 0, lat);
    const occipital = smooth(-0.38, -0.62, d.z);
    const lobe = LOBES.parietal
      .clone()
      .lerp(LOBES.frontal, front)
      .lerp(LOBES.temporal, temporal)
      .lerp(LOBES.occipital, occipital);
    return { p, g, lobe };
  };
}

function shapeSphere(fn: (d: THREE.Vector3) => Shaped, w: number, h: number) {
  const geo = new THREE.SphereGeometry(1, w, h);
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const gy = new Float32Array(pos.count);
  const lobe = new Float32Array(pos.count * 3);
  const d = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    d.fromBufferAttribute(pos, i).normalize();
    const r = fn(d);
    pos.setXYZ(i, r.p.x, r.p.y, r.p.z);
    gy[i] = r.g;
    lobe.set([r.lobe.r, r.lobe.g, r.lobe.b], i * 3);
  }
  geo.setAttribute("gyrus", new THREE.BufferAttribute(gy, 1));
  geo.setAttribute("lobe", new THREE.BufferAttribute(lobe, 3));
  geo.computeVertexNormals();
  return geo;
}

const brainVertex = /* glsl */ `
  attribute float gyrus;
  attribute vec3 lobe;
  varying vec3 vLobe;
  varying float vG;
  varying float vY;
  varying vec3 vP;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vG = gyrus;
    vLobe = lobe;
    vY = position.y;
    vP = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const brainFragment = /* glsl */ `
  uniform float uTime;
  uniform float uAlpha;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uViolet;
  uniform vec3 uRim;
  varying vec3 vLobe;
  varying float vG;
  varying float vY;
  varying vec3 vP;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec3 n = normalize(vN);
    vec3 v = normalize(vV);
    vec3 l = normalize(vec3(-0.4, 0.75, 0.55));
    float fres = pow(1.0 - max(dot(n, v), 0.0), 2.2);
    float diff = max(dot(n, l), 0.0);
    float spec = pow(max(dot(n, normalize(l + v)), 0.0), 36.0);

    vec3 col = mix(uDeep, uMid, smoothstep(0.1, 0.95, vG));
    float tint = 0.5 + 0.5 * sin(vP.z * 3.2 + vP.y * 2.4 + 1.3);
    col = mix(col, uViolet, tint * 0.15);
    col = mix(col, vLobe * mix(0.45, 1.0, vG), 0.42);
    col *= 0.72 + 0.45 * diff;
    col += vec3(1.0) * spec * 0.55 * smoothstep(0.4, 1.0, vG);
    col += uRim * fres * 1.05;
    col += uRim * 0.08;

    float scan = exp(-pow((vY - (fract(uTime * 0.12) * 2.4 - 1.0)) * 9.0, 2.0));
    col += uRim * scan * 0.35 * smoothstep(0.5, 1.0, vG);
    gl_FragColor = vec4(col, clamp(uAlpha + fres * 0.25, 0.0, 1.0));
  }
`;

function brainUniforms(dark: boolean) {
  return {
    uTime: { value: 0 },
    uAlpha: { value: dark ? 0.8 : 0.86 },
    uDeep: { value: new THREE.Color(dark ? "#16238c" : "#1c2fa3") },
    uMid: { value: new THREE.Color(dark ? "#4b6cf5" : "#4a69ec") },
    uViolet: { value: new THREE.Color(dark ? "#8a63ff" : "#9d86ff") },
    uRim: { value: new THREE.Color(dark ? "#9fd4ff" : "#bcd4ff") },
  };
}

const SIGNALS = 26;

function Brain({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const signalsRef = useRef<THREE.Points>(null);
  const mats = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const uniforms = useMemo(() => brainUniforms(dark), [dark]);

  const data = useMemo(() => {
    const noise = perlin3(21);
    const left = shapeSphere(makeHemisphere(noise, -1), 220, 150);
    const right = shapeSphere(makeHemisphere(noise, 1), 220, 150);
    const stem = new THREE.CylinderGeometry(0.055, 0.09, 0.42, 24, 1, true);
    stem.setAttribute(
      "gyrus",
      new THREE.BufferAttribute(
        new Float32Array(stem.getAttribute("position").count).fill(0.6),
        1,
      ),
    );
    const stemCount = stem.getAttribute("position").count;
    const stemLobe = new Float32Array(stemCount * 3);
    for (let i = 0; i < stemCount; i++)
      stemLobe.set(
        [LOBES.cerebellum.r, LOBES.cerebellum.g, LOBES.cerebellum.b],
        i * 3,
      );
    stem.setAttribute("lobe", new THREE.BufferAttribute(stemLobe, 3));

    const rand = rng(11);
    const crest: THREE.Vector3[] = [];
    const nv = new THREE.Vector3();
    for (const g of [left, right]) {
      const p = g.getAttribute("position") as THREE.BufferAttribute;
      const n = g.getAttribute("normal") as THREE.BufferAttribute;
      const gy = g.getAttribute("gyrus") as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i += 3) {
        if (gy.getX(i) < 0.9 || rand() > 0.55) continue;
        crest.push(
          new THREE.Vector3()
            .fromBufferAttribute(p, i)
            .addScaledVector(nv.fromBufferAttribute(n, i), 0.01),
        );
      }
    }

    const net: THREE.Vector3[] = [];
    for (let i = 0; i < 650; i++)
      net.push(crest[Math.floor(rand() * crest.length)]);
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    const lineArr: number[] = [];
    for (let i = 0; i < net.length; i++) {
      let links = 0;
      for (let j = i + 1; j < net.length && links < 2; j++) {
        const dd = net[i].distanceTo(net[j]);
        if (dd > 0.04 && dd < 0.12) {
          segs.push([net[i], net[j]]);
          lineArr.push(...net[i].toArray(), ...net[j].toArray());
          links++;
        }
      }
    }

    // Stars sit on the outer surfaces, which face the camera as the brain turns.
    const outer = crest.filter((v) => Math.abs(v.x) > 0.45 || v.y > 0.35);
    const hubs = Array.from(
      { length: 36 },
      () => outer[Math.floor(rand() * outer.length)],
    );
    const hubPos = new Float32Array(hubs.length * 3);
    hubs.forEach((v, i) => hubPos.set(v.toArray(), i * 3));

    return {
      parts: [left, right],
      stem,
      lines: new Float32Array(lineArr),
      segs,
      hubPos,
      hubPhase: hubs.map(() => rand() * TAU),
      hubColors: new Float32Array(hubs.length * 3),
      hubBase: hubs.map(
        (_, i) =>
          new THREE.Color(
            ["#7ee8ff", "#d2b8ff", "#ffffff", "#a5c8ff", "#f0c8ff"][i % 5],
          ),
      ),
      signals: Array.from({ length: SIGNALS }, () => ({
        seg: Math.floor(rand() * segs.length),
        t: rand(),
        speed: 0.6 + rand() * 0.9,
      })),
      signalPos: new Float32Array(SIGNALS * 3),
    };
  }, []);

  useEffect(
    () => () => [...data.parts, data.stem].forEach((g) => g.dispose()),
    [data],
  );

  const glow = useDisposed(
    useMemo(
      () =>
        radialTexture([
          [0, "rgba(255,255,255,1)"],
          [0.25, "rgba(125,211,252,0.9)"],
          [1, "rgba(56,189,248,0)"],
        ]),
      [],
    ),
  );
  const star = useDisposed(useMemo(() => starTexture(), []));
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    mats.current.forEach((m) => {
      if (m) m.uniforms.uTime.value = t;
    });
    if (group.current) {
      group.current.rotation.y = -1.1 - (t / (LOOP * 2)) * TAU;
      group.current.position.y = 0.6 + Math.sin((t / LOOP) * TAU * 2) * 0.04;
    }

    const col = nodesRef.current?.geometry.getAttribute("color") as
      THREE.BufferAttribute | undefined;
    if (col) {
      data.hubPhase.forEach((ph, i) => {
        const k = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.8 + ph));
        tmp.copy(data.hubBase[i]).multiplyScalar(k);
        col.setXYZ(i, tmp.r, tmp.g, tmp.b);
      });
      col.needsUpdate = true;
    }

    const sp = signalsRef.current?.geometry.getAttribute("position") as
      THREE.BufferAttribute | undefined;
    if (sp) {
      data.signals.forEach((s, i) => {
        s.t += delta * s.speed * 2;
        if (s.t > 1) {
          s.t = 0;
          s.seg = (s.seg * 7 + 13) % data.segs.length;
        }
        const [a, b] = data.segs[s.seg];
        sp.setXYZ(
          i,
          a.x + (b.x - a.x) * s.t,
          a.y + (b.y - a.y) * s.t,
          a.z + (b.z - a.z) * s.t,
        );
      });
      sp.needsUpdate = true;
    }
  });

  const glowMat = {
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  } as const;

  return (
    <group ref={group} position={[0, 0.6, 0]} scale={1.55}>
      {[...data.parts, data.stem].map((g, i) => (
        <mesh
          key={i}
          geometry={g}
          {...(g === data.stem
            ? {
                position: [0, -0.58, -0.22] as const,
                rotation: [0.3, 0, 0] as const,
              }
            : {})}
        >
          <shaderMaterial
            ref={(m) => {
              mats.current[i] = m;
            }}
            vertexShader={brainVertex}
            fragmentShader={brainFragment}
            uniforms={uniforms}
            transparent
          />
        </mesh>
      ))}
      <lineSegments renderOrder={2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.lines, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#c7d2fe" opacity={0.18} {...glowMat} />
      </lineSegments>
      <points renderOrder={2} ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.hubPos, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[data.hubColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial map={star} vertexColors size={1.0} {...glowMat} />
      </points>
      <points renderOrder={2} ref={signalsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[data.signalPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial map={glow} color="#ffffff" size={0.22} {...glowMat} />
      </points>
    </group>
  );
}

// ---------- platform ----------

const TILES: LabelSpec[] = [
  { title: "Python", icon: "code", w: 0.96, h: 0.34 },
  { title: "FastAPI", icon: "zap", w: 0.96, h: 0.34 },
  { title: "PostgreSQL", icon: "database", w: 0.96, h: 0.34 },
  { title: "LangChain", icon: "link", w: 0.96, h: 0.34 },
  { title: "React", icon: "atom", w: 0.96, h: 0.34 },
  { title: "Celery", icon: "workflow", w: 0.96, h: 0.34 },
  { title: "Redis", icon: "layers", w: 0.96, h: 0.34 },
  { title: "Docker", icon: "container", w: 0.96, h: 0.34 },
];
const TILE_R = 1.68;

// Curved band segment centred on `angle`, so the tiles wrap the round base.
function Tile({
  spec,
  angle,
  dark,
}: {
  spec: LabelSpec;
  angle: number;
  dark: boolean;
}) {
  const tex = useDisposed(useMemo(() => makeLabel(spec, dark), [spec, dark]));
  const arc = spec.w / TILE_R;
  return (
    <mesh position={[0, PLATFORM_Y - 0.15, 0]} renderOrder={10}>
      <cylinderGeometry
        args={[TILE_R, TILE_R, spec.h, 32, 1, true, angle - arc / 2, arc]}
      />
      <meshBasicMaterial
        map={tex}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Platform({ dark }: { dark: boolean }) {
  const ripples = useRef<(THREE.Mesh | null)[]>([]);
  const tileRing = useRef<THREE.Group>(null);
  const disc = useDisposed(
    useMemo(
      () =>
        radialTexture([
          [0, "rgba(186,230,253,1)"],
          [0.35, "rgba(56,189,248,0.8)"],
          [0.7, "rgba(37,99,235,0.35)"],
          [1, "rgba(37,99,235,0)"],
        ]),
      [],
    ),
  );
  const beam = useDisposed(
    useMemo(() => verticalFade("rgba(96,165,250,0.55)"), []),
  );

  useFrame(({ clock }) => {
    if (tileRing.current)
      tileRing.current.rotation.y = (clock.elapsedTime / (LOOP * 2)) * TAU;
    ripples.current.forEach((m, i) => {
      if (!m) return;
      const k = (clock.elapsedTime * 0.35 + i / 3) % 1;
      m.scale.setScalar(0.3 + k * 1.05);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.7;
    });
  });

  const glass = {
    color: dark ? "#1e3a8a" : "#dbeafe",
    emissive: "#2563eb",
    emissiveIntensity: dark ? 0.25 : 0.08,
    roughness: 0.15,
    metalness: 0.25,
    transparent: true,
    opacity: dark ? 0.75 : 0.7,
  };

  return (
    <group>
      <mesh position={[0, PLATFORM_Y - 0.15, 0]}>
        <cylinderGeometry args={[1.55, 1.62, 0.3, 96]} />
        <meshStandardMaterial {...glass} />
      </mesh>
      <mesh position={[0, PLATFORM_Y + 0.06, 0]}>
        <cylinderGeometry args={[1.1, 1.17, 0.12, 96]} />
        <meshStandardMaterial {...glass} />
      </mesh>
      <mesh
        position={[0, PLATFORM_Y + 0.125, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[1.08, 96]} />
        <meshBasicMaterial
          map={disc}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(m) => {
            ripples.current[i] = m;
          }}
          position={[0, PLATFORM_Y + 0.13, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[0.84, 0.875, 96]} />
          <meshBasicMaterial
            color={CYAN}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
      {[
        [1.62, PLATFORM_Y, 0.014, 1],
        [1.18, PLATFORM_Y + 0.12, 0.01, 1],
        [1.95, PLATFORM_Y - 0.3, 0.008, 0.5],
      ].map(([r, y, tube, o], i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, tube, 8, 160]} />
          <meshBasicMaterial
            color={CYAN}
            transparent
            opacity={o}
            toneMapped={false}
          />
        </mesh>
      ))}
      <mesh position={[0, PLATFORM_Y + 0.55, 0]}>
        <cylinderGeometry args={[0.45, 0.85, 0.85, 64, 1, true]} />
        <meshBasicMaterial
          map={beam}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <group ref={tileRing}>
        {TILES.map((spec, i) => (
          <Tile
            key={spec.title}
            spec={spec}
            angle={(i / TILES.length) * TAU}
            dark={dark}
          />
        ))}
      </group>
    </group>
  );
}

// ---------- floating panels, rings, cubes ----------

type PanelSpec = LabelSpec & { pos: [number, number, number]; yaw: number };

const PANELS: PanelSpec[] = [
  {
    title: "LLM Reasoning",
    icon: "brain",
    bars: true,
    w: 1.3,
    h: 0.44,
    pos: [-2.0, 1.55, 0.3],
    yaw: 0.3,
  },
  {
    title: "AI Agents",
    icon: "bot",
    bars: true,
    w: 1.15,
    h: 0.44,
    pos: [2.1, 1.45, 0.1],
    yaw: -0.3,
  },
  {
    title: "RAG",
    sub: "PDF → Insights",
    icon: "file",
    w: 1.2,
    h: 0.44,
    pos: [-2.3, 0.2, 0.6],
    yaw: 0.4,
  },
  {
    title: "Financial Analytics",
    icon: "chart",
    w: 1.45,
    h: 0.44,
    pos: [2.35, 0.0, 0.55],
    yaw: -0.4,
  },
];

function Panel({
  spec,
  index,
  dark,
}: {
  spec: PanelSpec;
  index: number;
  dark: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useDisposed(useMemo(() => makeLabel(spec, dark), [spec, dark]));
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.position.y =
        spec.pos[1] + Math.sin(clock.elapsedTime * 0.9 + index * 1.7) * 0.06;
  });
  return (
    <mesh
      ref={ref}
      position={spec.pos}
      rotation={[0, spec.yaw, 0]}
      renderOrder={10}
    >
      <planeGeometry args={[spec.w, spec.h]} />
      <meshBasicMaterial
        map={tex}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

const RINGS = [
  { r: 2.35, rot: [Math.PI / 2 - 0.28, 0, 0.18], y: 0.55 },
  { r: 2.55, rot: [Math.PI / 2 + 0.2, 0, -0.22], y: 0.5 },
];
const RIDERS = [
  { ring: 0, phase: 0 },
  { ring: 0, phase: 0.5 },
  { ring: 1, phase: 0.25 },
  { ring: 1, phase: 0.75 },
];
const FLOATERS: [number, number, number][] = [
  [-1.15, 2.0, -0.4],
  [1.2, 2.05, -0.6],
  [-1.45, -0.6, 1.0],
  [1.5, -0.8, 0.9],
  [0.25, 2.15, -0.9],
];

function Rings() {
  const cubes = useRef<(THREE.Mesh | null)[]>([]);
  const paths = useMemo(
    () =>
      RINGS.map(({ r, rot, y }) => {
        const pts = new THREE.EllipseCurve(0, 0, r, r)
          .getPoints(160)
          .map((p) => new THREE.Vector3(p.x, p.y, 0));
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({
            color: PALE,
            transparent: true,
            opacity: 0.55,
          }),
        );
        line.rotation.set(rot[0], rot[1], rot[2]);
        line.position.y = y;
        line.updateMatrixWorld();
        return { line, r };
      }),
    [],
  );
  useEffect(
    () => () =>
      paths.forEach(({ line }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      }),
    [paths],
  );
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    RIDERS.forEach((rd, i) => {
      const m = cubes.current[i];
      if (!m) return;
      const { line, r } = paths[rd.ring];
      const a = ((t / LOOP) * (rd.ring ? -1 : 1) + rd.phase) * TAU;
      v.set(Math.cos(a) * r, Math.sin(a) * r, 0).applyMatrix4(line.matrixWorld);
      m.position.copy(v);
      m.rotation.set(t * 0.6 + i, t * 0.8, 0);
    });
    FLOATERS.forEach((p, i) => {
      const m = cubes.current[RIDERS.length + i];
      if (!m) return;
      m.rotation.set(t * 0.4 + i, t * 0.5 + i * 2, 0);
      m.position.y = p[1] + Math.sin(t * 0.8 + i * 2) * 0.08;
    });
  });

  const cubeSlots = [...RIDERS.map(() => null), ...FLOATERS];

  return (
    <>
      {paths.map(({ line }, i) => (
        <primitive key={i} object={line} />
      ))}
      {cubeSlots.map((p, i) => (
        <mesh
          key={i}
          position={p ?? [0, 0, 0]}
          ref={(m) => {
            cubes.current[i] = m;
          }}
        >
          <boxGeometry args={p ? [0.17, 0.17, 0.17] : [0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#60a5fa"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.3}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </>
  );
}

// ---------- environment ----------

function GridFloor() {
  return (
    <gridHelper
      args={[16, 64, PALE, PALE]}
      position={[0, PLATFORM_Y - 0.36, 0]}
    >
      <lineBasicMaterial
        attach="material"
        color={PALE}
        transparent
        opacity={0.18}
      />
    </gridHelper>
  );
}

function Bokeh() {
  const pts = useMemo(() => {
    const r = rng(7);
    const a = new Float32Array(70 * 3);
    for (let i = 0; i < 70; i++)
      a.set([(r() - 0.5) * 10, (r() - 0.35) * 5, -1.5 - r() * 3], i * 3);
    return a;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={PALE}
        size={0.07}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitCamera() {
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ camera, clock, size }) => {
    const cam = camera as THREE.PerspectiveCamera;
    const { width: W, height: H } = size;
    const wide = W / H > 1.15;
    const area = wide ? 0.5 : 1;

    // Distance that fits the scene into `area` of the width and most of the height.
    const distW = (SCENE_W * 1.06 * H) / (2 * HALF_FOV_TAN * W * area);
    const distH = SCENE_H / (2 * HALF_FOV_TAN * 0.92);
    const dist = Math.max(distW, distH);

    // Off-axis projection: wide screens render the scene centred at 75% of the width.
    const fullW = wide ? W * 1.5 : W;
    cam.aspect = fullW / H;
    cam.setViewOffset(fullW, H, 0, 0, W, H);

    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.04;
    const a =
      Math.sin((clock.elapsedTime / LOOP) * TAU) *
        THREE.MathUtils.degToRad(7.5) +
      smooth.current.x * 0.1;
    const lift = 0.22 - smooth.current.y * 0.06;

    cam.position.set(
      FOCUS.x + Math.sin(a) * dist,
      FOCUS.y + dist * lift,
      FOCUS.z + Math.cos(a) * dist,
    );
    cam.lookAt(FOCUS);
  });
  return null;
}

function Scene() {
  const dark = useIsDark();
  return (
    <>
      <ambientLight intensity={dark ? 0.9 : 1.3} />
      <directionalLight position={[3, 5, 5]} intensity={1.1} />
      <pointLight
        position={[-1.5, 1.8, 2.2]}
        color="#60a5fa"
        intensity={2.5}
        distance={6}
      />
      <pointLight
        position={[0, PLATFORM_Y + 0.3, 0]}
        color={CYAN}
        intensity={4}
        distance={3}
      />
      <OrbitCamera />
      <Bokeh />
      <GridFloor />
      <Platform dark={dark} />
      <Brain dark={dark} />
      <Rings />
      {PANELS.map((p, i) => (
        <Panel key={p.title} spec={p} index={i} dark={dark} />
      ))}
    </>
  );
}

export default function NeuralCore() {
  const still = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="size-full">
      <Canvas
        frameloop={still ? "demand" : onScreen ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ fov: 42, position: [0, 1.5, 7] }}
        gl={{ antialias: true, alpha: true }}
        aria-label="3D glowing AI brain on a holographic platform, surrounded by LLM Reasoning, AI Agents, RAG and Financial Analytics panels, with FastAPI, PostgreSQL, LangChain and React tiles"
        role="img"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
