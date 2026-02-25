import { create } from 'zustand';
import { GameState, Choice } from '@/types/game';
import { applyChoice, checkGameOver, applyEmergency, getScenarioForWeek, calculateScore } from '@/lib/gameEngine';
import { scenarios } from '@/lib/scenarios';
import { MAX_WEEKS, INITIAL_STAT_VALUE, EMERGENCY_MAX } from '@/lib/constants';

interface GameStore extends GameState {
  setNickname: (nickname: string) => void;
  setPhase: (phase: GameState['phase']) => void;
  startGame: () => void;
  makeChoice: (choice: Choice) => void;
  useEmergency: () => void;
  nextWeek: () => void;
  getScore: () => ReturnType<typeof calculateScore>;
  reset: () => void;
}

const initialState: GameState = {
  nickname: '',
  week: 0,
  stats: {
    satisfaction: INITIAL_STAT_VALUE,
    budget: INITIAL_STAT_VALUE,
    career: INITIAL_STAT_VALUE,
    academic: INITIAL_STAT_VALUE,
  },
  emergencyCount: EMERGENCY_MAX,
  emergencyUsed: 0,
  phase: 'landing',
  currentScenario: null,
  history: [],
  gameOverReason: null,
  lowestStatEver: INITIAL_STAT_VALUE,
  firstTenWeeksClean: true,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setNickname: (nickname) => set({ nickname }),
  setPhase: (phase) => set({ phase }),

  startGame: () => {
    const week = 1;
    const usedIds: number[] = [];
    const scenario = getScenarioForWeek(scenarios, week, usedIds);
    set({
      ...initialState,
      nickname: get().nickname,
      week,
      currentScenario: scenario,
      phase: 'playing',
    });
  },

  makeChoice: (choice) => {
    const state = get();
    const newStats = applyChoice(state.stats, choice);
    const gameOverReason = checkGameOver(newStats);

    const newHistory = [
      ...state.history,
      { week: state.week, scenarioId: state.currentScenario!.id, choiceId: choice.id },
    ];

    const minStat = Math.min(newStats.satisfaction, newStats.budget, newStats.career, newStats.academic);
    const lowestStatEver = Math.min(state.lowestStatEver, minStat);
    const firstTenWeeksClean = state.week <= 10
      ? state.firstTenWeeksClean && minStat >= 50
      : state.firstTenWeeksClean;

    if (gameOverReason) {
      set({
        stats: newStats,
        history: newHistory,
        gameOverReason,
        phase: 'gameOver',
        currentScenario: null,
        lowestStatEver,
        firstTenWeeksClean,
      });
    } else if (state.week >= MAX_WEEKS) {
      set({
        stats: newStats,
        history: newHistory,
        phase: 'victory',
        currentScenario: null,
        lowestStatEver,
        firstTenWeeksClean,
      });
    } else {
      set({
        stats: newStats,
        history: newHistory,
        lowestStatEver,
        firstTenWeeksClean,
      });
    }
  },

  useEmergency: () => {
    const state = get();
    const newStats = applyEmergency(state.stats);
    set({
      stats: newStats,
      emergencyCount: state.emergencyCount - 1,
      emergencyUsed: state.emergencyUsed + 1,
    });
  },

  nextWeek: () => {
    const state = get();
    const nextWeek = state.week + 1;

    if (nextWeek > MAX_WEEKS) {
      set({ phase: 'victory', currentScenario: null });
      return;
    }

    const usedIds = state.history.map((h) => h.scenarioId);
    const scenario = getScenarioForWeek(scenarios, nextWeek, usedIds);

    set({
      week: nextWeek,
      currentScenario: scenario,
    });
  },

  getScore: () => {
    const state = get();
    return calculateScore(state.week, state.stats, state.emergencyUsed);
  },

  reset: () => set({ ...initialState }),
}));
