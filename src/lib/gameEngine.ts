import { GameState, Scenario, Choice, ScoreResult } from '@/types/game';
import { EMERGENCY_THRESHOLD, EMERGENCY_RECOVER_TO, EMERGENCY_PENALTY, GRADES } from './constants';

export function applyChoice(stats: GameState['stats'], choice: Choice): GameState['stats'] {
  return {
    satisfaction: clamp(stats.satisfaction + choice.effects.satisfaction, 0, 100),
    budget: clamp(stats.budget + choice.effects.budget, 0, 100),
    career: clamp(stats.career + choice.effects.career, 0, 100),
    academic: clamp(stats.academic + choice.effects.academic, 0, 100),
  };
}

export function checkGameOver(stats: GameState['stats']): string | null {
  if (stats.satisfaction <= 0) return '학생들의 불만이 폭발했습니다! 탄핵 투표가 통과되었습니다.';
  if (stats.budget <= 0) return '학생회 예산이 바닥났습니다! 운영이 불가능합니다.';
  if (stats.career <= 0) return '진로 지원이 무너졌습니다! 취업률이 급락하며 학생들이 학교를 외면하기 시작했습니다.';
  if (stats.academic <= 0) return '학업 분위기가 완전히 무너졌습니다! 교수회의에서 퇴진 요구가 나왔습니다.';
  return null;
}

export function canUseEmergency(stats: GameState['stats'], emergencyUsed: number, emergencyMax: number): boolean {
  if (emergencyUsed >= emergencyMax) return false;
  const values = Object.values(stats);
  return values.some((v) => v < EMERGENCY_THRESHOLD);
}

export function applyEmergency(stats: GameState['stats']): GameState['stats'] {
  return {
    satisfaction: stats.satisfaction < EMERGENCY_THRESHOLD ? EMERGENCY_RECOVER_TO : stats.satisfaction,
    budget: stats.budget < EMERGENCY_THRESHOLD ? EMERGENCY_RECOVER_TO : stats.budget,
    career: stats.career < EMERGENCY_THRESHOLD ? EMERGENCY_RECOVER_TO : stats.career,
    academic: stats.academic < EMERGENCY_THRESHOLD ? EMERGENCY_RECOVER_TO : stats.academic,
  };
}

export function getScenarioForWeek(scenarios: Scenario[], week: number): Scenario | null {
  // 각 주차에 정확히 매핑되는 시나리오 반환 (weekRange는 [n, n] 형식)
  return scenarios.find(s => s.weekRange[0] === week) || null;
}

export function calculateScore(week: number, stats: GameState['stats'], emergencyUsed: number): ScoreResult {
  const survivalBonus = week * 100;
  const statSum = stats.satisfaction + stats.budget + stats.career + stats.academic;
  const statBonus = statSum * 5;
  const minStat = Math.min(stats.satisfaction, stats.budget, stats.career, stats.academic);
  const efficiencyBonus = Math.min(minStat * 10, 500);
  const emergencyPenalty = emergencyUsed * EMERGENCY_PENALTY;
  const totalScore = Math.max(0, survivalBonus + statBonus + efficiencyBonus - emergencyPenalty);

  const grade = GRADES.find((g) => totalScore >= g.min)?.label ?? '자퇴 권유';

  return { survivalBonus, statBonus, efficiencyBonus, emergencyPenalty, totalScore, grade };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
