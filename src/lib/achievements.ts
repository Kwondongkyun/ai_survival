import { GameState, ScoreResult } from '@/types/game';

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  bonus: number;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDef[] = [
  { id: 'no_emergency',   title: '민생 파수꾼',       description: '구제권을 한 번도 사용하지 않고 클리어',      icon: '🛡️', bonus: 300 },
  { id: 'all_emergency',  title: '위기 대처 능력자',   description: '구제권 3회를 모두 소진하며 클리어',          icon: '⚡', bonus: 150 },
  { id: 'legend',         title: '전설 달성',           description: '전설의 학생회장 등급 획득',                  icon: '🌟', bonus: 500 },
  { id: 'comeback',       title: '사면초가 극복',       description: '스탯이 30 이하까지 떨어졌지만 끝내 클리어', icon: '⚖️', bonus: 400 },
  { id: 'perfect_stats',  title: '완벽주의자',          description: '4개 스탯 모두 75 이상으로 클리어',           icon: '💯', bonus: 600 },
  { id: 'early_clean',    title: '초반 탄탄',           description: '10주차까지 모든 스탯 50 이상 유지',          icon: '🔥', bonus: 200 },
  { id: 'budget_master',  title: '알뜰 살뜰',           description: '예산 80 이상으로 클리어',                    icon: '💸', bonus: 250 },
  { id: 'popularity',     title: '인기 절정',           description: '만족도 85 이상으로 클리어',                  icon: '😍', bonus: 250 },
];

export function checkAchievements(
  state: Pick<GameState, 'stats' | 'emergencyUsed' | 'lowestStatEver' | 'firstTenWeeksClean'>,
  score: ScoreResult,
): AchievementDef[] {
  const { stats, emergencyUsed, lowestStatEver, firstTenWeeksClean } = state;
  const earned: AchievementDef[] = [];

  if (emergencyUsed === 0) earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'no_emergency')!);
  if (emergencyUsed >= 3) earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'all_emergency')!);
  if (score.grade === '전설의 학생회장') earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'legend')!);
  if (lowestStatEver <= 30) earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'comeback')!);
  if (stats.satisfaction >= 75 && stats.budget >= 75 && stats.career >= 75 && stats.academic >= 75)
    earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'perfect_stats')!);
  if (firstTenWeeksClean) earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'early_clean')!);
  if (stats.budget >= 80) earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'budget_master')!);
  if (stats.satisfaction >= 85) earned.push(ACHIEVEMENT_DEFINITIONS.find(a => a.id === 'popularity')!);

  return earned;
}

export function calcAchievementBonus(achievements: AchievementDef[]): number {
  return achievements.reduce((sum, a) => sum + a.bonus, 0);
}
