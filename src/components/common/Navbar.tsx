import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { TecLogo } from './TecLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, detail?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator?.userAgent || '');
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K';

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
            ? 'bg-[#1C1C24]/90 backdrop-blur-xl border-white/[0.1] shadow-apple-md'
            : 'bg-[#1C1C24]/70 backdrop-blur-md border-white/[0.06]'
        }`}
      >
        {/* Brand Logo with Bespoke Apple Squircle Icon */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
            <TecLogo className="w-8 h-8" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="font-extrabold text-lg tracking-tight text-[#F5F5F7]">
              TEC
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#007AFF] bg-[#007AFF]/20 px-1.5 py-0.5 rounded-full border border-[#007AFF]/30">
              C-Lang
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.05]">
          {navLinks.map((link) => {
            const isActive = currentView === link.id || (link.id === 'sandbox' && currentView === 'practice');
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2C2C34] text-[#007AFF] shadow-sm'
                    : 'text-[#9898A0] hover:text-[#F5F5F7]'
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
            className="hidden sm:flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-[#9898A0] hover:text-[#F5F5F7] transition-colors border border-white/[0.06]"
            title={`Global Search (${shortcutLabel})`}
          >
            <Search className="w-3.5 h-3.5 text-[#007AFF]" />
            <span className="font-medium text-white/90">Search</span>
            <kbd className="text-[10px] bg-white/[0.1] px-1.5 py-0.5 rounded text-[#F5F5F7] font-mono">
              {shortcutLabel}
            </kbd>
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
            className="md:hidden w-8 h-8 flex items-center justify-center text-[#9898A0]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-[#1C1C24]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.1] p-4 shadow-apple-lg flex flex-col space-y-2 z-50">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] text-xs font-semibold text-[#9898A0]"
          >
            <span className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-[#007AFF]" />
              <span>Search Curriculum & Lessons</span>
            </span>
            <kbd className="text-[10px] bg-white/[0.1] px-1.5 py-0.5 rounded text-white font-mono">
              {shortcutLabel}
            </kbd>
          </button>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(link.id);
              }}
              className="text-left px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:bg-white/[0.06]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
