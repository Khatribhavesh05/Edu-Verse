
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { subjects, games } from '@/lib/constants';
import { GameCard } from '@/components/game-card';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export default function SubjectPage({ params }: { params: { slug: string } }) {
  const subject = subjects.find((s) => s.slug === params.slug);

  if (!subject) {
    notFound();
  }
  const Icon = subject.icon;

  const subjectGames = games.filter(g => g.subject === params.slug);

  const subjectColors: {[key: string]: string} = {
    mathematics: "from-blue-400 to-cyan-400",
    science: "from-green-400 to-teal-400",
    english: "from-orange-400 to-yellow-400",
    "social-studies": "from-indigo-400 to-purple-400",
    "computer-science": "from-gray-700 to-slate-600",
    "general-knowledge": "from-pink-400 to-rose-400",
  }
  const gradient = subjectColors[subject.slug] || "from-gray-400 to-slate-400";


  return (
    <div 
        className="flex flex-col gap-8"
    >
      <Link href="/">
        <Button variant="outline" size="sm" className="rounded-full self-start">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Subjects
        </Button>
      </Link>
      
      <section 
        className={`flex items-center gap-6 p-8 rounded-3xl bg-gradient-to-r ${gradient} text-white shadow-2xl`}
      >
        <div 
            className="p-4 bg-white/30 rounded-2xl"
        >
          <Icon className="w-16 h-16" />
        </div>
        <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight drop-shadow-md">{subject.name}</h1>
            <p className="text-xl text-white/90 mt-1">Ready for a challenge? Pick a game to start learning.</p>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjectGames.map((game, i) => (
            <div
              key={game.slug}
            >
              <GameCard game={game} subjectSlug={subject.slug} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
