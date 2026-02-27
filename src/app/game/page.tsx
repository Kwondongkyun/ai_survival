'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { canUseEmergency } from '@/lib/gameEngine';
import { EMERGENCY_MAX, STAT_CONFIG } from '@/lib/constants';
import StatPanel, { StatFloat } from '@/components/game/StatPanel';
import WeekCounter from '@/components/game/WeekCounter';
import SeasonEffect, { Season } from '@/components/ui/SeasonEffect';
import EventCard from '@/components/game/EventCard';
import ChoiceButton from '@/components/game/ChoiceButton';
import EmergencyButton from '@/components/game/EmergencyButton';
import GameOverOverlay from '@/components/game/GameOverOverlay';
import VictoryOverlay from '@/components/game/VictoryOverlay';

let floatId = 0;

export default function GamePage() {
  const router = useRouter();
  const store = useGameStore();
  const {
    phase, week, stats, currentScenario, emergencyCount, emergencyUsed,
    gameOverReason, makeChoice, useEmergency, nextWeek, getScore, nickname,
    lowestStatEver, firstTenWeeksClean,
  } = store;

  const [choicesVisible, setChoicesVisible] = useState(false);
  const [statFloats, setStatFloats] = useState<StatFloat[]>([]);
  const [scope, animate] = useAnimate();

  const minStat = Math.min(stats.satisfaction, stats.budget, stats.career, stats.academic);
  const isCrisis = minStat < 40;
  const isDanger = minStat < 20;

  const season: Season = week <= 8 ? 'spring' : week <= 16 ? 'summer' : week <= 24 ? 'fall' : 'winter';

  useEffect(() => {
    if (!nickname) router.replace('/');
  }, [nickname, router]);

  useEffect(() => {
    if (phase === 'playing' && !currentScenario) nextWeek();
  }, [phase, currentScenario, nextWeek]);

  // 시나리오 바뀌면 선택지 숨기기
  useEffect(() => {
    setChoicesVisible(false);
  }, [currentScenario?.id]);

  const triggerShake = useCallback(async () => {
    await animate(scope.current, { x: [-10, 10, -8, 8, -4, 4, 0] }, { duration: 0.45 });
  }, [animate, scope]);

  const spawnFloats = useCallback((prevStats: typeof stats, newStats: typeof stats) => {
    const newFloats: StatFloat[] = [];
    for (const config of STAT_CONFIG) {
      const diff = newStats[config.id] - prevStats[config.id];
      if (diff !== 0) {
        newFloats.push({ id: ++floatId, stat: config.id, value: diff });
      }
    }
    if (newFloats.length === 0) return;
    setStatFloats((prev) => [...prev, ...newFloats]);
    setTimeout(() => {
      setStatFloats((prev) => prev.filter((f) => !newFloats.find((nf) => nf.id === f.id)));
    }, 1400);
  }, []);

  const handleChoice = useCallback((choice: Parameters<typeof makeChoice>[0]) => {
    const prevStats = { ...store.stats };
    makeChoice(choice);
    const newStats = useGameStore.getState().stats;

    spawnFloats(prevStats, newStats);

    const worstEffect = Math.min(...Object.values(choice.effects));
    if (worstEffect <= -10) triggerShake();

    const updatedStore = useGameStore.getState();
    if (updatedStore.phase === 'playing') nextWeek();
  }, [makeChoice, nextWeek, spawnFloats, triggerShake, store.stats]);

  const handleViewResult = async (finalScore?: number) => {
    const score = getScore();
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          score: finalScore ?? score.totalScore,
          week,
          grade: score.grade,
        }),
      });
    } catch {
      // silent fail
    }
    router.push('/leaderboard');
  };

  if (!nickname) return null;

  const emergencyAvailable = canUseEmergency(stats, emergencyUsed, EMERGENCY_MAX);
  const score = getScore();

  const bgClass = isDanger
    ? 'bg-gradient-to-b from-red-200 to-[#FFF8F0]'
    : isCrisis
    ? 'bg-gradient-to-b from-red-100 to-[#FFF8F0]'
    : season === 'spring'
    ? 'bg-gradient-to-b from-pink-50 to-[#FFF8F0]'
    : season === 'summer'
    ? 'bg-gradient-to-b from-emerald-50 to-[#FFF8F0]'
    : season === 'fall'
    ? 'bg-gradient-to-b from-orange-50 to-[#FFF8F0]'
    : 'bg-gradient-to-b from-blue-50 to-[#FFF8F0]';

  return (
    <motion.div className={`min-h-screen transition-colors duration-700 ${bgClass}`}>
      {!isCrisis && <SeasonEffect season={season} />}
      {/* 위기 맥박 오버레이 */}
      {isCrisis && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          animate={{ opacity: [0, isDanger ? 0.18 : 0.10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(ellipse at center, #ef4444 0%, transparent 70%)' }}
        />
      )}

      <div ref={scope} className="px-4 py-6 max-w-lg mx-auto flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink/60">{nickname} 학생회장</span>
          <span className="text-sm font-bold text-cherry">{score.totalScore.toLocaleString()}점</span>
        </div>

        <WeekCounter week={week} />
        <StatPanel stats={stats} floats={statFloats} />

        {phase === 'playing' && currentScenario && (
          <div className="flex flex-col gap-3 mt-2">
            <AnimatePresence mode="wait">
              <EventCard
                key={currentScenario.id}
                scenario={currentScenario}
                onTypingDone={() => setChoicesVisible(true)}
              />
            </AnimatePresence>

            <div className="flex flex-col gap-2">
              {currentScenario.choices.map((choice, i) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  index={i}
                  visible={choicesVisible}
                  onSelect={handleChoice}
                />
              ))}
            </div>

            <EmergencyButton
              remainingCount={emergencyCount}
              canUse={emergencyAvailable}
              onUse={useEmergency}
            />
          </div>
        )}

        {phase === 'gameOver' && gameOverReason && (
          <GameOverOverlay
            reason={gameOverReason}
            week={week}
            score={score}
            onViewResult={handleViewResult}
          />
        )}

        {phase === 'victory' && (
          <VictoryOverlay
            score={score}
            stats={stats}
            emergencyUsed={emergencyUsed}
            lowestStatEver={lowestStatEver}
            firstTenWeeksClean={firstTenWeeksClean}
            onViewResult={handleViewResult}
          />
        )}
      </div>
    </motion.div>
  );
}
