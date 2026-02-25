'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { canUseEmergency } from '@/lib/gameEngine';
import { EMERGENCY_MAX } from '@/lib/constants';
import StatPanel from '@/components/game/StatPanel';
import WeekCounter from '@/components/game/WeekCounter';
import EventCard from '@/components/game/EventCard';
import ChoiceButton from '@/components/game/ChoiceButton';
import EmergencyButton from '@/components/game/EmergencyButton';
import GameOverOverlay from '@/components/game/GameOverOverlay';
import VictoryOverlay from '@/components/game/VictoryOverlay';

export default function GamePage() {
  const router = useRouter();
  const store = useGameStore();
  const {
    phase, week, stats, currentScenario, emergencyCount, emergencyUsed,
    gameOverReason, makeChoice, useEmergency, nextWeek, getScore, nickname,
    lowestStatEver, firstTenWeeksClean,
  } = store;

  useEffect(() => {
    if (!nickname) {
      router.replace('/');
    }
  }, [nickname, router]);

  useEffect(() => {
    if (phase === 'playing' && !currentScenario) {
      nextWeek();
    }
  }, [phase, currentScenario, nextWeek]);

  const handleChoice = (choice: Parameters<typeof makeChoice>[0]) => {
    makeChoice(choice);
    const updatedStore = useGameStore.getState();
    if (updatedStore.phase === 'playing') {
      nextWeek();
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-cherry-light to-background">
    <div className="px-4 py-6 max-w-lg mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink/60">{nickname} 학생회장</span>
        <span className="text-sm font-bold text-cherry">{score.totalScore.toLocaleString()}점</span>
      </div>

      <WeekCounter week={week} />
      <StatPanel stats={stats} />

      {phase === 'playing' && currentScenario && (
        <div className="flex flex-col gap-3 mt-2">
          <AnimatePresence mode="wait">
            <EventCard key={currentScenario.id} scenario={currentScenario} />
          </AnimatePresence>

          <div className="flex flex-col gap-2">
            {currentScenario.choices.map((choice, i) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                index={i}
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
    </div>
  );
}
