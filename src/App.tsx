import React, { useState, useEffect, useMemo, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { initAnalytics, trackEvent } from './analytics';
import {
  Github,
  Linkedin,
  Mail,
  User,
  FolderCode,
  MessageSquare,
  Layers,
  Globe,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ArrowUpRight,
  Trophy,
  Target,
  Check,
  Pencil
} from 'lucide-react';
import nanocry01 from './assets/portfolio/source/nanocry-01.webp';
import nanocry02 from './assets/portfolio/source/nanocry-02.webp';
import nanocry03 from './assets/portfolio/source/nanocry-03.webp';
import nanocry04 from './assets/portfolio/source/nanocry-04.webp';
import sacredTails01 from './assets/portfolio/source/sacred-tails-01.webp';
import sacredTails02 from './assets/portfolio/source/sacred-tails-02.webp';
import sacredTails03 from './assets/portfolio/source/sacred-tails-03.webp';
import sacredTails04 from './assets/portfolio/source/sacred-tails-04.webp';
import tripleHandPoker01 from './assets/portfolio/source/triple-hand-poker-01.webp';
import tripleHandPoker02 from './assets/portfolio/source/triple-hand-poker-02.webp';
import tripleHandPoker03 from './assets/portfolio/source/triple-hand-poker-03.webp';
import daleela01 from './assets/portfolio/source/daleela-01.webp';
import daleela02 from './assets/portfolio/source/daleela-02.webp';
import daleela03 from './assets/portfolio/source/daleela-03.webp';
import funnyShooter01 from './assets/portfolio/source/funny-shooter-01.webp';
import funnyShooter02 from './assets/portfolio/source/funny-shooter-02.webp';
import funnyShooter03 from './assets/portfolio/source/funny-shooter-03.webp';
import cowboyShooter01 from './assets/portfolio/source/cowboy-shooter-01.webp';
import cowboyShooter02 from './assets/portfolio/source/cowboy-shooter-02.webp';
import cowboyShooter03 from './assets/portfolio/source/cowboy-shooter-03.webp';
import kungFuKarate01 from './assets/portfolio/source/kung-fu-karate-01.webp';
import kungFuKarate02 from './assets/portfolio/source/kung-fu-karate-02.webp';
import kungFuKarate03 from './assets/portfolio/source/kung-fu-karate-03.webp';
import usPoliceDog01 from './assets/portfolio/source/us-police-dog-01.webp';
import usPoliceDog02 from './assets/portfolio/source/us-police-dog-02.webp';
import usPoliceDog03 from './assets/portfolio/source/us-police-dog-03.webp';

// --- SVG Tech Icons ---
const TECH_SVGS = {
  unity: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M22.1 11.2L13.8 3.3c-.2-.2-.5-.3-.8-.3s-.6.1-.8.3L3.9 11.2c-.4.4-.4 1.1 0 1.5l8.3 7.9c.2.2.5.3.8.3s.6-.1.8-.3l8.3-7.9c.4-.4.4-1.1 0-1.5zm-9.1 6.4l-6.1-5.8 6.1-5.8 6.1 5.8-6.1 5.8z"/>
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-9h3v1h-3v1h3v1h-3v1h3v1h-4v-6h1v1zm6 0h1v6h-1v-6z"/>
    </svg>
  ),
  cpp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10-8c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 5h-2v2h-2v2h2v2h2v-2h2v-2h-2V9zm6 2h2v2h-2v-2z"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L4.5 6.3v8.7L12 19.3l7.5-4.3V6.3L12 2zm5.5 12.1l-5.5 3.2-5.5-3.2V7.2l5.5-3.2 5.5 3.2v6.9z"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13.962 8.885c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.093 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.093 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.1 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.093 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.093 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.093 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm-1.093 0c0-.603.49-1.093 1.093-1.093.603 0 1.093.49 1.093 1.093 0 .603-.49 1.093-1.093 1.093-.603 0-1.093-.49-1.093-1.093zm12.022 4.008c.032.303.047.612.047.926 0 3.48-2.82 6.3-6.3 6.3-2.514 0-4.682-1.475-5.69-3.602-.513.044-1.035.067-1.563.067-2.64 0-5.02-.574-6.965-1.547l.012-.07c1.32.46 2.257.603 3.39.603 2.917 0 5.28-2.363 5.28-5.28 0-.327-.03-.646-.088-.954h11.917z"/>
    </svg>
  ),
  photon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 19.74l1.35 1.26L12 18.28l8.65 2.72L22 19.74 12 2zm0 13.53l-6.37 2.01L12 5.47l6.37 12.07-6.37-2.01z"/>
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M5.483 21.3l6.156-8.912 3.972 5.587 8.389 3.325L5.483 21.3zM24 17.66L17.116 2.1l-2.776 3.928 6.126 11.632L24 17.66zM13.03 5.39L8.536 0 0 18.782l4.674 2.518L13.03 5.39z"/>
    </svg>
  )
};

// --- Types ---
interface Project {
  id: number;
  title: string;
  shortDesc: string;
  summary: string;
  techs: (keyof typeof TECH_SVGS)[];
  images: string[];
  videoUrl?: string;
  status?: string;
  websiteUrl?: string;
  mediaUrl?: string;
  mediaLabel?: string;
}

