'use client';

import { motion } from 'framer-motion';
import { ScoreResult } from '@/types/game';
import Button from '@/components/ui/Button';

interface VictoryOverlayProps {
  score: ScoreResult;
  onViewResult: () => void;
}

export default function VictoryOverlay({ score, onViewResult }: VictoryOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="bg-yonam-dark border border-success/30 rounded-2xl p-6 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl mb-4"
        >
          🎓
        </motion.div>
        <h2 className="text-2xl font-bold text-success mb-2">임기 완료!</h2>
        <p className="text-sm text-white/60 mb-6">52주를 무사히 마쳤습니다!</p>

        <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-white/60">생존 보너스</span><span>+{score.survivalBonus.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-white/60">스탯 보너스</span><span>+{score.statBonus.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-white/60">효율 보너스</span><span>+{score.efficiencyBonus.toLocaleString()}</span></div>
          {score.emergencyPenalty > 0 && (
            <div className="flex justify-between text-danger"><span>구제권 패널티</span><span>-{score.emergencyPenalty.toLocaleString()}</span></div>
          )}
          <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg">
            <span>총점</span>
            <span className="text-lg-red">{score.totalScore.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-xl font-bold text-yonam-medium mb-6">{score.grade}</p>

        <Button size="lg" className="w-full" onClick={onViewResult}>
          결과 등록
        </Button>
      </motion.div>
    </motion.div>
  );
}
