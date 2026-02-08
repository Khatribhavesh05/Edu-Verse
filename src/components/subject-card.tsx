
import Link from 'next/link';
import type { FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { subjects } from '@/lib/constants';

type Subject = (typeof subjects)[0];

interface SubjectCardProps {
  subject: Subject;
}

const subjectColors = {
  mathematics: "from-blue-400 to-cyan-400",
  science: "from-green-400 to-teal-400",
  english: "from-orange-400 to-yellow-400",
  "social-studies": "from-indigo-400 to-purple-400",
  "computer-science": "from-gray-700 to-gray-500",
  "general-knowledge": "from-pink-400 to-rose-400",
}

export const SubjectCard: FC<SubjectCardProps> = ({ subject }) => {
  const Icon = subject.icon;
  const gradient = subjectColors[subject.slug as keyof typeof subjectColors] || "from-gray-400 to-gray-500";

  return (
    <Link href={`/subjects/${subject.slug}`} className="group">
      <Card className={`h-full transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl rounded-3xl bg-gradient-to-br ${gradient}`}>
        <div className="bg-white/30 backdrop-blur-sm rounded-3xl h-full w-full p-1">
          <div className="bg-white/80 rounded-3xl h-full w-full flex flex-col justify-between">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-white rounded-full mb-2 shadow-inner">
                <Icon className="w-12 h-12 text-blue-500" />
              </div>
              <CardTitle>
                <span className="text-2xl font-black text-brand-text">{subject.name}</span>
              </CardTitle>
              <CardDescription className="text-base text-brand-text-light">
                Explore the world of {subject.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center font-bold text-lg text-blue-600 group-hover:text-purple-600">
                Let's Go! <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
};