interface ExperienceStat {
  value: string;
  label: string;
}

// --- Constants & Data ---
const EXPERIENCE_STATS: ExperienceStat[] = [
  { value: "4+", label: "Years In Game Dev" },
  { value: "3+", label: "Multiplayer Titles Shipped" }
];

const TECH_STACK: { key: keyof typeof TECH_SVGS; label: string }[] = [
  { key: "unity", label: "Unity" },
  { key: "csharp", label: "C#" },
  { key: "photon", label: "Photon" },
  { key: "azure", label: "Azure" },
  { key: "aws", label: "AWS" },
  { key: "nodejs", label: "Node.js" },
  { key: "docker", label: "Docker" },
  { key: "cpp", label: "C++" }
];

const SPECIALTIES = [
  "Server-Authoritative Netcode",
  "Lag Compensation (KCC)",
  "Matchmaking & Lobbies",
  "PlayFab",
  "Firebase / Firestore",
  "Mobile Optimization",
  "In-App Purchases",
  "Push Notifications",
  "Ads Integration",
  "Blockchain / NFT",
  "AI State Machines",
  "Localization"
];

const SOCIAL_LINKS = {
  github: "https://github.com/IbrahimBu11",
  linkedin: "https://www.linkedin.com/in/ibrahim-butt321123/",
  email: "mailto:ibrahim.alibu11work@gmail.com"
};

// Official store badges (linkable per Google/Apple brand guidelines).
const STORE_BADGES = {
  google: {
    src: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
    alt: "Get it on Google Play",
    className: "h-14"
  },
  apple: {
    src: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
    alt: "Download on the App Store",
    className: "h-10"
  }
};

function storeFor(url?: string): keyof typeof STORE_BADGES | null {
  if (!url) return null;
  if (url.includes("play.google.com")) return "google";
  if (url.includes("apps.apple.com")) return "apple";
  return null;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nanocry",
    shortDesc: "Multiplayer Battle Royale // Unity, Photon Fusion.",
    summary: "Lead multiplayer developer architecting a 30+ player, server-authoritative battle royale on Photon Fusion. Lag compensation (hitbox buffering, KCC) cuts perceived latency by 40%, with Unity Multiplay matchmaking, dedicated servers, and a high-frequency sync system handling 150+ objects per frame.",
    techs: ["unity", "photon", "csharp"],
    images: [nanocry01, nanocry02, nanocry03, nanocry04],
    websiteUrl: "https://ibrahimbu11.github.io/NanocryWebsite/"
  },
  {
    id: 2,
    title: "Sacred Tails",
    shortDesc: "Blockchain Multiplayer Card Game // Unity, Azure, Sei Chain.",
    summary: "Full-stack developer on a 1v1 and tournament card game (300+ daily players) with NFT and Sei-blockchain wallet authentication, an Azure Functions + PlayFab backend, and turn-based combat backed by a real-time multiplayer lobby.",
    techs: ["unity", "azure", "csharp"],
    images: [sacredTails01, sacredTails02, sacredTails03, sacredTails04],
    videoUrl: "https://www.youtube.com/embed/ie_Wk76ySac",
    websiteUrl: "https://www.sacredtails.com/",
    mediaUrl: "https://www.youtube.com/watch?v=ie_Wk76ySac",
    mediaLabel: "YouTube"
  },
  {
    id: 3,
    title: "Triple Hand Poker",
    shortDesc: "6-Player Multiplayer Card Game // Unity, Photon.",
    summary: "Solo developer of a real-time multiplayer poker game pushing 240+ state updates per minute, with custom networking and a card-evaluation engine validated to 100% accuracy across a 6-player table.",
    techs: ["unity", "photon", "csharp"],
    images: [tripleHandPoker01, tripleHandPoker02, tripleHandPoker03],
    websiteUrl: "https://triplehandpoker.com/",
    mediaUrl: "https://apps.apple.com/us/app/triple-hand-poker/id6449002117?platform=ipad",
    mediaLabel: "Store"
  },
  {
    id: 4,
    title: "Daleela",
    shortDesc: "Educational Mobile App // Unity, Mobile.",
    summary: "Lead developer on a modular, multi-language education app teaching fundamentals to children aged 4–8 — 40+ interactive animations, child-friendly UI/UX, and progress tracking with reward mechanics that lifted session time by 65%.",
    techs: ["unity", "csharp"],
    images: [daleela01, daleela02, daleela03],
    websiteUrl: "https://www.unicef.org/lebanon/daleela",
    mediaUrl: "https://play.google.com/store/apps/details?id=com.unicef.daleela&hl=en&pli=1",
    mediaLabel: "Store"
  },
  {
    id: 5,
    title: "Funny Shooter",
    shortDesc: "Web-Based FPS // Unity WebGL.",
    summary: "Gameplay developer on a fast-paced WebGL FPS optimized to a 45MB download at 60fps, featuring projectile-based combat across 12 unique weapon types plus spectator and kill-cam replay modes.",
    techs: ["unity", "csharp"],
    images: [funnyShooter01, funnyShooter02, funnyShooter03],
    mediaUrl: "https://poki.com/en/g/funny-shooter-2",
    mediaLabel: "Play"
  },
  {
    id: 6,
    title: "Cowboy Shooter",
    shortDesc: "Wild-West Action Shooter // Unity.",
    summary: "Built fast, arcade-paced gunplay, enemy encounters, and combat feel for a stylized western shooter.",
    techs: ["unity", "csharp"],
    images: [cowboyShooter01, cowboyShooter02, cowboyShooter03]
  },
  {
    id: 7,
    title: "Kung Fu Karate",
    shortDesc: "3D Fighting Game // Unity, Mobile.",
    summary: "Developed responsive melee combat, combo chaining, and AI opponents tuned for smooth mobile performance.",
    techs: ["unity", "csharp"],
    images: [kungFuKarate01, kungFuKarate02, kungFuKarate03],
    mediaUrl: "https://play.google.com/store/apps/details?id=com.gss.grand.city.rescue.flyingrobot",
    mediaLabel: "Store"
  },
  {
    id: 8,
    title: "US Police Dog",
    shortDesc: "Open-World Simulator // Unity, Mobile.",
    summary: "Worked on gameplay systems for an open-world police K-9 simulator — mission-driven objectives, chase mechanics, and interactive city gameplay.",
    techs: ["unity", "csharp"],
    images: [usPoliceDog01, usPoliceDog02, usPoliceDog03],
    mediaUrl: "https://play.google.com/store/apps/details?id=com.gss.us.police.cop.dog.crime.chase.shoppingmall&hl=en",
    mediaLabel: "Store"
  }
];

