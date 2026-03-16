'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wallet, Briefcase, BookOpen, Trophy, School, LucideIcon } from 'lucide-react';
import { useGameStore } from '@/stores/gameStore';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SeasonEffect from '@/components/ui/SeasonEffect';
import { LeaderboardEntry } from '@/types/game';

const INTRO_LINES = [
  '2026년 3월.',
  '당신은 연암공대 총학생회장으로 선출됐습니다.',
  '30주간의 임기 동안 4가지 지표를 지켜야 합니다.',
  '어느 하나라도 무너지면 — 탄핵.',
];

const STAT_INFO: { Icon: LucideIcon; iconClass: string; name: string; desc: string }[] = [
  { Icon: Heart,     iconClass: 'text-pink-400',   name: '학생 만족도', desc: '학생들의 신뢰와 지지율. 0이 되면 탄핵.' },
  { Icon: Wallet,    iconClass: 'text-green-400',  name: '학교 예산',   desc: '학생회 운영 자금. 바닥나면 활동 불가.' },
  { Icon: Briefcase, iconClass: 'text-blue-400',   name: '취업·진로',   desc: '진로 지원도. 낮아지면 학생들이 학교를 외면.' },
  { Icon: BookOpen,  iconClass: 'text-purple-400', name: '학업 분위기', desc: '학습 환경. 무너지면 교수회의에서 퇴진 요구.' },
];

const RANK_ICONS = ['🥇', '🥈', '🥉'];

function useTypewriterLines(lines: string[], speed = 40, active = true) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (!active) return;
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentText.length < line.length) {
      const timer = setTimeout(() => setCurrentText(line.slice(0, currentText.length + 1)), speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentText('');
        setCurrentLine((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentText, lines, speed, active]);

  const done = currentLine >= lines.length;
  return { displayedLines, currentText, currentLine, done };
}

export default function LandingPage() {
  const router = useRouter();
  const { setNickname, startGame } = useGameStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [topEntries, setTopEntries] = useState<LeaderboardEntry[]>([]);

  const { displayedLines, currentText, currentLine, done } = useTypewriterLines(INTRO_LINES, 40, step === 2);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setTopEntries(data.slice(0, 5)); })
      .catch(() => {});
  }, []);

  const handleStart = () => {
    if (name.trim().length < 2) return;
    setNickname(name.trim());
    startGame();
    router.push('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cherry-light via-background to-white/80" />
      <SeasonEffect season="spring" />

      {/* 데스크탑 플로팅 TOP5 - step 3에서만 */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-8 right-8 z-20 hidden lg:block"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-petal rounded-2xl p-4 w-48 shadow-lg shadow-cherry/10">
              <p className="text-xs font-bold text-ink/80 mb-3 flex items-center gap-1">
                <Trophy size={13} className="text-yellow-500" strokeWidth={2} /> <span>TOP 5</span>
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
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-8">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: 타이틀 ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <School size={56} className="text-cherry" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-bold">
                  <span className="text-cherry">연암공대</span>{' '}
                  <span className="text-ink">2026</span>
                </h1>
                <p className="text-sm text-ink/40 mt-2">학생회장 임기 시뮬레이션</p>
              </div>

              <Button
                size="lg"
                className="w-full rounded-full shadow-lg shadow-cherry/30"
                onClick={() => setStep(2)}
              >
                게임 시작
              </Button>

              <p className="text-[10px] text-ink/25 text-center">
                본 게임의 시나리오는 생성형 AI(Claude Opus 4.6)를 활용하여 제작되었습니다
              </p>
            </motion.div>
          )}

          {/* ── STEP 2: 인트로 타이프라이터 ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-6"
            >
              <div className="min-h-[160px] flex flex-col justify-center px-2">
                <div className="space-y-3 font-mono text-lg leading-relaxed">
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

              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Button
                      size="lg"
                      className="w-full rounded-full shadow-lg shadow-cherry/30"
                      onClick={() => setStep(3)}
                    >
                      다음 →
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── STEP 3: 스탯 설명 + 시작 + TOP5 ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5"
            >
              {/* 타이틀 */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <School size={36} className="text-cherry" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="text-cherry">연암공대</span>{' '}
                  <span className="text-ink">2026</span>
                </h1>
                <p className="text-xs text-ink/40 mt-1">학생회장 임기 시뮬레이션</p>
              </motion.div>

              {/* 스탯 리스트 */}
              <div className="flex flex-col gap-2">
                {STAT_INFO.map((stat, i) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm border border-petal rounded-2xl px-4 py-3 shadow-sm flex items-center gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-petal flex items-center justify-center shadow-sm">
                      <stat.Icon size={20} className={stat.iconClass} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-ink">{stat.name}</span>
                        <span className="text-xs font-semibold text-ink/40">시작 60%</span>
                      </div>
                      <div className="w-full h-1.5 bg-petal/60 rounded-full overflow-hidden mb-1">
                        <motion.div
                          className="h-full bg-cherry/50 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="text-xs text-ink/50">{stat.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 임기 시작 버튼 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <Button
                  size="lg"
                  className="w-full rounded-full shadow-lg shadow-cherry/30"
                  onClick={() => setShowModal(true)}
                >
                  임기 시작
                </Button>
              </motion.div>

              {/* TOP5 랭킹 - 모바일 전용 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="lg:hidden bg-white/70 backdrop-blur-sm border border-petal rounded-2xl p-4 shadow-sm"
              >
                <p className="text-xs font-bold text-ink/80 mb-3 flex items-center gap-1">
                  <Trophy size={13} className="text-yellow-500" strokeWidth={2} /> <span>TOP 5</span>
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
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 닉네임 모달 */}
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
