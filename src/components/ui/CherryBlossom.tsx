'use client';

import { useEffect, useState } from 'react';

interface Petal {
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

export default function CherryBlossom() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 105 - 2,
        size: Math.random() * 10 + 8,
        delay: Math.random() * 16,
        duration: Math.random() * 8 + 10,
        swayMid: (Math.random() - 0.5) * 100,
        swayEnd: (Math.random() - 0.5) * 80,
        initialRotate: Math.random() * 360,
        colorStop: Math.floor(Math.random() * 3),
      }))
    );
  }, []);

  const petalColors = [
    'radial-gradient(ellipse at 40% 35%, #FFE4EE 0%, #FFB3C8 45%, #FF8FA3 100%)',
    'radial-gradient(ellipse at 40% 35%, #FFC8D8 0%, #FF8FA3 50%, #FF6B8A 100%)',
    'radial-gradient(ellipse at 40% 35%, #FFD6E7 0%, #FFA0B8 50%, #FF7B95 100%)',
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            top: '-30px',
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            background: petalColors[petal.colorStop],
            borderRadius: '60% 40% 55% 45% / 55% 60% 40% 45%',
            transform: `rotate(${petal.initialRotate}deg)`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            '--sway-mid': `${petal.swayMid}px`,
            '--sway-end': `${petal.swayEnd}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
