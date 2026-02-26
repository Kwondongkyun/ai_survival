'use client';

import { motion } from 'framer-motion';
import { Siren } from 'lucide-react';

interface EmergencyButtonProps {
  remainingCount: number;
  canUse: boolean;
  onUse: () => void;
}

export default function EmergencyButton({ remainingCount, canUse, onUse }: EmergencyButtonProps) {
  return (
    <motion.button
      whileHover={canUse ? { scale: 1.05 } : undefined}
      whileTap={canUse ? { scale: 0.95 } : undefined}
      onClick={canUse ? onUse : undefined}
      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
        canUse
          ? 'bg-warning/10 border-warning/40 text-warning hover:bg-warning/20'
          : 'bg-ink/5 border-ink/10 text-ink/30 cursor-not-allowed'
      }`}
      disabled={!canUse}
    >
      <Siren size={16} strokeWidth={2} />
      <span>비상 구제권 ({remainingCount}회 남음)</span>
      {canUse && <span className="text-xs text-warning/70">(-300점)</span>}
    </motion.button>
  );
}
