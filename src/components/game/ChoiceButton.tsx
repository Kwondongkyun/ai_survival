'use client';

import { motion } from 'framer-motion';
import { Heart, Wallet, Briefcase, BookOpen, LucideIcon } from 'lucide-react';
import { Choice } from '@/types/game';

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onSelect: (choice: Choice) => void;
  visible?: boolean;
}

const STAT_ICONS: Record<string, { icon: LucideIcon; name: string }> = {
  satisfaction: { icon: Heart,      name: '만족도' },
  budget:       { icon: Wallet,     name: '예산' },
  career:       { icon: Briefcase,  name: '진로' },
  academic:     { icon: BookOpen,   name: '학업' },
};

export default function ChoiceButton({ choice, index, onSelect, visible = true }: ChoiceButtonProps) {
  const effects = Object.entries(choice.effects).filter(([, v]) => v !== 0);

  return (
    <motion.button
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ delay: visible ? index * 0.15 : 0, type: 'spring', stiffness: 280, damping: 22 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(choice)}
      className="w-full text-left bg-white/70 hover:bg-white border border-petal hover:border-cherry rounded-xl p-4 transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      <p className="text-sm font-medium mb-2 text-ink">{choice.text}</p>
      <div className="flex flex-wrap gap-2">
        {effects.map(([key, value]) => {
          const stat = STAT_ICONS[key];
          const Icon = stat.icon;
          const isPositive = value > 0;
          return (
            <span
              key={key}
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                isPositive ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
              }`}
            >
              <Icon size={11} strokeWidth={2.5} />
              {stat.name} {isPositive ? '+' : ''}{value}
            </span>
          );
        })}
      </div>
    </motion.button>
  );
}
