'use client';

import { motion } from 'framer-motion';
import { Choice } from '@/types/game';

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onSelect: (choice: Choice) => void;
}

const statLabels: Record<string, { icon: string; name: string }> = {
  satisfaction: { icon: '😊', name: '만족도' },
  budget: { icon: '💰', name: '예산' },
  career: { icon: '💼', name: '진로' },
  academic: { icon: '📚', name: '학업' },
};

export default function ChoiceButton({ choice, index, onSelect }: ChoiceButtonProps) {
  const effects = Object.entries(choice.effects).filter(([, v]) => v !== 0);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(choice)}
      className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-lg-red/50 rounded-xl p-4 transition-all cursor-pointer"
    >
      <p className="text-sm font-medium mb-2">{choice.text}</p>
      <div className="flex flex-wrap gap-2">
        {effects.map(([key, value]) => {
          const stat = statLabels[key];
          const isPositive = value > 0;
          return (
            <span
              key={key}
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                isPositive ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
              }`}
            >
              {stat.icon} {stat.name} {isPositive ? '+' : ''}{value}
            </span>
          );
        })}
      </div>
    </motion.button>
  );
}
