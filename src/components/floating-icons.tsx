'use client';

import {
  BookOpen,
  GraduationCap,
  Brain,
  Rocket,
  Puzzle,
  Calculator,
  Atom,
  Globe,
  Code,
  Star,
} from 'lucide-react';

const icons = [
  { Icon: BookOpen, color: '#6366f1', bg: '#eef2ff', glow: 'rgba(99,102,241,0.15)' },
  { Icon: GraduationCap, color: '#8b5cf6', bg: '#f5f3ff', glow: 'rgba(139,92,246,0.15)' },
  { Icon: Brain, color: '#f59e0b', bg: '#fffbeb', glow: 'rgba(245,158,11,0.15)' },
  { Icon: Rocket, color: '#ef4444', bg: '#fef2f2', glow: 'rgba(239,68,68,0.15)' },
  { Icon: Puzzle, color: '#10b981', bg: '#ecfdf5', glow: 'rgba(16,185,129,0.15)' },
  { Icon: Calculator, color: '#3b82f6', bg: '#eff6ff', glow: 'rgba(59,130,246,0.15)' },
  { Icon: Atom, color: '#06b6d4', bg: '#ecfeff', glow: 'rgba(6,182,212,0.15)' },
  { Icon: Globe, color: '#8b5cf6', bg: '#f5f3ff', glow: 'rgba(139,92,246,0.15)' },
  { Icon: Code, color: '#f97316', bg: '#fff7ed', glow: 'rgba(249,115,22,0.15)' },
  { Icon: Star, color: '#eab308', bg: '#fefce8', glow: 'rgba(234,179,8,0.15)' },
];

// Duplicate for seamless looping
const allIcons = [...icons, ...icons];

export function FloatingIcons() {
  return (
    <section className="w-full pt-16 pb-8 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-x-clip overflow-y-visible relative">
      {/* Edge fades for seamless look */}
      <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Single scrolling row */}
      <div className="floating-track">
        <div className="floating-row">
          {allIcons.map(({ Icon, color, bg, glow }, i) => (
            <div
              key={`icon-${i}`}
              className="floating-icon-wrapper"
              style={{ animationDelay: `${(i % icons.length) * -0.35}s` }}
            >
              <div
                className="floating-icon-circle"
                style={{
                  background: bg,
                  boxShadow: `0 4px 16px ${glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .floating-track {
          padding: 24px 0;
          width: 100%;
          overflow-x: clip;
          overflow-y: visible;
        }

        .floating-row {
          display: flex;
          gap: 2.5rem;
          width: max-content;
          animation: scrollLeft 50s linear infinite;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .floating-icon-wrapper {
          flex-shrink: 0;
          animation: waveFloat 3s ease-in-out infinite;
        }

        @keyframes waveFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .floating-icon-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .floating-icon-circle:hover {
          transform: scale(1.18) translateY(-3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-row,
          .floating-icon-wrapper {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
