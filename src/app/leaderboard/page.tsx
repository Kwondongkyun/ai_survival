'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { LeaderboardEntry } from '@/types/game';

export default function LeaderboardPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then(setEntries)
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const getRankStyle = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-gray-300';
    if (index === 2) return 'text-amber-600';
    return 'text-white/40';
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-yonam-dark px-4 py-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">🏆 리더보드</h1>
        <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
          홈으로
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-white/40 py-20">불러오는 중...</div>
      ) : entries.length === 0 ? (
        <div className="text-center text-white/40 py-20">
          <p className="text-4xl mb-4">📭</p>
          <p>아직 기록이 없습니다</p>
          <p className="text-sm mt-2">첫 번째 학생회장이 되어보세요!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {entries.map((entry, i) => (
            <motion.div
              key={`${entry.nickname}-${entry.date}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 ${
                i < 3 ? 'border-yellow-400/20' : ''
              }`}
            >
              <span className={`text-lg font-bold w-8 text-center ${getRankStyle(i)}`}>
                {getRankIcon(i)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{entry.nickname}</div>
                <div className="text-xs text-white/40">{entry.grade} | {entry.week}주</div>
              </div>
              <span className="text-lg font-bold text-lg-red">{entry.score.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
