import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Zap,
  User,
  FolderCode, 
  MessageSquare, 
  Settings, 
  Briefcase,
  Trophy,
  MousePointer2,
  Globe,
  ExternalLink
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface ExperienceEntry {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
}

interface ExperienceStat {
  value: string;
  label: string;
}

// --- Constants & Data ---
const EXPERIENCE_STATS: ExperienceStat[] = [
  { value: "4+", label: "Years In Game Dev" },
  { value: "3+", label: "Multiplayer Titles Shipped" },
  { value: "100+", label: "Concurrent Players" },
  { value: "<100ms", label: "Average Match Latency" }
];

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Devsinc",
    location: "Hybrid, Lahore",
    role: "Senior Software Engineer",
    period: "Feb 2025 - Present",
    description: "Architecting multiplayer titles with Photon PUN2/Fusion, Azure, and PlayFab.",
    highlights: [
      "100+ concurrent players at ~85ms average latency",
      "40% lower hosting costs through custom multiplayer pipeline",
      "1,000+ daily matches with sub-3 second queue times"
    ],
    stack: ["Photon Fusion", "PlayFab", "Azure", "Optimization"]
  },
  {
    company: "Katana Games",
    location: "Hybrid, Lahore",
    role: "Game Developer",
    period: "Apr 2022 - Feb 2024",
    description: "Built multiplayer systems, AI bots, localization, and gameplay features for shipped Unity titles.",
    highlights: [
      "Seamless online and offline flow with 200ms transition time",
      "15+ AI behavior states for human-like bot play",
      "5-language localization and 98% crash-free delivery"
    ],
    stack: ["Photon PUN2", "AI Systems", "Localization", "Gameplay"]
  },
  {
    company: "Game Train",
    location: "On-Site, Lahore",
    role: "Internee",
    period: "Jan 2022 - Apr 2022",
    description: "Completed intensive game development training and ranked among the top participants.",
    highlights: [
      "Ranked Top 3 among 50+ participants",
      "Built 4 technical projects in Unity and C#",
      "Scored 95% in technical and communication assessments"
    ],
    stack: ["Unity", "C#", "Architecture", "Bootcamp"]
  }
];

const SOCIAL_LINKS = {
  github: "https://github.com/IbrahimBu11",
  linkedin: "https://www.linkedin.com/in/ibrahim-butt321123/",
  email: "mailto:ibrahim.alibu11work@gmail.com"
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Nanocry",
    shortDesc: "Multiplayer Battle Royale // Unity, Photon Fusion.",
    summary: "Lead multiplayer developer architecting a 30+ player, server-authoritative battle royale on Photon Fusion. Lag compensation (hitbox buffering, KCC) cuts perceived latency by 40%, with Unity Multiplay matchmaking, dedicated servers, and a high-frequency sync system handling 150+ objects per frame.",
    techs: ["unity", "photon", "csharp"],
    images: [nanocry01, nanocry02, nanocry03, nanocry04],
    status: "Under Development"
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
    images: [kungFuKarate01, kungFuKarate02, kungFuKarate03]
  },
  {
    id: 8,
    title: "US Police Dog",
    shortDesc: "Open-World Simulator // Unity, Mobile.",
    summary: "Worked on gameplay systems for an open-world police K-9 simulator — mission-driven objectives, chase mechanics, and interactive city gameplay.",
    techs: ["unity", "csharp"],
    images: [usPoliceDog01, usPoliceDog02, usPoliceDog03]
  }
];

const SKILL_GROUPS: { category: string; skills: string[] }[] = [
  {
    category: "Networking & Multiplayer",
    skills: ["Photon PUN2 / Fusion / Quantum", "Mirror", "EdgeGap", "NetCode", "Server-Authoritative Architecture", "Lag Compensation (Hitbox Buffering, KCC)", "Matchmaking", "Lobby Management"]
  },
  {
    category: "Backend & Cloud",
    skills: ["PlayFab", "Azure Functions", "Azure Blob Storage", "Firebase", "Firestore", "Unity Multiplay", "REST APIs"]
  },
  {
    category: "Game Development",
    skills: ["Unity (C#)", "Performance Profiling", "Memory Optimization", "Mobile Optimization", "UFE2", "RFPS Kits"]
  },
  {
    category: "Tools & Workflow",
    skills: ["Git", "Rider", "Unity Profiler", "Trello", "Slack", "Jira"]
  },
  {
    category: "Specialized",
    skills: ["Blockchain Integration (NFT / Wallet)", "Turn-Based Combat Systems", "AI State Machines", "Localization"]
  }
];

