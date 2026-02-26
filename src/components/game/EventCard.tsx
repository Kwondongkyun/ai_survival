'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Scenario } from '@/types/game';

interface EventCardProps {
  scenario: Scenario;
  onTypingDone?: () => void;
}

const TYPING_SPEED = 22;

export default function EventCard({ scenario, onTypingDone }: EventCardProps) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayText(scenario.description.slice(0, i));
      if (i >= scenario.description.length) {
        clearInterval(timer);
        onTypingDone?.();
      }
    }, TYPING_SPEED);
    return () => clearInterval(timer);
  }, [scenario.id]);

  const isDone = displayText.length >= scenario.description.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white/80 backdrop-blur-sm border border-petal rounded-2xl p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap size={18} className="text-cherry" strokeWidth={2.5} />
        <h2 className="text-lg font-bold text-ink">{scenario.title}</h2>
      </div>
      <p className="text-sm text-ink/70 leading-relaxed min-h-[3.5rem]">
        {displayText}
        {!isDone && (
          <span className="inline-block w-0.5 h-3.5 bg-ink/50 animate-pulse ml-0.5 align-middle" />
        )}
      </p>
    </motion.div>
  );
}
