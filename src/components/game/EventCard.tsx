'use client';

import { motion } from 'framer-motion';
import { Scenario } from '@/types/game';

interface EventCardProps {
  scenario: Scenario;
}

export default function EventCard({ scenario }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">⚡</span>
        <h2 className="text-lg font-bold">{scenario.title}</h2>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{scenario.description}</p>
    </motion.div>
  );
}
