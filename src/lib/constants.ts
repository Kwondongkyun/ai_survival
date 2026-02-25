export const MAX_WEEKS = 30;
export const INITIAL_STAT_VALUE = 60;
export const EMERGENCY_MAX = 3;
export const EMERGENCY_THRESHOLD = 30;
export const EMERGENCY_RECOVER_TO = 35;
export const EMERGENCY_PENALTY = 300;

export const STAT_CONFIG = [
  { id: 'satisfaction' as const, name: '학생 만족도', icon: '😊' },
  { id: 'budget' as const, name: '학교 예산', icon: '💰' },
  { id: 'career' as const, name: '취업·진로 지원도', icon: '💼' },
  { id: 'academic' as const, name: '학업 분위기', icon: '📚' },
];

export const GRADES = [
  { min: 5000, label: '전설의 학생회장' },
  { min: 3500, label: '명예 졸업' },
  { min: 2500, label: '무난한 임기' },
  { min: 1500, label: '겨우 생존' },
  { min: 700, label: '탄핵 위기' },
  { min: 0, label: '자퇴 권유' },
];
