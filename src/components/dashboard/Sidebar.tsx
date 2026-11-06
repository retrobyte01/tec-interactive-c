import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Milestone,
  HelpCircle,
  Code2,
  Bookmark,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { TecLogo } from '../common/TecLogo';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onBackToHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  onBackToHome
}) => {
  const { progress } = useProgress();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all-courses', label: 'All Courses', icon: BookOpen },
    { id: 'learning-path', label: 'Learning Path', icon: Milestone },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'sandbox', label: 'Practice (Sandbox)', icon: Code2 },
    { id: 'bookmarks', label: 'Bookmarks & Notes', icon: Bookmark },
    { id: 'progress', label: 'My Progress', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 h-screen z-40 bg-white/80 dark:bg-[#16161D]/80 backdrop-blur-2xl border-r border-black/[0.06] dark:border-white/[0.08] transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand & Toggle Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div
            onClick={onBackToHome}
            className={`flex items-center space-x-2.5 cursor-pointer select-none ${
              collapsed ? 'justify-center w-full' : ''
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <TecLogo className="w-8 h-8" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[#171719] dark:text-[#F5F5F7]">
                  TEC
                </span>
                <span className="text-[10px] text-[#007AFF] font-semibold -mt-0.5">
                  Platform
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#777780] hover:text-[#171719] dark:hover:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed expand button */}
        {collapsed && (
          <div className="p-2 flex justify-center">
            <button
              onClick={onToggleCollapse}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#777780] hover:text-[#171719] dark:hover:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
              title="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'sandbox' && (currentTab === 'sandbox' || currentTab === 'practice'));
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-xs font-medium transition-all ${
                  collapsed ? 'justify-center p-3' : 'space-x-3 px-3.5 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#007AFF] text-white shadow-sm'
                    : 'text-[#777780] dark:text-[#9898A0] hover:text-[#171719] dark:hover:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 stroke-[2]" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Streak Widget */}
      <div className="p-4 border-t border-black/[0.04] dark:border-white/[0.06]">
        {!collapsed ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.03] dark:border-white/[0.05]">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#FF9500]/15 text-[#FF9500] flex items-center justify-center">
                <Flame className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#171719] dark:text-[#F5F5F7]">
                  {progress.streakDays} Day Streak
                </div>
                <div className="text-[10px] text-[#777780] dark:text-[#9898A0]">
                  Keep going!
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center p-2 rounded-xl bg-[#FF9500]/15 text-[#FF9500]"
            title={`${progress.streakDays} Day Streak`}
          >
            <Flame className="w-5 h-5 fill-current" />
          </div>
        )}
      </div>
    </aside>
  );
};
