'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ScoreResult, GameState } from '@/types/game';
import Button from '@/components/ui/Button';
import { checkAchievements, calcAchievementBonus, AchievementDef } from '@/lib/achievements';

interface VictoryOverlayProps {
  score: ScoreResult;
  stats: GameState['stats'];
  emergencyUsed: number;
  lowestStatEver: number;
  firstTenWeeksClean: boolean;
  onViewResult: (finalScore?: number) => void;
}

function getEnding(stats: GameState['stats']): { icon: string; title: string; subtitle: string } | null {
  const { satisfaction, budget, career, academic } = stats;
  if (satisfaction >= 75 && budget >= 75 && career >= 75 && academic >= 75)
    return { icon: '🏆', title: '완벽한 균형의 리더', subtitle: '4가지 모든 영역에서 탁월한 리더십을 발휘했습니다' };

  const max = Math.max(satisfaction, budget, career, academic);
  if (satisfaction === max && satisfaction >= 80)
    return { icon: '💝', title: '학생들의 영웅', subtitle: '학생 만족도를 최고로 이끌며 모두의 사랑을 받았습니다' };
  if (budget === max && budget >= 80)
    return { icon: '💰', title: '재정 천재 학생회장', subtitle: '학생회 예산을 탄탄하게 관리했습니다' };
  if (career === max && career >= 80)
    return { icon: '💼', title: '취업률 신기록 달성자', subtitle: '취업·진로 지원을 최고 수준으로 끌어올렸습니다' };
  if (academic === max && academic >= 80)
    return { icon: '📚', title: '학업 분위기 수호자', subtitle: '학업 분위기를 최상으로 유지했습니다' };

  return null;
}

export default function VictoryOverlay({
  score, stats, emergencyUsed, lowestStatEver, firstTenWeeksClean, onViewResult,
}: VictoryOverlayProps) {
  const achievements: AchievementDef[] = useMemo(
    () => checkAchievements({ stats, emergencyUsed, lowestStatEver, firstTenWeeksClean }, score),
    [],
  );
  const achievementBonus = calcAchievementBonus(achievements);
  const finalScore = score.totalScore + achievementBonus;
  const ending = getEnding(stats);

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
        className="bg-white border border-success/30 rounded-2xl p-6 max-w-md w-full text-center shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* 엔딩 */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl mb-3"
        >
          {ending ? ending.icon : '🎓'}
        </motion.div>
        <h2 className="text-xl font-bold text-success mb-1">
          {ending ? ending.title : '임기 완료!'}
        </h2>
        <p className="text-sm text-ink/60 mb-4">
          {ending ? ending.subtitle : '30주를 무사히 마쳤습니다!'}
        </p>

        {/* 점수 내역 */}
        <div className="bg-cherry-light/40 border border-petal rounded-xl p-4 mb-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-ink/60">생존 보너스</span><span className="text-ink">{score.survivalBonus.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-ink/60">스탯 보너스</span><span className="text-ink">{score.statBonus.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-ink/60">효율 보너스</span><span className="text-ink">{score.efficiencyBonus.toLocaleString()}</span></div>
          {score.emergencyPenalty > 0 && (
            <div className="flex justify-between text-danger"><span>구제권 패널티</span><span>-{score.emergencyPenalty.toLocaleString()}</span></div>
          )}
          {achievementBonus > 0 && (
            <div className="flex justify-between text-success font-medium">
              <span>업적 보너스</span>
              <span>+{achievementBonus.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-petal pt-2 flex justify-between font-bold text-lg">
            <span className="text-ink">총점</span>
            <span className="text-cherry">{finalScore.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-base font-bold text-ink/70 mb-4">{score.grade}</p>

        {/* 업적 목록 */}
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-4 text-left"
          >
            <p className="text-xs font-bold text-cherry mb-2 text-center">획득한 업적</p>
            <div className="flex flex-col gap-2">
              {achievements.map((a) => (
                <div key={a.id} className="flex items-center gap-2 bg-cherry-light/30 border border-petal rounded-lg px-3 py-2">
                  <span className="text-xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink">{a.title}</p>
                    <p className="text-xs text-ink/60">{a.description}</p>
                  </div>
                  <span className="text-xs font-bold text-success shrink-0">+{a.bonus}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <Button size="lg" className="w-full rounded-full" onClick={() => onViewResult(finalScore)}>
          결과 등록
        </Button>
      </motion.div>
    </motion.div>
  );
}