// --- Cursor trail (neon line that fades; particles avoid it) ---
type TrailPoint = { x: number; y: number; t: number };
type Pointer = { x: number; y: number; inside: boolean };
type ShapeFlash = { poly: { x: number; y: number }[]; t: number };
const TRAIL_MAX_AGE = 3000; // ms — neon trail lingers longer before fading
const SHAPE_FLASH_DURATION = 750; // ms — red net flash on a completed shape

// Shoelace area of a screen-space polygon.
function polygonArea(poly: { x: number; y: number }[]) {
  let area = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    area += (poly[j].x + poly[i].x) * (poly[j].y - poly[i].y);
  }
  return Math.abs(area) / 2;
}

// Ray-casting point-in-polygon test.
function pointInPolygon(x: number, y: number, poly: { x: number; y: number }[]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const ALIVE_COLOR: [number, number, number] = [0.98, 0.72, 0.14]; // amber
const DEAD_COLOR: [number, number, number] = [1.0, 0.16, 0.18]; // red

// --- Missions / Achievements ---
type Metric = 'kills' | 'shapes' | 'best' | 'sections';
interface Mission {
  id: string;
  title: string;
  desc: string;
  goal: number;
  metric: Metric;
}

const MISSIONS: Mission[] = [
  { id: 'first_catch', title: 'First Catch', desc: 'Trap your first firefly in a net.', goal: 1, metric: 'kills' },
  { id: 'pest_control', title: 'Pest Control', desc: 'Trap 25 fireflies in total.', goal: 25, metric: 'kills' },
  { id: 'exterminator', title: 'Exterminator', desc: 'Trap 100 fireflies in total.', goal: 100, metric: 'kills' },
  { id: 'big_net', title: 'Big Net', desc: 'Trap 6 fireflies in a single shape.', goal: 6, metric: 'best' },
  { id: 'net_artist', title: 'Net Artist', desc: 'Draw 15 closed nets.', goal: 15, metric: 'shapes' },
  { id: 'explorer', title: 'Explorer', desc: 'Visit every section of the site.', goal: 4, metric: 'sections' }
];

const SAVE_KEY = 'ib_portfolio_game_v1';

interface Progress {
  kills: number;
  shapes: number;
  best: number;
  unlocked: string[];
  visited: string[];
}

function loadProgress(): Progress | null {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  } catch {
    return null;
  }
}

// Soft round glow sprite so the "flies" read as glowing orbs, not squares.
function makeGlowTexture() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

const DEATH_DURATION = 1.1; // seconds for the death burst to fade

