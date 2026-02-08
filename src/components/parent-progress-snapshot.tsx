'use client';

import { Clock, TrendingUp, Zap, Gamepad2, Info } from 'lucide-react';
import { useGameStats } from '@/hooks/use-game-stats';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
}

function MetricCard({ icon, label, value, description }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-3 p-6 bg-white rounded-2xl border-2 border-blue-100 hover:border-blue-200 transition-colors">
      {/* Icon and Label */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
          {icon}
        </div>
        <h3 className="text-base font-bold text-foreground/80">{label}</h3>
      </div>

      {/* Value */}
      <p className="text-3xl font-black text-foreground">{value}</p>

      {/* Optional Description */}
      {description && (
        <p className="text-sm text-foreground/60 font-semibold leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export function ParentProgressSnapshot() {
  const { totalTimeSpent, gamesPlayed, skillsImproved, strongestArea } = useGameStats();

  // Format data for display
  const timeSpentText = totalTimeSpent > 0 ? `${totalTimeSpent} minutes` : 'No games played yet';
  const gamesPlayedText = gamesPlayed.length > 0 ? gamesPlayed.join(', ') : 'None yet';
  const skillsImprovedText = skillsImproved.length > 0 ? skillsImproved.join(', ') : 'Not yet determined';
  const strengthAreaText = strongestArea || 'Not yet determined';

  const metricsData = {
    timeSpent: {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      label: 'Time Spent Today',
      value: timeSpentText,
      description: totalTimeSpent > 0 ? 'Consistent, focused learning session' : 'Start playing games to track time',
    },
    gamesPlayed: {
      icon: <Gamepad2 className="w-6 h-6 text-purple-600" />,
      label: 'Games Played',
      value: gamesPlayed.length > 0 ? `${gamesPlayed.length} game${gamesPlayed.length !== 1 ? 's' : ''}` : 'None yet',
      description: gamesPlayed.length > 0 ? gamesPlayed.join(', ') : 'Start playing to earn points',
    },
    skillsImproved: {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      label: 'Skills Improved',
      value: skillsImprovedText,
      description: skillsImproved.length > 0 ? 'Areas where progress was detected' : 'Play games to unlock skill insights',
    },
    strengthArea: {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      label: 'Strength Area',
      value: strengthAreaText,
      description: strongestArea ? 'Where your child excels today' : 'Complete games to identify strengths',
    },
  };

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl border-2 border-blue-200">
      {/* Learning Scope Info */}
      <div className="rounded-2xl border border-blue-100 bg-white/80 p-5">
        <div className="flex items-center gap-3 text-foreground/80">
          <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <Info className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="text-base font-bold">Learning Scope</h3>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/70 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">•</span>
            <span>Target Age: 6–12 years</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">•</span>
            <span>Grades: 1–6</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">•</span>
            <span>Subjects: Math, Grammar, Science</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">•</span>
            <span>Learning Style: Game-based, Voice-assisted, Stress-free</span>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-foreground">
          Parent Progress Snapshot 👨‍👩‍👧
        </h2>
        <p className="text-lg text-foreground/70 font-semibold">
          A quick look at today's learning journey
        </p>
      </div>

      {/* Info Message */}
      <div className="p-4 bg-blue-100 rounded-xl border-l-4 border-blue-500">
        <p className="text-sm text-blue-900 font-semibold">
          💡 This section helps you understand your child's daily learning progress
          at a glance. No grades or scores — just meaningful insights.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={metricsData.timeSpent.icon}
          label={metricsData.timeSpent.label}
          value={metricsData.timeSpent.value}
          description={metricsData.timeSpent.description}
        />
        <MetricCard
          icon={metricsData.gamesPlayed.icon}
          label={metricsData.gamesPlayed.label}
          value={metricsData.gamesPlayed.value}
          description={metricsData.gamesPlayed.description}
        />
        <MetricCard
          icon={metricsData.skillsImproved.icon}
          label={metricsData.skillsImproved.label}
          value={metricsData.skillsImproved.value}
          description={metricsData.skillsImproved.description}
        />
        <MetricCard
          icon={metricsData.strengthArea.icon}
          label={metricsData.strengthArea.label}
          value={metricsData.strengthArea.value}
          description={metricsData.strengthArea.description}
        />
      </div>

      {/* Growth Focused Message */}
      <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border-2 border-green-200">
        <p className="text-base text-green-900 font-bold leading-relaxed">
          ✨ <span className="font-black">Growth Over Performance:</span> We focus on your child's
          progress, curiosity, and effort rather than scores or rankings. Every
          learning session contributes to building confident, independent learners.
        </p>
      </div>
    </div>
  );
}
