'use client';

import { motion } from 'framer-motion';
import { Skull } from 'lucide-react';
import { ScoreResult } from '@/types/game';
import Button from '@/components/ui/Button';

interface GameOverOverlayProps {
  reason: string;
  week: number;
  score: ScoreResult;
  onViewResult: () => void;
}

export default function GameOverOverlay({ reason, week, score, onViewResult }: GameOverOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="bg-white border border-danger/30 rounded-2xl p-6 max-w-md w-full text-center shadow-xl"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
            <Skull size={32} className="text-danger" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-danger mb-2">탄핵!</h2>
        <p className="text-sm text-ink/60 mb-4">{week}주차에 게임이 종료되었습니다</p>
        <p className="text-sm text-ink/80 bg-danger/8 rounded-lg p-3 mb-6">{reason}</p>

        <div className="text-3xl font-bold text-cherry mb-2">{score.totalScore.toLocaleString()}점</div>
        <p className="text-lg text-ink/60 mb-6">{score.grade}</p>

        <Button size="lg" className="w-full rounded-full" onClick={onViewResult}>
          결과 확인
        </Button>
      </motion.div>
    </motion.div>
  );
}
