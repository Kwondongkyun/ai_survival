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
      .then((data) => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const getRankStyle = (index: number) => {
    if (index === 0) return 'text-yellow-500';
    if (index === 1) return 'text-slate-400';
    if (index === 2) return 'text-amber-500';
    return 'text-ink/30';
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cherry-light to-background">
      <div className="px-4 py-8 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-ink">🏆 리더보드</h1>
          <button
            onClick={() => router.push('/')}
            className="text-sm text-cherry hover:text-cherry/70 transition-colors"
          >
            ← 홈으로
          </button>
        </div>

        {loading ? (
          <div className="text-center text-ink/40 py-20">불러오는 중...</div>
        ) : entries.length === 0 ? (
          <div className="text-center text-ink/40 py-20">
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
                className={`flex items-center gap-3 bg-white/70 backdrop-blur-sm border rounded-xl px-4 py-3 shadow-sm ${
                  i < 3 ? 'border-cherry/30' : 'border-petal'
                }`}
              >
                <span className={`text-lg font-bold w-8 text-center ${getRankStyle(i)}`}>
                  {getRankIcon(i)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-ink">{entry.nickname}</div>
                  <div className="text-xs text-ink/50">{entry.grade} | {entry.week}주</div>
                </div>
                <span className="text-lg font-bold text-cherry">{entry.score.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
