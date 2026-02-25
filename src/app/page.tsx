'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import CherryBlossom from '@/components/ui/CherryBlossom';
import { LeaderboardEntry } from '@/types/game';

const INTRO_LINES = [
  '2026년 3월.',
  '당신은 연암공대 총학생회장으로 선출됐습니다.',
  '30주간의 임기 동안 4가지 지표를 지켜야 합니다.',
  '어느 하나라도 무너지면 — 탄핵.',
];

const RANK_ICONS = ['🥇', '🥈', '🥉'];

function useTypewriterLines(lines: string[], speed = 40) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];
    if (currentText.length < line.length) {
      const timer = setTimeout(() => {
        setCurrentText(line.slice(0, currentText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentText('');
        setCurrentLine((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentText, lines, speed]);

  return { displayedLines, currentText, currentLine, done };
}

export default function LandingPage() {
  const router = useRouter();
  const { setNickname, startGame } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [topEntries, setTopEntries] = useState<LeaderboardEntry[]>([]);
  const { displayedLines, currentText, currentLine, done } = useTypewriterLines(INTRO_LINES);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTopEntries(data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const handleStart = () => {
    if (name.trim().length < 2) return;
    setNickname(name.trim());
    startGame();
    router.push('/game');
  };

  const LeaderboardCard = () => (
    <div className="bg-white/80 backdrop-blur-sm border border-petal rounded-2xl p-4 w-48 shadow-lg shadow-cherry/10">
      <p className="text-xs font-bold text-ink/80 mb-3 flex items-center gap-1">
        🏆 <span>TOP 5</span>
      </p>
      {topEntries.length === 0 ? (
        <p className="text-ink/30 text-xs">아직 기록이 없습니다</p>
      ) : (
        <div className="space-y-2">
          {topEntries.map((entry, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm w-4 shrink-0">
                {i < 3 ? RANK_ICONS[i] : <span className="text-ink/40 text-xs">{i + 1}</span>}
              </span>
              <span className="text-ink/70 text-xs truncate flex-1">{entry.nickname}</span>
              <span className="text-cherry text-xs shrink-0 font-semibold">{entry.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => router.push('/leaderboard')}
        className="mt-3 w-full text-xs text-cherry/60 hover:text-cherry transition-colors text-center"
      >
        전체 랭킹 보기 →
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cherry-light via-background to-white/80" />
      <CherryBlossom />

      {/* 데스크탑 플로팅 랭킹 카드 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: done ? 1 : 0, x: done ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="absolute top-8 right-8 z-20 hidden lg:block"
      >
        <LeaderboardCard />
      </motion.div>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-5xl mb-3">🏫</div>
          <h1 className="text-3xl font-bold">
            <span className="text-cherry">연암공대</span>{' '}
            <span className="text-ink">2026</span>
          </h1>
          <p className="text-sm text-ink/40 mt-1">학생회장 임기 시뮬레이션</p>
        </motion.div>

        {/* Typewriter */}
        <div className="bg-white/70 backdrop-blur-sm border border-petal rounded-2xl p-6 min-h-[148px] flex flex-col justify-center shadow-sm">
          <div className="space-y-2 font-mono text-sm leading-relaxed">
            {displayedLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={i === INTRO_LINES.length - 1 ? 'text-danger font-bold' : 'text-ink/80'}
              >
                {line}
              </motion.p>
            ))}
            {currentLine < INTRO_LINES.length && (
              <p className={currentLine === INTRO_LINES.length - 1 ? 'text-danger font-bold' : 'text-ink/80'}>
                {currentText}
                <span className="animate-pulse text-cherry">▋</span>
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-4 gap-2 text-center"
        >
          {[
            { icon: '😊', name: '학생 만족도' },
            { icon: '💰', name: '학교 예산' },
            { icon: '💼', name: '취업·진로' },
            { icon: '📚', name: '학업 분위기' },
          ].map((stat) => (
            <div
              key={stat.name}
              className="bg-white/70 border border-petal rounded-xl p-3 flex flex-col items-center gap-1 shadow-sm"
            >
              <span className="text-xl">{stat.icon}</span>
              <span className="text-ink/60 text-xs">{stat.name}</span>
            </div>
          ))}
        </motion.div>

        {/* 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <Button size="lg" className="w-full rounded-full shadow-lg shadow-cherry/30" onClick={() => setShowModal(true)}>
            임기 시작
          </Button>
        </motion.div>

        {/* 모바일 랭킹 카드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden w-full"
        >
          <div className="bg-white/70 backdrop-blur-sm border border-petal rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-ink/80 mb-3 flex items-center gap-1">
              🏆 <span>TOP 5</span>
            </p>
            {topEntries.length === 0 ? (
              <p className="text-ink/30 text-xs">아직 기록이 없습니다</p>
            ) : (
              <div className="space-y-2">
                {topEntries.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm w-4 shrink-0">
                      {i < 3 ? RANK_ICONS[i] : <span className="text-ink/40 text-xs">{i + 1}</span>}
                    </span>
                    <span className="text-ink/70 text-xs truncate flex-1">{entry.nickname}</span>
                    <span className="text-cherry text-xs shrink-0 font-semibold">{entry.score.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => router.push('/leaderboard')}
              className="mt-3 w-full text-xs text-cherry/60 hover:text-cherry transition-colors text-center"
            >
              전체 랭킹 보기 →
            </button>
          </div>
        </motion.div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-center text-ink">닉네임을 입력하세요</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          placeholder="2~10자 닉네임"
          maxLength={10}
          className="w-full bg-cherry-light/40 border border-petal rounded-lg px-4 py-3 text-ink placeholder-ink/30 outline-none focus:border-cherry transition-colors mb-4"
          autoFocus
        />
        <Button
          size="lg"
          className="w-full rounded-full"
          onClick={handleStart}
          disabled={name.trim().length < 2}
        >
          시작하기
        </Button>
      </Modal>
    </div>
  );
}
