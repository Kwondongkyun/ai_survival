export interface StatType {
  id: 'satisfaction' | 'budget' | 'career' | 'academic';
  name: string;
  icon: string;
  value: number;
}

export interface Choice {
  id: string;
  text: string;
  effects: {
    satisfaction: number;
    budget: number;
    career: number;
    academic: number;
  };
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  weekRange: [number, number];
  choices: Choice[];
}

export interface GameState {
  nickname: string;
  week: number;
  stats: {
    satisfaction: number;
    budget: number;
    career: number;
    academic: number;
  };
  emergencyCount: number;
  emergencyUsed: number;
  phase: 'landing' | 'nickname' | 'playing' | 'gameOver' | 'victory' | 'result';
  currentScenario: Scenario | null;
  history: { week: number; scenarioId: number; choiceId: string }[];
  gameOverReason: string | null;
}

export interface ScoreResult {
  survivalBonus: number;
  statBonus: number;
  efficiencyBonus: number;
  emergencyPenalty: number;
  totalScore: number;
  grade: string;
}

export interface LeaderboardEntry {
  nickname: string;
  score: number;
  week: number;
  grade: string;
  date: string;
}