// --- Achievement System ---
const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_kill', title: 'First Contact', description: 'Extinguished your first firefly.', unlocked: false },
  { id: 'exterminator', title: 'Exterminator', description: 'Cleared 20 fireflies.', unlocked: false },
  { id: 'explorer', title: 'Scholar', description: 'Visited all sections of the portfolio.', unlocked: false },
  { id: 'night_owl', title: 'Night Owl', description: 'Visited the site during late hours.', unlocked: false },
  { id: 'shockwave_pro', title: 'Shockwave Master', description: 'Used the Shockwave ability 3 times.', unlocked: false },
  { id: 'speed_demon', title: 'Speed Demon', description: 'Cleared 5 fireflies in under 2 seconds.', unlocked: false },
];

// --- Three.js Fireflies Component ---
function Fireflies({ mouse, isLocked, level, explosions, shockwaveActive, shockwavePos }: { 
  mouse: React.MutableRefObject<[number, number]>, 
  isLocked: boolean,
  level: number,
  explosions: { x: number, y: number, id: number }[],
  shockwaveActive: boolean,
  shockwavePos: [number, number]
}) {
  const meshRef = useRef<THREE.Points>(null!);
  const shockwaveRef = useRef<THREE.Group>(null!);
  const lastShockwaveActive = useRef(false);
  const processedExplosions = useRef<Set<number>>(new Set());
  const { camera, viewport } = useThree();
  
  // Viewport scaling factors
  const vW = viewport.width / 2;
  const vH = viewport.height / 2;

  // Pre-allocate a smaller, calmer pool of particles
  const MAX_PARTICLES = 180;
  const particles = useMemo(() => {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const velocities = new Float32Array(MAX_PARTICLES * 3);
    const types = new Float32Array(MAX_PARTICLES); // 0: normal, 1: aggressive
    const phases = new Float32Array(MAX_PARTICLES);
    const speeds = new Float32Array(MAX_PARTICLES);
    const radii = new Float32Array(MAX_PARTICLES);
    const anchors = new Float32Array(MAX_PARTICLES * 2);
    
    for (let i = 0; i < MAX_PARTICLES; i++) {
      // Initialize off-screen to avoid static background dots
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 1000; 
      positions[i * 3 + 2] = 0;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      types[i] = Math.random() > 0.88 ? 1 : 0;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.35 + Math.random() * 0.85;
      radii[i] = 0.2 + Math.random() * 0.9;
      anchors[i * 2] = (Math.random() - 0.5) * 1.8;
      anchors[i * 2 + 1] = (Math.random() - 0.5) * 1.5;
    }
    return { positions, velocities, types, phases, speeds, radii, anchors };
  }, []);

  useFrame((state, delta) => {
    const { positions, velocities, types, phases, speeds, radii, anchors } = particles;
    const time = state.clock.getElapsedTime();
    
    // Current active count based on level
    const activeCount = Math.min(MAX_PARTICLES, 28 + Math.floor(level) * 12);

    // Global Shockwave logic
    if (shockwaveRef.current && shockwaveActive) {
      const sx = shockwavePos[0] * vW;
      const sy = shockwavePos[1] * vH;

      if (!lastShockwaveActive.current) {
        shockwaveRef.current.position.set(sx, sy, 0);
        for (let i = 0; i < MAX_PARTICLES; i++) {
          const i3 = i * 3;
          if (positions[i3 + 1] > 500) continue; // Skip inactive
          const dx = positions[i3] - sx;
          const dy = positions[i3 + 1] - sy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          velocities[i3] += (dx / dist) * 1.5;
          velocities[i3 + 1] += (dy / dist) * 1.5;
        }
      }
      shockwaveRef.current.scale.setScalar(shockwaveRef.current.scale.x + delta * 40);
      shockwaveRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity *= 0.8;
        }
      });
    } else if (shockwaveRef.current) {
      shockwaveRef.current.scale.setScalar(0);
      shockwaveRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = child.userData.initialOpacity || 0.8;
        }
      });
    }
    lastShockwaveActive.current = shockwaveActive;

    // Mini-Shockwaves (Explosions) logic
    explosions.forEach(exp => {
      if (!processedExplosions.current.has(exp.id)) {
        const ex = exp.x * vW;
        const ey = exp.y * vH;
        for (let i = 0; i < MAX_PARTICLES; i++) {
          const i3 = i * 3;
          if (positions[i3 + 1] > 500) continue; // Skip inactive
          const dx = positions[i3] - ex;
          const dy = positions[i3 + 1] - ey;
          const distSq = dx * dx + dy * dy;
          if (distSq < 2) {
            const dist = Math.sqrt(distSq) || 0.1;
            const force = (1.5 - dist) * 0.2;
            velocities[i3] += (dx / dist) * force;
            velocities[i3 + 1] += (dy / dist) * force;
          }
        }
        processedExplosions.current.add(exp.id);
      }
    });

    if (explosions.length === 0) processedExplosions.current.clear();

    // Environmental Effect: subtle camera shake at high threat
    if (level > 7) {
      camera.position.x = Math.sin(time * 18) * (level - 7) * 0.004;
      camera.position.y = Math.cos(time * 18) * (level - 7) * 0.004;
    } else {
      camera.position.x = 0;
      camera.position.y = 0;
    }

    const maxDistance = Math.max(vW, vH) * 1.7;
    const maxDistanceSq = maxDistance * maxDistance;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3;
      const i2 = i * 2;
      
      // Handle active/inactive state
      if (i >= activeCount) {
        positions[i3 + 1] = 1000; // Move far off-screen
        continue;
      } else if (positions[i3 + 1] > 500) {
        // Just became active, spawn around a soft anchor point
        const anchorX = anchors[i2] * vW * 0.9;
        const anchorY = anchors[i2 + 1] * vH * 0.85;
        positions[i3] = anchorX + (Math.random() - 0.5) * vW * 0.12;
        positions[i3 + 1] = anchorY + (Math.random() - 0.5) * vH * 0.12;
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      }

      const isAggressive = types[i] === 1 && level > 4;
      
      // Respawn logic (if drifted too far)
      const distSq = positions[i3] * positions[i3] + positions[i3 + 1] * positions[i3 + 1];
      if (distSq > maxDistanceSq) {
        const anchorX = anchors[i2] * vW * 0.9;
        const anchorY = anchors[i2 + 1] * vH * 0.85;
        positions[i3] = anchorX;
        positions[i3 + 1] = anchorY;
        velocities[i3] = 0;
        velocities[i3 + 1] = 0;
      }

      const anchorX = anchors[i2] * vW * 0.9;
      const anchorY = anchors[i2 + 1] * vH * 0.85;
      const flutterX =
        Math.sin(time * (0.35 + speeds[i] * 0.25) + phases[i]) * (radii[i] * 0.55 + level * 0.025) +
        Math.sin(time * (0.18 + speeds[i] * 0.1) + phases[i] * 1.9) * vW * 0.03;
      const flutterY =
        Math.cos(time * (0.4 + speeds[i] * 0.22) + phases[i] * 1.3) * (radii[i] * 0.45 + level * 0.02) +
        Math.cos(time * (0.2 + speeds[i] * 0.1) + phases[i] * 1.6) * vH * 0.025;

      let targetX = anchorX + flutterX;
      let targetY = anchorY + flutterY;

      if (isLocked && !shockwaveActive) {
        const mousePull = isAggressive ? 0.62 : 0.35;
        targetX = THREE.MathUtils.lerp(targetX, mouse.current[0] * vW, mousePull);
        targetY = THREE.MathUtils.lerp(targetY, mouse.current[1] * vH, mousePull);
      } else if (isAggressive && !shockwaveActive) {
        targetX = THREE.MathUtils.lerp(targetX, mouse.current[0] * vW, 0.18);
        targetY = THREE.MathUtils.lerp(targetY, mouse.current[1] * vH, 0.18);
      }

      let attractionStrength = isLocked ? 0.001 + level * 0.00012 : 0.00022;
      if (isAggressive) attractionStrength *= 1.25;
      
      if (!shockwaveActive) {
        velocities[i3] += (targetX - positions[i3]) * attractionStrength;
        velocities[i3 + 1] += (targetY - positions[i3 + 1]) * attractionStrength;
      }

      const driftScale = 0.0018 + level * 0.0003;
      velocities[i3] += (Math.random() - 0.5) * driftScale;
      velocities[i3 + 1] += (Math.random() - 0.5) * driftScale;

      const speed = Math.hypot(velocities[i3], velocities[i3 + 1]);
      const maxSpeed = (isLocked ? 0.08 : 0.035) + level * 0.004;
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        velocities[i3] *= scale;
        velocities[i3 + 1] *= scale;
      }

      positions[i3] += velocities[i3] * delta * 60;
      positions[i3 + 1] += velocities[i3 + 1] * delta * 60;
      positions[i3 + 2] += velocities[i3 + 2] * delta * 60;

      const friction = Math.max(0.88, 0.95 - level * 0.003);
      const damping = Math.pow(friction, delta * 60);
      velocities[i3] *= damping;
      velocities[i3 + 1] *= damping;
      velocities[i3 + 2] *= damping;
    }
    if (!meshRef.current) return;
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={meshRef} positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={level > 5 ? "#fb7185" : "#fde047"}
          size={level > 4 ? 0.11 : 0.07}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={level > 3 ? 0.72 : 0.5}
        />
      </Points>
      
      {/* Shockwave Visual - Improved with multiple rings */}
      <group ref={shockwaveRef}>
        <mesh onUpdate={(self) => (self.userData.initialOpacity = 0.8)}>
          <ringGeometry args={[0.1, 0.2, 64]} />
          <meshBasicMaterial color="#facc15" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
        <mesh scale={0.8} onUpdate={(self) => (self.userData.initialOpacity = 0.5)}>
          <ringGeometry args={[0.1, 0.15, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Mini Shockwaves for Left Clicks */}
      {explosions.map(exp => (
        <group key={exp.id} position={[exp.x * vW, exp.y * vH, 0]}>
          <MiniShockwaveVisual />
        </group>
      ))}
    </group>
  );
}

