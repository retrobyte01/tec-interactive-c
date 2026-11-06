import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface FolderFloatItem {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  lessonsCount: number;
  badge: string;
  color: string;
  onClick: () => void;
}

interface FolderFloatProps {
  items: FolderFloatItem[];
  className?: string;
}

export const FolderFloat: React.FC<FolderFloatProps> = ({ items, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item) => (
        <FolderFloatCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const FolderFloatCard: React.FC<{ item: FolderFloatItem }> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={item.onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative cursor-pointer select-none"
    >
      {/* Folder Tab (macOS style tab) */}
      <div className="flex items-center">
        <div
          className="h-4 w-24 rounded-t-xl transition-all duration-300"
          style={{
            backgroundColor: item.color,
            opacity: isHovered ? 0.9 : 0.75
          }}
        />
        <div className="h-4 flex-1" />
      </div>

      {/* Main Folder Body */}
      <div
        className="relative overflow-hidden rounded-2xl rounded-tl-none border border-black/[0.06] dark:border-white/[0.08] p-6 transition-all duration-300 backdrop-blur-xl bg-white/80 dark:bg-[#1C1C24]/80 shadow-apple-md hover:shadow-apple-lg"
        style={{
          boxShadow: isHovered
            ? `0 20px 40px -15px ${item.color}25, 0 0 0 1px ${item.color}30`
            : undefined
        }}
      >
        {/* Subtle Ambient Gradient Corner */}
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: item.color,
            opacity: isHovered ? 0.25 : 0.08
          }}
        />

        {/* Top Meta Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold text-white shadow-sm"
              style={{ backgroundColor: item.color }}
            >
              {item.chapterNumber < 10 ? `0${item.chapterNumber}` : item.chapterNumber}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780] dark:text-[#9898A0]">
              {item.badge}
            </span>
          </div>

          <motion.div
            animate={{ x: isHovered ? 2 : 0, y: isHovered ? -2 : 0 }}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-black/[0.03] dark:bg-white/[0.05] text-[#777780] group-hover:text-[#007AFF] transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Folder Title and Subtitle */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#171719] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-xs text-[#777780] dark:text-[#9898A0] mt-1 font-medium">
            {item.subtitle}
          </p>
        </div>

        {/* Folder Bottom Status */}
        <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-xs text-[#777780] dark:text-[#9898A0]">
          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{item.lessonsCount} {item.lessonsCount === 1 ? 'Lesson' : 'Lessons'}</span>
          </div>
          <span className="font-medium text-[#007AFF] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore →
          </span>
        </div>
      </div>
    </motion.div>
  );
};
