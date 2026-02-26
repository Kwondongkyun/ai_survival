"use client";

import { motion } from "framer-motion";
import { Flower2, Sun, Leaf, Snowflake, LucideIcon } from "lucide-react";
import { MAX_WEEKS } from "@/lib/constants";
import ProgressBar from "@/components/ui/ProgressBar";

interface WeekCounterProps {
  week: number;
}

const SEASONS: {
  label: string;
  semester: string;
  Icon: LucideIcon;
  color: string;
}[] = [
  { label: "봄", semester: "1학기", Icon: Flower2, color: "text-pink-400" },
  { label: "여름", semester: "여름방학", Icon: Sun, color: "text-yellow-400" },
  { label: "가을", semester: "2학기", Icon: Leaf, color: "text-orange-400" },
  { label: "겨울", semester: "2학기", Icon: Snowflake, color: "text-blue-300" },
];

export default function WeekCounter({ week }: WeekCounterProps) {
  const seasonIndex = week <= 8 ? 0 : week <= 16 ? 1 : week <= 24 ? 2 : 3;
  const { semester, Icon, color } = SEASONS[seasonIndex];

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-petal rounded-xl p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className={color} strokeWidth={2} />
          <span className="text-sm text-ink/60">{semester}</span>
        </div>
        <motion.span
          key={week}
          initial={{ scale: 1.3, color: "#FF6B8A" }}
          animate={{ scale: 1, color: "#2D1B69" }}
          className="text-lg font-bold"
        >
          {week}주차
        </motion.span>
        <span className="text-sm text-ink/40">/ {MAX_WEEKS}주</span>
      </div>
      <ProgressBar value={week} max={MAX_WEEKS} color="bg-cherry" />
    </div>
  );
}
