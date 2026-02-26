'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wallet, Briefcase, BookOpen, LucideIcon } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { STAT_CONFIG } from '@/lib/constants';

export interface StatFloat {
  id: number;
  stat: string;
  value: number;
}

const STAT_ICONS: Record<string, LucideIcon> = {
  satisfaction: Heart,
  budget: Wallet,
  career: Briefcase,
  academic: BookOpen,
};

interface StatPanelProps {
  stats: {
    satisfaction: number;
    budget: number;
    career: number;
    academic: number;
  };
  floats?: StatFloat[];
}

export default function StatPanel({ stats, floats = [] }: StatPanelProps) {
  const statValues = [stats.satisfaction, stats.budget, stats.career, stats.academic];

  return (
    <div className="grid grid-cols-2 gap-3">
      {STAT_CONFIG.map((config, i) => {
        const Icon = STAT_ICONS[config.id];
        const currentFloats = floats.filter((f) => f.stat === config.id);
        const isCritical = statValues[i] < 30;

        return (
          <motion.div
            key={config.id}
            className={`relative bg-white/70 backdrop-blur-sm border rounded-xl p-3 shadow-sm ${
              isCritical ? 'border-danger/50 animate-pulse' : 'border-petal'
            }`}
            layout
          >
            {/* 플로팅 숫자 */}
            <div className="absolute -top-1 right-2 pointer-events-none z-10">
              <AnimatePresence>
                {currentFloats.map((f) => (
                  <motion.span
                    key={f.id}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -32 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className={`block text-sm font-bold ${f.value > 0 ? 'text-success' : 'text-danger'}`}
                  >
                    {f.value > 0 ? `+${f.value}` : f.value}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Icon
                size={16}
                className={isCritical ? 'text-danger' : 'text-cherry/70'}
                strokeWidth={2}
              />
              <span className="text-xs text-ink/60">{config.name}</span>
              <span className={`ml-auto text-sm font-bold ${
                statValues[i] > 60 ? 'text-success' : statValues[i] > 30 ? 'text-warning' : 'text-danger'
              }`}>
                {statValues[i]}%
              </span>
            </div>
            <ProgressBar value={statValues[i]} max={100} color="auto" />
          </motion.div>
        );
      })}
    </div>
  );
}
