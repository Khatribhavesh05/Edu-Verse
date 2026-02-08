'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { AchievementReplayModal } from '@/components/achievement-replay-modal';

interface AchievementBadgeProps {
  name: string;
  emoji: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
  howEarned: string;
  nextSteps: string;
}

export function AchievementBadge({
  name,
  emoji,
  color,
  earned,
  earnedDate,
  howEarned,
  nextSteps,
}: AchievementBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Earned badges get a subtle progress glow
  const progressGlow = earned && !isHovering
    ? '0 0 15px 3px rgba(251, 191, 36, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)'
    : undefined;

  const handleCardClick = () => {
    if (earned) {
      // Open replay modal for unlocked badges
      setShowModal(true);
    } else {
      // Just expand details for locked badges
      setIsExpanded(!isExpanded);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!earned) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowTooltip(false);
  };

  return (
    <div className="w-full relative">
      {/* Tooltip for locked badges */}
      {showTooltip && !earned && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg shadow-lg whitespace-nowrap">
          Keep going to unlock 🔒
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      )}

      <Card
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-3 ${
          earned
            ? `${color} hover:shadow-2xl`
            : 'bg-gray-100 border-gray-300 opacity-60 hover:opacity-75'
        } ${isExpanded ? 'ring-4 ring-yellow-400' : ''}`}
        style={{
          boxShadow: isHovering
            ? undefined // Let hover shadow take over
            : progressGlow
        }}
      >
        <div className="space-y-3">
          {/* Badge Content */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Large Emoji */}
              <div className={`text-6xl drop-shadow-lg ${earned ? 'animate-bounce-subtle' : ''}`}>
                {emoji}
              </div>

              {/* Badge Name */}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-foreground">{name}</h3>
                {earned && earnedDate && (
                  <p className="text-xs text-foreground/60 font-semibold">
                    Earned: {earnedDate}
                  </p>
                )}
                {!earned && (
                  <p className="text-xs text-foreground/60 font-semibold">Locked</p>
                )}
              </div>
            </div>

            {/* Expand Icon */}
            <ChevronDown
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className={`w-6 h-6 text-foreground/60 transition-transform duration-300 cursor-pointer hover:text-foreground ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="pt-4 border-t-2 border-foreground/10 space-y-4 animate-in fade-in duration-300">
              {/* How Earned */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-foreground">📖 How Earned:</p>
                <p className="text-base text-foreground/70">{howEarned}</p>
              </div>

              {/* Next Steps */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-foreground">🚀 Next Steps:</p>
                <p className="text-base text-foreground/70">{nextSteps}</p>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                {earned ? (
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    ✓ Unlocked!
                  </span>
                ) : (
                  <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                    🔒 Keep Working!
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Achievement Replay Modal */}
      {earned && (
        <AchievementReplayModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          badge={{
            name,
            emoji,
            color,
            earnedDate: earnedDate || 'Recently',
            achievementReason: howEarned
          }}
        />
      )}
    </div>
  );
}
