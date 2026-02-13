'use client';

import { motion } from 'framer-motion';
import { MAX_WEEKS } from '@/lib/constants';
import ProgressBar from '@/components/ui/ProgressBar';

interface WeekCounterProps {
  week: number;
}

export default function WeekCounter({ week }: WeekCounterProps) {
  const season = week <= 13 ? '봄' : week <= 26 ? '여름' : week <= 39 ? '가을' : '겨울';
  const seasonIcon = week <= 13 ? '🌸' : week <= 26 ? '☀️' : week <= 39 ? '🍂' : '❄️';

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span>{seasonIcon}</span>
          <span className="text-sm text-white/60">{season}학기</span>
        </div>
        <motion.span
          key={week}
          initial={{ scale: 1.3, color: '#A50034' }}
          animate={{ scale: 1, color: '#FFFFFF' }}
          className="text-lg font-bold"
        >
          {week}주차
        </motion.span>
        <span className="text-sm text-white/40">/ {MAX_WEEKS}주</span>
      </div>
      <ProgressBar value={week} max={MAX_WEEKS} color="bg-yonam-blue" />
    </div>
  );
}