// --- Ambient Particles (calm, cursor-reactive backdrop) ---
function AmbientParticles({
  mouse,
  trail,
  killShape,
  onKill
}: {
  mouse: React.MutableRefObject<[number, number]>;
  trail: React.MutableRefObject<TrailPoint[]>;
  killShape: React.MutableRefObject<{ x: number; y: number }[] | null>;
  onKill: (count: number) => void;
}) {
  const meshRef = useRef<THREE.Points>(null!);
  const { viewport } = useThree();
  const vW = viewport.width / 2;
  const vH = viewport.height / 2;

  const glow = useMemo(makeGlowTexture, []);

  const COUNT = 130;
  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const anchors = new Float32Array(COUNT * 2);
    const phases = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const radii = new Float32Array(COUNT);
    const states = new Float32Array(COUNT); // 0 alive, 1 dying
    const vel = new Float32Array(COUNT * 2); // vx, vy while dying
    const death = new Float32Array(COUNT); // 0..1 death progress
    for (let i = 0; i < COUNT; i++) {
      const ax = (Math.random() - 0.5) * 1.9;
      const ay = (Math.random() - 0.5) * 1.7;
      anchors[i * 2] = ax;
      anchors[i * 2 + 1] = ay;
      positions[i * 3] = ax;
      positions[i * 3 + 1] = ay;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = ALIVE_COLOR[0];
      colors[i * 3 + 1] = ALIVE_COLOR[1];
      colors[i * 3 + 2] = ALIVE_COLOR[2];
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.3 + Math.random() * 0.7;
      radii[i] = 0.15 + Math.random() * 0.8;
    }
    return { positions, colors, anchors, phases, speeds, radii, states, vel, death };
  }, []);

  // Convert a world position to viewport screen pixels (matches trail coords).
  const worldToScreen = (wx: number, wy: number) => ({
    x: (wx / vW + 1) * 0.5 * window.innerWidth,
    y: (1 - wy / vH) * 0.5 * window.innerHeight
  });

  const respawn = (i: number) => {
    const { positions, colors, anchors, states, vel, death } = data;
    const ax = (Math.random() - 0.5) * 1.9;
    const ay = (Math.random() - 0.5) * 1.7;
    anchors[i * 2] = ax;
    anchors[i * 2 + 1] = ay;
    positions[i * 3] = ax * vW * 0.95;
    positions[i * 3 + 1] = ay * vH * 0.9;
    colors[i * 3] = ALIVE_COLOR[0];
    colors[i * 3 + 1] = ALIVE_COLOR[1];
    colors[i * 3 + 2] = ALIVE_COLOR[2];
    states[i] = 0;
    vel[i * 2] = 0;
    vel[i * 2 + 1] = 0;
    death[i] = 0;
  };

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const { positions, colors, anchors, phases, speeds, radii, states, vel, death } = data;
    const t = state.clock.getElapsedTime();
    const mx = mouse.current[0] * vW;
    const my = mouse.current[1] * vH;
    const repelR = Math.min(vW, vH) * 0.3;
    const trailR = Math.min(vW, vH) * 0.16;
    const ease = Math.min(1, delta * 3.6);
    const gravity = vH * 2.6;

    // Project the recent (still-alive) trail points into world space once per frame.
    const now = performance.now();
    const tp = trail.current;
    const active: number[] = []; // flat [wx, wy, life, ...]
    for (let k = 0; k < tp.length; k++) {
      const life = 1 - (now - tp[k].t) / TRAIL_MAX_AGE;
      if (life <= 0) continue;
      const nx = (tp[k].x / window.innerWidth) * 2 - 1;
      const ny = -(tp[k].y / window.innerHeight) * 2 + 1;
      active.push(nx * vW, ny * vH, life);
    }

    // Consume a pending kill shape: any alive particle inside it bursts and dies.
    const poly = killShape.current;
    if (poly) {
      let killed = 0;
      for (let i = 0; i < COUNT; i++) {
        if (states[i] !== 0) continue;
        const s = worldToScreen(positions[i * 3], positions[i * 3 + 1]);
        if (pointInPolygon(s.x, s.y, poly)) {
          states[i] = 1;
          death[i] = 0;
          colors[i * 3] = DEAD_COLOR[0];
          colors[i * 3 + 1] = DEAD_COLOR[1];
          colors[i * 3 + 2] = DEAD_COLOR[2];
          // Burst outward + upward pop, then gravity arcs it down.
          vel[i * 2] = (Math.random() - 0.5) * vW * 0.9;
          vel[i * 2 + 1] = (0.2 + Math.random() * 0.5) * vH;
          killed++;
        }
      }
      killShape.current = null;
      if (killed > 0) onKill(killed);
    }

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const i2 = i * 2;

      // Dying: burst, fall under gravity, and fade out, then respawn.
      if (states[i] === 1) {
        death[i] += delta / DEATH_DURATION;
        vel[i2 + 1] -= gravity * delta;
        positions[i3] += vel[i2] * delta;
        positions[i3 + 1] += vel[i2 + 1] * delta;
        const fade = Math.max(0, 1 - death[i]);
        colors[i3] = DEAD_COLOR[0] * fade;
        colors[i3 + 1] = DEAD_COLOR[1] * fade;
        colors[i3 + 2] = DEAD_COLOR[2] * fade;
        if (death[i] >= 1 || positions[i3 + 1] < -vH * 1.6) respawn(i);
        continue;
      }

      const anchorX = anchors[i2] * vW * 0.95;
      const anchorY = anchors[i2 + 1] * vH * 0.9;

      // Livelier flutter: faster drift, wider wander, plus a quick wing-jitter.
      const flutterX =
        Math.sin(t * (0.9 + speeds[i] * 0.6) + phases[i]) * (radii[i] * 0.85) +
        Math.sin(t * 0.32 + phases[i] * 1.7) * vW * 0.035 +
        Math.sin(t * (3.4 + speeds[i]) + phases[i] * 2.3) * vW * 0.012;
      const flutterY =
        Math.cos(t * (0.95 + speeds[i] * 0.55) + phases[i] * 1.2) * (radii[i] * 0.8) +
        Math.cos(t * 0.36 + phases[i] * 1.5) * vH * 0.035 +
        Math.cos(t * (3.7 + speeds[i]) + phases[i] * 2.6) * vH * 0.012;

      // Subtle parallax lean toward the cursor.
      let targetX = anchorX + flutterX + (mx - anchorX) * 0.03;
      let targetY = anchorY + flutterY + (my - anchorY) * 0.03;

      // Soft repulsion bubble so dots part around the cursor.
      const dx = positions[i3] - mx;
      const dy = positions[i3 + 1] - my;
      const dist = Math.hypot(dx, dy) || 0.0001;
      if (dist < repelR) {
        const force = (1 - dist / repelR) * repelR * 0.6;
        targetX += (dx / dist) * force;
        targetY += (dy / dist) * force;
      }

      // Avoid the recent cursor trail (each segment pushes nearby dots away).
      for (let k = 0; k < active.length; k += 3) {
        const tdx = positions[i3] - active[k];
        const tdy = positions[i3 + 1] - active[k + 1];
        const td = Math.hypot(tdx, tdy) || 0.0001;
        if (td < trailR) {
          const tforce = (1 - td / trailR) * trailR * 0.5 * active[k + 2];
          targetX += (tdx / td) * tforce;
          targetY += (tdy / td) * tforce;
        }
      }

      positions[i3] += (targetX - positions[i3]) * ease;
      positions[i3 + 1] += (targetY - positions[i3 + 1]) * ease;

      // Gentle twinkle on the alive colour.
      const tw = 0.78 + 0.22 * Math.sin(t * 2.4 + phases[i] * 3);
      colors[i3] = ALIVE_COLOR[0] * tw;
      colors[i3 + 1] = ALIVE_COLOR[1] * tw;
      colors[i3 + 2] = ALIVE_COLOR[2] * tw;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    const colorAttr = meshRef.current.geometry.attributes.color;
    if (colorAttr) colorAttr.needsUpdate = true;
  });

  return (
    <Points ref={meshRef} positions={data.positions} colors={data.colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        map={glow}
        size={0.13}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        opacity={0.95}
      />
    </Points>
  );
}