function MiniShockwaveVisual() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(meshRef.current.scale.x + delta * 10);
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity -= delta * 3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.05, 0.1, 32]} />
      <meshBasicMaterial color="#facc15" transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

// --- Main App ---
export default function App() {
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [killCount, setKillCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [level, setLevel] = useState(1);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set(['about']));
  const [showInstructions, setShowInstructions] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [notifications, setNotifications] = useState<{ id: string, title: string, type: 'achievement' | 'level' }[]>([]);
  const [explosions, setExplosions] = useState<{ x: number, y: number, id: number }[]>([]);
  const [shockwaveReady, setShockwaveReady] = useState(false);
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [shockwavePos, setShockwavePos] = useState<[number, number]>([0, 0]);
  const [shockwaveCount, setShockwaveCount] = useState(0);
  const [lastKills, setLastKills] = useState<number[]>([]);
  const [screenFlash, setScreenFlash] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  const mouse = useRef<[number, number]>([0, 0]);

  // Difficulty scaling over time
  useEffect(() => {
    const timer = setInterval(() => {
      if (!showInstructions) {
        setLevel(prev => {
          const next = prev + 0.1;
          const oldLevel = Math.floor(prev);
          const newLevel = Math.floor(next);
          
          if (newLevel > oldLevel && newLevel > 1) {
            addNotification(`Level Up: Threat Level ${newLevel}`, 'level');
          }

          if (next >= 2 && !isLocked) setIsLocked(true);
          return next;
        });
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [showInstructions, isLocked]);

  // Load achievements
  useEffect(() => {
    const saved = localStorage.getItem('ibrahim_achievements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAchievements(prev => prev.map(a => ({
          ...a,
          unlocked: parsed.find((p: any) => p.id === a.id)?.unlocked || false
        })));
      } catch (e) {
        console.error("Failed to load achievements", e);
      }
    }

    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 4) {
      unlockAchievement('night_owl');
    }
  }, []);

  const addNotification = (title: string, type: 'achievement' | 'level') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, title, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        addNotification(`Achievement: ${achievement.title}`, 'achievement');
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 500);
        const updated = prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
        localStorage.setItem('ibrahim_achievements', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const handleKill = (e: React.MouseEvent) => {
    // Don't trigger game mechanics if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, a, input, [role="button"]')) return;

    const now = Date.now();
    const newCount = killCount + 1;
    setKillCount(newCount);
    
    // Speed Demon check
    const recentKills = [...lastKills, now].filter(t => now - t < 2000);
    setLastKills(recentKills);
    if (recentKills.length >= 5) unlockAchievement('speed_demon');

    // Add explosion
    const expId = Date.now();
    setExplosions(prev => [...prev, { x: mouse.current[0], y: mouse.current[1], id: expId }]);
    setTimeout(() => setExplosions(prev => prev.filter(exp => exp.id !== expId)), 500);

    unlockAchievement('first_kill');
    if (newCount >= 20) unlockAchievement('exterminator');
    
    // Shockwave logic
    if (newCount % 10 === 0) setShockwaveReady(true);

    // Unlock logic: clearing reduces level/difficulty
    setLevel(prev => Math.max(1, prev - 0.2));
    if (level < 2) setIsLocked(false);
  };

  const triggerShockwave = (e: React.MouseEvent) => {
    if (!shockwaveReady) return;
    // Don't trigger game mechanics if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, a, input, [role="button"]')) return;
    
    e.preventDefault();
    setShockwaveReady(false);
    setShockwavePos([mouse.current[0], mouse.current[1]]);
    setShockwaveActive(true);
    setTimeout(() => setShockwaveActive(false), 1000);

    const newShockwaveCount = shockwaveCount + 1;
    setShockwaveCount(newShockwaveCount);
    if (newShockwaveCount >= 3) unlockAchievement('shockwave_pro');

    setIsLocked(false);
    setLevel(1);
    addNotification("Shockwave Triggered!", "level");
    
    // Visual feedback
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 300);
    
    setTimeout(() => {
      if (level > 2) setIsLocked(true);
    }, 15000);
  };

  const handleSectionVisit = (id: string) => {
    setActiveSection(id);
    setVisitedSections(prev => {
      const next = new Set(prev).add(id);
      if (next.size >= 5) unlockAchievement('explorer');
      return next;
    });
  };

  const [showAchievements, setShowAchievements] = useState(false);

  const navItems = [
    { id: 'about', label: 'ABOUT', icon: <User size={16} /> },
    { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase size={16} /> },
    { id: 'skills', label: 'SKILLS', icon: <Settings size={16} /> },
    { id: 'projects', label: 'PROJECTS', icon: <FolderCode size={16} /> },
    { id: 'contact', label: 'CONTACT', icon: <MessageSquare size={16} /> },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div 
      className="min-h-screen relative bg-[#020408] selection:bg-yellow-400/30 text-slate-200 font-sans cursor-crosshair"
      onMouseMove={(e) => {
        mouse.current = [
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1
        ];
      }}
      onClick={handleKill}
      onContextMenu={triggerShockwave}
    >
      {/* Screen Flash Effect */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-yellow-400 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.08),transparent_26%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-[8%] top-[10%] h-56 w-56 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[8%] right-[20%] h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      {/* Three.js Background */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Fireflies 
              mouse={mouse} 
              isLocked={isLocked} 
              level={level} 
              explosions={explosions} 
              shockwaveActive={shockwaveActive}
              shockwavePos={shockwavePos}
            />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Notifications */}
      <div className="fixed top-10 right-10 z-[110] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="glass-card px-6 py-4 flex items-center gap-4 border-yellow-400/30"
            >
              <div className="w-10 h-10 bg-yellow-400/10 rounded-full flex items-center justify-center">
                {n.type === 'achievement' ? <Trophy className="text-yellow-400 w-5 h-5" /> : <Zap className="text-yellow-400 w-5 h-5" />}
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Notification</div>
                <div className="text-sm font-bold text-white">{n.title}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Game Overlay / Instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full glass-card p-10 text-center">
              <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MousePointer2 className="text-yellow-400 w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Portfolio Quest</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                The fireflies have swarmed the content! <br />
                <span className="text-yellow-400 font-medium">Click on the fireflies</span> to clear them and reveal the sections. 
                Unlock achievements as you explore.
              </p>
              <button 
                onClick={() => setShowInstructions(false)}
                className="w-full py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors uppercase tracking-widest text-sm"
              >
                Start Mission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-10">
          {/* Brand */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleSectionVisit('about');
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col leading-tight shrink-0"
          >
            <span className="font-mono text-sm tracking-widest text-white">
              IBRAHIM<span className="text-yellow-400">.DEV</span>
            </span>
            <span className="hidden text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500 sm:block">
              Senior Software Engineer
            </span>
          </a>

          {/* Nav */}
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionVisit(item.id);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
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

          {/* Achievements + Socials */}
          <div className="relative flex shrink-0 items-center gap-1 sm:gap-2">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden rounded-lg p-2 text-slate-500 transition-all hover:bg-white/5 hover:text-white sm:block">
              <Github size={16} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hidden rounded-lg p-2 text-slate-500 transition-all hover:bg-white/5 hover:text-white sm:block">
              <Linkedin size={16} />
            </a>
            <button
              onClick={() => setShowAchievements(v => !v)}
              aria-label="Achievements"
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-[11px] tracking-widest transition-all ${
                showAchievements ? 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Trophy size={14} className="text-yellow-400" />
              <span>{unlockedCount}/{achievements.length}</span>
            </button>

            <AnimatePresence>
              {showAchievements && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="glass-card absolute right-0 top-full z-[60] mt-3 w-72 border-yellow-400/20 p-5"
                >
                  <div className="mb-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    <Trophy size={14} className="text-yellow-400" />
                    <span>Achievements</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {achievements.map(a => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAchievement(a)}
                        className={`flex aspect-square items-center justify-center rounded-lg border transition-all ${
                          a.unlocked ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' : 'bg-white/5 border-white/5 text-slate-700'
                        }`}
                      >
                        <Zap size={16} />
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {selectedAchievement && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-4 rounded-xl border border-yellow-400/20 bg-black/30 p-4"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-yellow-400">Achievement</div>
                          <button onClick={() => setSelectedAchievement(null)} className="text-slate-500 hover:text-white">X</button>
                        </div>
                        <div className="mb-1 text-sm font-bold text-white">{selectedAchievement.title}</div>
                        <div className="text-xs leading-tight text-slate-400">{selectedAchievement.description}</div>
                        {!selectedAchievement.unlocked && (
                          <div className="mt-2 text-[9px] font-mono uppercase tracking-widest italic text-slate-600">[ Locked ]</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-24 md:px-12 md:pt-28">
        
        {/* Content Mask */}
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-10 pointer-events-none transition-colors duration-1000 ${level > 6 ? 'bg-red-900/20' : 'bg-black/40'} backdrop-blur-[4px]`}
            />
          )}
        </AnimatePresence>

        {/* Sections */}
        <div className={`transition-all duration-700 ${isLocked ? 'opacity-20 blur-sm scale-[0.98]' : 'opacity-100 blur-0 scale-100'}`}>
          
          {/* Hero Section */}
          <section id="about" className="min-h-[80vh] flex flex-col justify-center mb-32">
            <div className="max-w-3xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
                  Ibrahim Butt
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12">
                  Senior Software Engineer building <span className="text-white font-medium">multiplayer, mobile, and WebGL</span> game experiences.
                </p>
                <div className="flex gap-6">
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white">
                    <Github size={20} />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white">
                    <Linkedin size={20} />
                  </a>
                  <a href={SOCIAL_LINKS.email} aria-label="Email" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white">
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-40">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-xs font-mono tracking-[0.4em] uppercase text-yellow-400">Professional Experience</h2>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-10 xl:grid-cols-4">
              {EXPERIENCE_STATS.map((stat) => (
                <div key={stat.label} className="glass-card p-6">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="glass-card relative overflow-hidden p-8 md:p-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 via-transparent to-sky-400/6" />
                  <div className="absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent" />
                  <div className="relative flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
                        <h3 className="text-2xl md:text-3xl font-semibold text-white">{exp.role}</h3>
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.25em]">{exp.period}</span>
                      </div>
                      <div className="text-yellow-400/70 font-mono text-[10px] uppercase tracking-[0.2em] mb-5">
                        {exp.company} // {exp.location}
                      </div>
                      <p className="text-slate-300 leading-relaxed max-w-2xl mb-6">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3 xl:w-[22rem]">
                      {exp.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-relaxed text-slate-300"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="mb-40">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-xs font-mono tracking-[0.4em] uppercase text-yellow-400">Technical Arsenal</h2>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category} className="glass-card p-8 flex flex-col gap-5 hover:bg-white/5 transition-all">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-yellow-400/70">{group.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-300 transition-colors hover:border-yellow-400/30 hover:text-yellow-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-40">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-xs font-mono tracking-[0.4em] uppercase text-yellow-400">Mission Log</h2>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>
            <div className="space-y-16">
              {PROJECTS.map((project) => (
                <div key={project.id} className="group glass-card relative overflow-hidden p-6 md:p-8">
                  {project.status && (
                    <div className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-black/60 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-yellow-400 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      {project.status}
                    </div>
                  )}
                  <div className="no-scrollbar mb-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
                    {project.images.map((image, imageIndex) => (
                      <div
                        key={`${project.id}-${imageIndex}`}
                        className="flex h-64 shrink-0 snap-start items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/30 md:h-80 xl:h-[26rem]"
                      >
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${imageIndex + 1}`}
                          className="h-full w-auto max-w-none object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                      <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-yellow-400/70">{project.shortDesc}</p>
                    </div>
                    <div className="flex gap-4">
                      {project.techs.map(tech => (
                        <div key={tech} className="text-slate-600 hover:text-white transition-colors">
                          {TECH_SVGS[tech]}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-2xl mb-8">{project.summary}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-all hover:border-yellow-400/30 hover:text-yellow-400"
                      >
                        <Globe size={14} />
                        Website
                      </a>
                    )}
                    {project.videoUrl ? (
                      <button
                        onClick={() => setActiveVideo(project.videoUrl!)}
                        className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-yellow-400 transition-all hover:bg-yellow-400/15"
                      >
                        <Zap size={14} />
                        {project.mediaLabel}
                      </button>
                    ) : project.mediaUrl && (
                      <a
                        href={project.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-yellow-400 transition-all hover:bg-yellow-400/15"
                      >
                        <ExternalLink size={14} />
                        {project.mediaLabel}
                      </a>
                    )}
                    {!project.websiteUrl && !project.videoUrl && !project.mediaUrl && (
                      <a
                        href={`mailto:ibrahim.alibu11work@gmail.com?subject=${encodeURIComponent(`${project.title} — Demo request`)}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-all hover:border-yellow-400/30 hover:text-yellow-400"
                      >
                        <Mail size={14} />
                        Request Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-40">
            <div className="glass-card p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready for Deployment?</h2>
              <p className="text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
                Available for multiplayer, gameplay, and mobile game projects.
              </p>
              <a 
                href="mailto:ibrahim.alibu11work@gmail.com"
                className="inline-block px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-yellow-400 transition-all uppercase tracking-widest text-sm"
              >
                Send Message
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 border-t border-white/5 text-center text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">
            Ibrahim Butt // Core Systems // 2026
          </footer>
        </div>
      </main>

      {/* Game Status UI */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4 pointer-events-none">
        {shockwaveReady && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="glass-card px-6 py-3 border-emerald-400/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest flex items-center gap-3"
          >
            <Zap size={14} className="animate-pulse" />
            Shockwave Ready (Right Click)
          </motion.div>
        )}
        <div className="glass-card px-6 py-3 flex items-center gap-4">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Threat Level</div>
          <div className={`text-xs font-mono uppercase tracking-widest ${level > 3 ? 'text-red-400' : 'text-yellow-400'}`}>
            Level {Math.floor(level)}
          </div>
        </div>
        <div className="glass-card px-6 py-3 flex items-center gap-4">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Cleared</div>
          <div className="text-xs font-mono text-yellow-400 uppercase tracking-widest">
            {killCount} Fireflies
          </div>
        </div>
      </div>
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
              >
                <Zap size={20} className="rotate-45" />
              </button>
              <iframe 
                src={activeVideo} 
                className="w-full h-full" 
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
