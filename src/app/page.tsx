'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function LandingPage() {
  const router = useRouter();
  const { setNickname, startGame } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim().length < 2) return;
    setNickname(name.trim());
    startGame();
    router.push('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yonam-dark via-yonam-dark to-yonam-blue/30" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="text-7xl mb-6"
        >
          🏫
        </motion.div>

        <h1 className="text-4xl font-bold mb-2">
          <span className="text-lg-red">연암공대</span> 2026
        </h1>
        <p className="text-xl text-yonam-medium mb-2">학생회장 생존 시뮬레이션</p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-sm text-white/70 leading-relaxed">
          <p>당신은 연암공과대학교의 신임 총학생회장!</p>
          <p>52주 동안 매주 발생하는 위기 상황에서 현명한 선택을 내려</p>
          <p><strong className="text-white">4가지 지표</strong>를 관리하며 생존하세요.</p>
          <p className="text-danger mt-2">어느 지표라도 0%가 되면 탄핵!</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
          {[
            { icon: '😊', name: '학생 만족도' },
            { icon: '💰', name: '학교 예산' },
            { icon: '🏢', name: 'LG 관계' },
            { icon: '📚', name: '학업 분위기' },
          ].map((stat) => (
            <div key={stat.name} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-white/80">{stat.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={() => setShowModal(true)}>
            게임 시작
          </Button>
          <Button variant="ghost" size="md" className="w-full" onClick={() => router.push('/leaderboard')}>
            리더보드
          </Button>
        </div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-center">닉네임을 입력하세요</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          placeholder="2~10자 닉네임"
          maxLength={10}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-lg-red transition-colors mb-4"
          autoFocus
        />
        <Button
          size="lg"
          className="w-full"
          onClick={handleStart}
          disabled={name.trim().length < 2}
        >
          시작하기
        </Button>
      </Modal>
    </div>
  );
}