// --- Neon Cursor Trail (2D canvas overlay that fades out) ---
function NeonTrail({
  trail,
  pointer,
  shapeFlashes
}: {
  trail: React.MutableRefObject<TrailPoint[]>;
  pointer: React.MutableRefObject<Pointer>;
  shapeFlashes: React.MutableRefObject<ShapeFlash[]>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const strokeSeg = (
      a: { x: number; y: number },
      b: { x: number; y: number },
      life: number,
      glow: boolean
    ) => {
      if (glow) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.5 * life})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.9)';
        ctx.shadowBlur = 18 * life;
        ctx.lineWidth = 3.5 * life + 0.5;
      } else {
        ctx.strokeStyle = `rgba(224, 242, 254, ${0.8 * life})`;
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.5 * life + 0.4;
      }
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    // Draw a completed net: fill + outline that flares intense red, then fades.
    const drawShapeFlash = (poly: { x: number; y: number }[], k: number) => {
      if (poly.length < 2) return;
      // k: 0 -> just drawn, 1 -> gone. Flare fast, fade slow.
      const flare = Math.sin(Math.min(1, k * 1.5) * Math.PI); // peak near the start
      const fade = Math.pow(1 - k, 1.4);

      ctx.beginPath();
      ctx.moveTo(poly[0].x, poly[0].y);
      for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
      ctx.closePath();

      ctx.fillStyle = `rgba(255, 36, 42, ${0.28 * fade + 0.12 * flare})`;
      ctx.fill();

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(255, 40, 48, 0.95)';
      ctx.shadowBlur = (16 + 26 * flare) * fade;
      ctx.strokeStyle = `rgba(255, ${Math.round(60 + 120 * flare)}, ${Math.round(60 + 120 * flare)}, ${0.85 * fade + 0.15 * flare})`;
      ctx.lineWidth = 2.5 + 4 * flare;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    let raf = 0;
    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Completed-net flashes (drawn under the live trail).
      const flashes = shapeFlashes.current;
      while (flashes.length && now - flashes[0].t > SHAPE_FLASH_DURATION) flashes.shift();
      for (const f of flashes) drawShapeFlash(f.poly, (now - f.t) / SHAPE_FLASH_DURATION);

      const pts = trail.current;
      while (pts.length && now - pts[0].t > TRAIL_MAX_AGE) pts.shift();

      if (pts.length > 0) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Connect recorded points, then a fresh segment to the live cursor so
        // the stroke sits exactly under the pointer.
        const head = pts[pts.length - 1];
        const tip = pointer.current;
        for (const glow of [true, false]) {
          for (let i = 1; i < pts.length; i++) {
            const life = 1 - (now - pts[i].t) / TRAIL_MAX_AGE;
            if (life > 0) strokeSeg(pts[i - 1], pts[i], life, glow);
          }
          if (tip.inside) strokeSeg(head, tip, 1, glow);
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [trail, pointer, shapeFlashes]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[2] pointer-events-none" />;
}

// --- Project Image Gallery (horizontal scroll) ---
function ProjectGallery({ images, title, projectId }: { images: string[]; title: string; projectId: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [images.length]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  // Translate vertical wheel into horizontal scroll while hovering the strip.
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return; // let page scroll
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  // Click-and-drag to scroll.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (el && el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
    setDragging(false);
  };
  // Suppress link/button clicks that conclude a drag.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="group/gallery relative mb-8">
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        onWheel={handleWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 ${dragging ? 'cursor-grabbing snap-none select-none' : 'cursor-grab'}`}
      >
        {images.map((image, imageIndex) => (
          <div
            key={`${projectId}-${imageIndex}`}
            className="flex h-56 shrink-0 snap-start items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/30 md:h-72 xl:h-80"
          >
            <img
              src={image}
              alt={`${title} screenshot ${imageIndex + 1}`}
              className="pointer-events-none h-full w-auto max-w-none object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#070b14] to-transparent transition-opacity ${canLeft ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#070b14] to-transparent transition-opacity ${canRight ? 'opacity-100' : 'opacity-0'}`} />

      {canLeft && (
        <button
          type="button"
          aria-label="Scroll images left"
          onClick={() => scrollByPage(-1)}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:border-yellow-400/40 hover:text-yellow-400 group-hover/gallery:opacity-100"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canRight && (
        <button
          type="button"
          aria-label="Scroll images right"
          onClick={() => scrollByPage(1)}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:border-yellow-400/40 hover:text-yellow-400 group-hover/gallery:opacity-100"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

// --- Store Badge ---
function StoreBadge({ url, project }: { url: string; project: string }) {
  const store = storeFor(url);
  if (!store) return null;
  const badge = STORE_BADGES[store];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={badge.alt}
      onClick={() => trackEvent('project_link_click', { project, type: 'store', store })}
      className="inline-flex transition-transform hover:scale-[1.03]"
    >
      <img src={badge.src} alt={badge.alt} className={`${badge.className} w-auto`} draggable={false} />
    </a>
  );
}

// --- Section Heading ---
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-yellow-400">{children}</h2>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
}

// --- Main App ---
export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const mouse = useRef<[number, number]>([0, 0]);
  const trail = useRef<TrailPoint[]>([]);
  const pointer = useRef<Pointer>({ x: 0, y: 0, inside: false });
  const killShape = useRef<{ x: number; y: number }[] | null>(null);
  const shapeFlashes = useRef<ShapeFlash[]>([]);
  const drawing = useRef(false);

  // --- Game progress (persisted to localStorage) ---
  const saved = useMemo(() => loadProgress(), []);
  const [kills, setKills] = useState(saved?.kills ?? 0);
  const [shapes, setShapes] = useState(saved?.shapes ?? 0);
  const [best, setBest] = useState(saved?.best ?? 0);
  const [unlocked, setUnlocked] = useState<string[]>(saved?.unlocked ?? []);
  const [visited, setVisited] = useState<string[]>(saved?.visited ?? ['about']);
  const [showMissions, setShowMissions] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; title: string }[]>([]);

  const metricValue = (m: Mission) =>
    m.metric === 'kills' ? kills : m.metric === 'shapes' ? shapes : m.metric === 'best' ? best : visited.length;

  const pushToast = useCallback((title: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  const handleKill = useCallback((count: number) => {
    if (count <= 0) return;
    setKills((k) => k + count);
    setBest((b) => Math.max(b, count));
    trackEvent('flies_trapped', { count });
  }, []);

  // Persist progress.
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ kills, shapes, best, unlocked, visited }));
  }, [kills, shapes, best, unlocked, visited]);

  // Unlock missions whose goal is met.
  useEffect(() => {
    const newly = MISSIONS.filter((m) => !unlocked.includes(m.id) && metricValue(m) >= m.goal);
    if (newly.length) {
      setUnlocked((prev) => [...prev, ...newly.map((m) => m.id)]);
      newly.forEach((m) => {
        pushToast(m.title);
        trackEvent('mission_unlocked', { mission: m.id });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kills, shapes, best, visited]);

  const navItems = [
    { id: 'about', label: 'ABOUT', icon: <User size={16} /> },
    { id: 'stack', label: 'STACK', icon: <Layers size={16} /> },
    { id: 'projects', label: 'PROJECTS', icon: <FolderCode size={16} /> },
    { id: 'contact', label: 'CONTACT', icon: <MessageSquare size={16} /> }
  ];

  // Initialize analytics once.
  useEffect(() => {
    initAnalytics();
  }, []);

  // Scroll spy to highlight the active nav item + track section views.
  useEffect(() => {
    const ids = ['about', 'stack', 'projects', 'contact'];
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          setActiveSection(id);
          setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]));
          if (!seen.has(id)) {
            seen.add(id);
            trackEvent('section_view', { section: id });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goToSection = (id: string) => {
    setActiveSection(id);
    trackEvent('nav_click', { section: id });
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen relative bg-[#020408] selection:bg-yellow-400/30 text-slate-200 font-sans"
      onMouseDown={(e) => {
        if (e.button !== 0) return; // left button only
        // Don't start a net when interacting with UI (links, buttons, galleries).
        if ((e.target as HTMLElement).closest('a, button, input, textarea, [role="button"]')) return;
        drawing.current = true;
        trail.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
        pointer.current = { x: e.clientX, y: e.clientY, inside: true };
      }}
      onMouseMove={(e) => {
        mouse.current = [
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ];

        // Trail is only drawn while dragging with the left button held.
        if (!drawing.current) {
          pointer.current.inside = false;
          return;
        }
        pointer.current = { x: e.clientX, y: e.clientY, inside: true };

        const pts = trail.current;
        const last = pts[pts.length - 1];
        if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) <= 3) return;
        pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
        if (pts.length > 120) pts.shift();

        // Closed-shape detection: did the stroke loop back near an earlier point?
        if (pts.length > 12) {
          const head = pts[pts.length - 1];
          for (let i = 0; i < pts.length - 10; i++) {
            if (Math.hypot(head.x - pts[i].x, head.y - pts[i].y) < 28) {
              const poly = pts.slice(i).map((p) => ({ x: p.x, y: p.y }));
              if (polygonArea(poly) > 2600) {
                killShape.current = poly;
                shapeFlashes.current.push({ poly, t: performance.now() });
                trail.current = []; // start a fresh stroke
                setShapes((s) => s + 1);
              }
              break;
            }
          }
        }
      }}
      onMouseUp={() => {
        drawing.current = false;
        pointer.current.inside = false;
      }}
      onMouseLeave={() => {
        drawing.current = false;
        pointer.current.inside = false;
      }}
    >
      {/* Atmospheric / Game-HUD Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.08),transparent_26%)]" />
        <div className="hud-grid absolute inset-0" />
        <div className="absolute left-[8%] top-[10%] h-56 w-56 rounded-full bg-yellow-400/15 blur-3xl aura-float" />
        <div className="absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-sky-400/15 blur-3xl aura-float-slow" />
        <div className="absolute bottom-[8%] right-[20%] h-72 w-72 rounded-full bg-rose-400/12 blur-3xl aura-float" />
        <div className="absolute left-[30%] bottom-[20%] h-60 w-60 rounded-full bg-emerald-400/10 blur-3xl aura-float-slow" />
        <div className="hud-sweep absolute inset-x-0 top-0" />
        <div className="hud-scanlines absolute inset-0 opacity-60 mix-blend-overlay" />
        <div className="hud-vignette absolute inset-0" />
      </div>

      {/* Ambient Particle Field */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <AmbientParticles mouse={mouse} trail={trail} killShape={killShape} onKill={handleKill} />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Neon Cursor Trail */}
      <NeonTrail trail={trail} pointer={pointer} shapeFlashes={shapeFlashes} />

      {/* Achievement / mission toasts */}
      <div className="fixed top-24 right-5 z-[120] flex flex-col gap-3 md:right-10">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              className="glass-card flex items-center gap-3 px-5 py-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/10">
                <Trophy size={16} className="text-yellow-400" />
              </div>
              <div>
                <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500">Mission Complete</div>
                <div className="text-sm font-bold text-white">{toast.title}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Missions HUD + play hint */}
      <div
        className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3 md:bottom-8 md:left-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {showMissions && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="glass-card w-[20rem] max-w-[calc(100vw-2.5rem)] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-400/80">
                  <Target size={14} /> Missions
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
                  {unlocked.length}/{MISSIONS.length}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {MISSIONS.map((m) => {
                  const val = metricValue(m);
                  const done = unlocked.includes(m.id) || val >= m.goal;
                  const pct = Math.min(100, (val / m.goal) * 100);
                  return (
                    <div key={m.id}>
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <span className={`flex items-center gap-2 text-sm font-semibold ${done ? 'text-yellow-400' : 'text-white'}`}>
                          {done && <Check size={13} />} {m.title}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">{Math.min(val, m.goal)}/{m.goal}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-yellow-400' : 'bg-sky-400/70'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-slate-500">{m.desc}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowMissions((v) => !v)}
          className={`glass-card flex items-center gap-2 px-4 py-3 font-mono text-[11px] uppercase tracking-widest transition-all ${
            showMissions ? 'text-yellow-400' : 'text-slate-300 hover:text-white'
          }`}
        >
          <Trophy size={14} className="text-yellow-400" />
          {unlocked.length}/{MISSIONS.length} Missions
        </button>

        <div className="glass-card flex items-center gap-2 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
          <Pencil size={12} className="text-sky-400" />
          Drag to draw a net — trap the fireflies inside
        </div>
      </div>

      {/* Top Navigation */}
      <header className="glass-bar fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-10">
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); goToSection('about'); }}
            className="flex flex-col leading-tight shrink-0"
          >
            <span className="font-mono text-sm tracking-widest text-white">
              IBRAHIM<span className="text-yellow-400">.DEV</span>
            </span>
            <span className="hidden text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500 sm:block">
              Senior Software Engineer
            </span>
          </a>

          <nav className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); goToSection(item.id); }}
                aria-label={item.label}
                className={`relative flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-[11px] tracking-widest transition-all md:px-4 ${
                  activeSection === item.id ? 'text-yellow-400' : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div layoutId="nav-active" className="absolute inset-x-2 -bottom-px h-0.5 bg-yellow-400 shadow-[0_0_10px_#facc15]" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2 text-slate-500 transition-all hover:bg-white/5 hover:text-white">
              <Github size={16} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 text-slate-500 transition-all hover:bg-white/5 hover:text-white">
              <Linkedin size={16} />
            </a>
            <a href={SOCIAL_LINKS.email} aria-label="Email" className="rounded-lg p-2 text-slate-500 transition-all hover:bg-white/5 hover:text-white">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-32">

        {/* Hero — name, intro, history */}
        <section id="about" className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card relative overflow-hidden p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-sky-400/5" />
            <div className="relative max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </div>
              <h1 className="mb-5 text-5xl font-bold tracking-tighter text-white md:text-7xl">
                Ibrahim Butt
              </h1>
              <p className="mb-8 text-lg font-light leading-relaxed text-slate-300 md:text-xl">
                Senior Software Engineer building <span className="font-medium text-white">multiplayer, mobile, and WebGL</span> game experiences.
              </p>
              <div className="mb-8 flex flex-wrap gap-x-8 gap-y-4">
                {EXPERIENCE_STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SOCIAL_LINKS.email}
                  onClick={() => trackEvent('contact_click', { location: 'hero' })}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-yellow-300"
                >
                  <Mail size={16} /> Get in touch
                </a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackEvent('social_click', { network: 'github' })} className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10">
                  <Github size={18} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackEvent('social_click', { network: 'linkedin' })} className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tech Stack */}
        <section id="stack" className="mb-24">
          <div className="glass-card p-8 md:p-10">
            <div className="mb-7 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-400/70">
              <Layers size={14} /> Tech Stack
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-8">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-3 py-6 text-slate-300 transition-all hover:border-yellow-400/30 hover:bg-white/5 hover:text-yellow-400"
                >
                  {TECH_SVGS[tech.key]}
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em]">{tech.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {SPECIALTIES.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-300 transition-colors hover:border-yellow-400/30 hover:text-yellow-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects — Bento */}
        <section id="projects" className="mb-24">
          <SectionHeading>Mission Log</SectionHeading>
          <div className="space-y-4">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group glass-card relative flex flex-col overflow-hidden p-6 md:p-7"
              >
                {project.status && (
                  <div className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/60 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-yellow-400 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    {project.status}
                  </div>
                )}
                <ProjectGallery images={project.images} title={project.title} projectId={project.id} />
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-yellow-400">{project.title}</h3>
                    <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-yellow-400/70">{project.shortDesc}</p>
                  </div>
                  <div className="flex gap-3">
                    {project.techs.map((tech) => (
                      <div key={tech} className="text-slate-600 transition-colors hover:text-white">
                        {TECH_SVGS[tech]}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mb-6 flex-1 leading-relaxed text-slate-400">{project.summary}</p>
                <div className="flex flex-wrap items-center gap-3">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_link_click', { project: project.title, type: 'website' })}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-all hover:border-yellow-400/30 hover:text-yellow-400"
                    >
                      <Globe size={14} /> Website
                    </a>
                  )}
                  {project.videoUrl ? (
                    <button
                      onClick={() => {
                        trackEvent('project_link_click', { project: project.title, type: 'video' });
                        setActiveVideo(project.videoUrl!);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-yellow-400 transition-all hover:bg-yellow-400/15"
                    >
                      <Play size={14} /> {project.mediaLabel}
                    </button>
                  ) : storeFor(project.mediaUrl) ? (
                    <StoreBadge url={project.mediaUrl!} project={project.title} />
                  ) : project.mediaUrl && (
                    <a
                      href={project.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_link_click', { project: project.title, type: 'media' })}
                      className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-yellow-400 transition-all hover:bg-yellow-400/15"
                    >
                      <ExternalLink size={14} /> {project.mediaLabel}
                    </a>
                  )}
                  {!project.websiteUrl && !project.videoUrl && !project.mediaUrl && (
                    <a
                      href={`mailto:ibrahim.alibu11work@gmail.com?subject=${encodeURIComponent(`${project.title} — Demo request`)}`}
                      onClick={() => trackEvent('project_link_click', { project: project.title, type: 'demo_request' })}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-all hover:border-yellow-400/30 hover:text-yellow-400"
                    >
                      <Mail size={14} /> Request Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-24">
          <div className="glass-card relative overflow-hidden p-12 text-center md:p-20">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-sky-400/5" />
            <div className="relative">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">Ready for Deployment?</h2>
              <p className="mx-auto mb-10 max-w-xl leading-relaxed text-slate-400">
                Available for multiplayer, gameplay, and mobile game projects.
              </p>
              <a
                href="mailto:ibrahim.alibu11work@gmail.com"
                onClick={() => trackEvent('contact_click', { location: 'contact_section' })}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-yellow-400"
              >
                Send Message <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 py-16 text-center text-[10px] font-mono uppercase tracking-[0.5em] text-slate-600">
          Ibrahim Butt // Core Systems // 2026
        </footer>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl md:p-20"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
              <iframe
                src={activeVideo}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
