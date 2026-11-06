import React from 'react';

interface TecLogoProps {
  className?: string;
  size?: number;
}

export const TecLogo: React.FC<TecLogoProps> = ({ className = 'w-8 h-8', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <defs>
        {/* Outer squircle gradient */}
        <linearGradient id="tec-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E2330" />
          <stop offset="50%" stopColor="#11151F" />
          <stop offset="100%" stopColor="#0B0D13" />
        </linearGradient>

        {/* Specular border sheen */}
        <linearGradient id="tec-border" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#007AFF" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#32ADE6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#AF52DE" stopOpacity="0.6" />
        </linearGradient>

        {/* C Arc Gradient */}
        <linearGradient id="tec-c" x1="8" y1="10" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5AC8FA" />
          <stop offset="40%" stopColor="#007AFF" />
          <stop offset="100%" stopColor="#AF52DE" />
        </linearGradient>

        {/* Core Node Glow */}
        <radialGradient id="tec-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34C759" stopOpacity="1" />
          <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
        </radialGradient>

        <filter id="tec-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#007AFF" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer Continuous Squircle */}
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="10"
        fill="url(#tec-bg)"
        stroke="url(#tec-border)"
        strokeWidth="1.5"
      />

      {/* Internal ambient ring */}
      <rect
        x="3"
        y="3"
        width="34"
        height="34"
        rx="8.5"
        stroke="white"
        strokeOpacity="0.06"
        strokeWidth="1"
      />

      {/* Stylized 'C' Emblem */}
      <path
        d="M26.5 14.5 C24.2 12.2 21.2 11 18 11 C12.8 11 8.8 15 8.8 20 C8.8 25 12.8 29 18 29 C21.2 29 24.2 27.8 26.5 25.5"
        stroke="url(#tec-c)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#tec-shadow)"
      />

      {/* Binary Compiler Prompt Chevron inside C */}
      <path
        d="M17 17.5L20 20L17 22.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />

      {/* Glowing Dennis Ritchie C Pointer/Memory Node */}
      <circle cx="26.5" cy="14.5" r="2.2" fill="#5AC8FA" />
      <circle cx="26.5" cy="25.5" r="2.2" fill="#AF52DE" />
    </svg>
  );
};
