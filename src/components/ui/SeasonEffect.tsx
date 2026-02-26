"use client";

import { useEffect, useState } from "react";
import { Leaf, Snowflake } from "lucide-react";

export type Season = "spring" | "summer" | "fall" | "winter";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  swayMid: number;
  swayEnd: number;
  initialRotate: number;
  colorStop: number;
}

interface SeasonEffectProps {
  season?: Season;
}

const SPRING_COLORS = [
  "radial-gradient(ellipse at 40% 35%, #FFE4EE 0%, #FFB3C8 45%, #FF8FA3 100%)",
  "radial-gradient(ellipse at 40% 35%, #FFC8D8 0%, #FF8FA3 50%, #FF6B8A 100%)",
  "radial-gradient(ellipse at 40% 35%, #FFD6E7 0%, #FFA0B8 50%, #FF7B95 100%)",
];

const FALL_ICON_COLORS = [
  "#FB923C",
  "#F59E0B",
  "#EF4444",
  "#EA580C",
  "#D97706",
];
const WINTER_ICON_COLORS = ["#FFFFFF", "#BAE6FD", "#E0F2FE", "#7DD3FC"];

const SUMMER_COLORS = [
  "radial-gradient(ellipse at 50% 50%, #FEF9C3 0%, #BBF7D0 60%, #86EFAC 100%)",
  "radial-gradient(ellipse at 50% 50%, #FEF08A 0%, #A7F3D0 60%, #6EE7B7 100%)",
  "radial-gradient(ellipse at 50% 50%, #D9F99D 0%, #86EFAC 50%, #4ADE80 100%)",
];

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 105 - 2,
    size: Math.random() * 10 + 6,
    delay: Math.random() * 18,
    duration: Math.random() * 8 + 10,
    swayMid: (Math.random() - 0.5) * 100,
    swayEnd: (Math.random() - 0.5) * 80,
    initialRotate: Math.random() * 360,
    colorStop: 0,
  }));
}

export default function SeasonEffect({ season = "spring" }: SeasonEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = season === "winter" ? 40 : season === "summer" ? 15 : 20;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left:
          season === "summer"
            ? Math.random() * 105 - 2
            : Math.random() * 105 - 2,
        size:
          season === "winter"
            ? Math.random() * 16 + 12
            : season === "summer"
              ? Math.random() * 8 + 5
              : Math.random() * 12 + 8,
        delay: Math.random() * 18,
        duration:
          season === "winter"
            ? Math.random() * 10 + 14
            : season === "summer"
              ? Math.random() * 6 + 12
              : Math.random() * 8 + 10,
        swayMid:
          season === "winter"
            ? (Math.random() - 0.5) * 30
            : season === "fall"
              ? (Math.random() - 0.5) * 140
              : (Math.random() - 0.5) * 100,
        swayEnd:
          season === "winter"
            ? (Math.random() - 0.5) * 20
            : season === "fall"
              ? (Math.random() - 0.5) * 100
              : (Math.random() - 0.5) * 80,
        initialRotate: Math.random() * 360,
        colorStop: Math.floor(
          Math.random() *
            (season === "winter"
              ? 4
              : season === "fall"
                ? 5
                : season === "summer"
                  ? 3
                  : 3),
        ),
      })),
    );
  }, [season]);

  const getColors = () => {
    if (season === "spring") return SPRING_COLORS;
    return SUMMER_COLORS;
  };

  const animName =
    season === "spring"
      ? "petal-fall"
      : season === "summer"
        ? "firefly-float"
        : season === "fall"
          ? "leaf-fall"
          : "snow-fall";

  const timingFn = season === "summer" ? "ease-in-out" : "linear";
  const colors = getColors();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes petal-fall {
          0%   { transform: translateY(-30px) translateX(0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.8; }
          50%  { transform: translateY(48vh) translateX(var(--sway-mid, 30px)) rotate(380deg); opacity: 0.65; }
          92%  { opacity: 0.4; }
          100% { transform: translateY(108vh) translateX(var(--sway-end, -20px)) rotate(760deg); opacity: 0; }
        }
        @keyframes leaf-fall {
          0%   { transform: translateY(-30px) translateX(0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.75; }
          50%  { transform: translateY(48vh) translateX(var(--sway-mid, 60px)) rotate(280deg); opacity: 0.6; }
          92%  { opacity: 0.35; }
          100% { transform: translateY(108vh) translateX(var(--sway-end, -40px)) rotate(560deg); opacity: 0; }
        }
        @keyframes snow-fall {
          0%   { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.7; }
          50%  { transform: translateY(48vh) translateX(var(--sway-mid, 15px)) rotate(180deg); opacity: 0.55; }
          90%  { opacity: 0.35; }
          100% { transform: translateY(108vh) translateX(var(--sway-end, -10px)) rotate(360deg); opacity: 0; }
        }
        @keyframes firefly-float {
          0%   { transform: translateY(100vh) translateX(0) scale(1); opacity: 0; }
          15%  { opacity: 0.8; }
          50%  { transform: translateY(40vh) translateX(var(--sway-mid, 30px)) scale(1.2); opacity: 0.6; }
          85%  { opacity: 0.4; }
          100% { transform: translateY(-20px) translateX(var(--sway-end, -20px)) scale(0.8); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => {
        const baseStyle = {
          left: `${p.left}%`,
          top: season === "summer" ? "110vh" : "-30px",
          animationName: animName,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          animationTimingFunction: timingFn,
          animationIterationCount: "infinite",
          "--sway-mid": `${p.swayMid}px`,
          "--sway-end": `${p.swayEnd}px`,
        } as React.CSSProperties;

        if (season === "fall") {
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                ...baseStyle,
                transform: `rotate(${p.initialRotate}deg)`,
              }}
            >
              <Leaf
                size={p.size}
                style={{
                  color: FALL_ICON_COLORS[p.colorStop],
                  display: "block",
                }}
                strokeWidth={1.5}
              />
            </div>
          );
        }

        if (season === "winter") {
          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                ...baseStyle,
                transform: `rotate(${p.initialRotate}deg)`,
              }}
            >
              <Snowflake
                size={p.size}
                style={{
                  color: WINTER_ICON_COLORS[p.colorStop],
                  display: "block",
                }}
                strokeWidth={1.5}
              />
            </div>
          );
        }

        // spring / summer — 기존 gradient div
        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              ...baseStyle,
              width: `${p.size}px`,
              height: `${p.size * (season === "summer" ? 1 : 0.8)}px`,
              background: colors[p.colorStop],
              borderRadius:
                season === "spring"
                  ? "60% 40% 55% 45% / 55% 60% 40% 45%"
                  : "50%",
              transform: `rotate(${p.initialRotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
