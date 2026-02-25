'use client';

import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import { STAT_CONFIG } from '@/lib/constants';

interface StatPanelProps {
  stats: {
    satisfaction: number;
    budget: number;
    career: number;
    academic: number;
  };
}

export default function StatPanel({ stats }: StatPanelProps) {
  const statValues = [stats.satisfaction, stats.budget, stats.career, stats.academic];

  return (
    <div className="grid grid-cols-2 gap-3">
      {STAT_CONFIG.map((config, i) => (
        <motion.div
          key={config.id}
          className={`bg-white/70 backdrop-blur-sm border rounded-xl p-3 shadow-sm ${
            statValues[i] < 30 ? 'border-danger/50 animate-pulse' : 'border-petal'
          }`}
          layout
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{config.icon}</span>
            <span className="text-xs text-ink/60">{config.name}</span>
            <span className={`ml-auto text-sm font-bold ${
              statValues[i] > 60 ? 'text-success' : statValues[i] > 30 ? 'text-warning' : 'text-danger'
            }`}>
              {statValues[i]}%
            </span>
          </div>
          <ProgressBar value={statValues[i]} max={100} color="auto" />
        </motion.div>
      ))}
    </div>
  );
}
