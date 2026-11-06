import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, Terminal, Menu, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, detail?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'dashboard', label: 'Learn' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'sandbox', label: 'Practice' },
    { id: 'progress', label: 'Progress' },
    { id: 'bookmarks', label: 'Bookmarks' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3.5 pb-2 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl rounded-full transition-all duration-300 flex items-center justify-between px-5 py-2.5 border ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border-black/[0.08] dark:border-white/[0.1] shadow-apple-md'
            : 'bg-white/60 dark:bg-[#1C1C24]/60 backdrop-blur-md border-black/[0.05] dark:border-white/[0.06]'
        }`}
      >
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#32ADE6] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="font-extrabold text-lg tracking-tight text-[#171719] dark:text-[#F5F5F7]">
              TEC
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#007AFF] bg-[#007AFF]/10 dark:bg-[#007AFF]/20 px-1.5 py-0.5 rounded-full">
              C-Lang
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-full border border-black/[0.03] dark:border-white/[0.05]">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-[#2C2C34] text-[#007AFF] shadow-sm'
                    : 'text-[#777780] dark:text-[#9898A0] hover:text-[#171719] dark:hover:text-[#F5F5F7]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Spotlight Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#777780] dark:text-[#9898A0] transition-colors border border-black/[0.04] dark:border-white/[0.06]"
            title="Global Search (Ctrl+K or ⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="font-medium">Search</span>
            <kbd className="text-[10px] bg-black/[0.06] dark:bg-white/[0.1] px-1.5 py-0.5 rounded text-[#171719] dark:text-[#F5F5F7] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777780] dark:text-[#9898A0] hover:text-[#171719] dark:hover:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-1.5 bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow transition-all duration-200"
          >
            <span>{currentView === 'landing' ? 'Get Started' : 'Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-[#777780] dark:text-[#9898A0]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-white/95 dark:bg-[#1C1C24]/95 backdrop-blur-2xl rounded-2xl border border-black/[0.08] dark:border-white/[0.1] p-4 shadow-apple-lg flex flex-col space-y-2 z-50">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="flex items-center space-x-2 p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-xs text-[#777780]"
          >
            <Search className="w-4 h-4" />
            <span>Search topics, lessons, code...</span>
          </button>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#171719] dark:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
