'use client';

import { LoginForm } from '@/components/login-form';
import { BadgeCheck, Brain, Gamepad2, Heart, Shield, Sparkles, Trophy, User } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* 1. HERO & LOGIN SECTION */}
      <section 
        className="min-h-screen w-full flex flex-col lg:flex-row items-center lg:items-start justify-between p-4 lg:p-12 relative"
        style={{
          backgroundImage: 'url(/hero-kids.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          width: '100vw',
        }}
      >
        {/* Left Side - Hero Content - Sticky on Desktop */}
        <div className="w-full lg:w-1/2 space-y-6 pt-8 z-10 px-4 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-start lg:pt-24 lg:pl-12">
          <div className="relative max-w-2xl space-y-4 text-white">
            <h1 className="text-4xl font-black tracking-tight md:text-6xl lg:text-7xl drop-shadow-md text-white/95">
              EduVerse
            </h1>
            <h2 className="text-xl font-bold md:text-3xl text-white/90 drop-shadow-sm">
              Smart Learning for Young Explorers
            </h2>
            <p className="text-base md:text-xl text-white/90 max-w-lg leading-relaxed drop-shadow-sm font-semibold">
              “A joyful, pressure-free learning platform for children aged 6–12.
              Built with games, voice guidance, and progress parents can trust.”
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 pt-4 lg:pt-8 lg:min-h-screen lg:items-center">
          <div className="w-full max-w-md bg-white/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-8 transition-all hover:shadow-2xl mb-8">
            <LoginForm />
          </div>
        </div>
      </section>

      {/* 2. EDUVERSE DESCRIPTION CONTENT (Below Fold) */}
      <section className="bg-white py-24 px-6 lg:px-24 relative overflow-hidden">
         {/* Decorative blobs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          
          {/* Introduction - Lighter, more spacing */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
             <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-4 border border-blue-100">
                🚀 Welcome to the Future of Learning
             </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Where Learning Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Adventure</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              EduVerse isn't just another classroom app. It's a vibrant world where every lesson is a game, 
              every challenge is a quest, and every student is a hero.
            </p>
          </div>

          {/* Feature Grid - Enhanced Light UI */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-orange-50/50 p-8 rounded-[2rem] border-2 border-orange-100 hover:border-orange-200 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Brain className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Who is it for?</h3>
              <p className="text-slate-600 leading-relaxed">
                Designed primarily for <span className="font-bold text-slate-800">children aged 6–12</span>. 
                Perfect for curious minds who love stories, games, and exploring new worlds.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-50/50 p-8 rounded-[2rem] border-2 border-blue-100 hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">What they learn</h3>
              <p className="text-slate-600 leading-relaxed">
                Core subjects like <span className="font-bold text-slate-800">Math, Science, and Language</span>, 
                woven into exciting narratives. Plus critical thinking and creativity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-green-50/50 p-8 rounded-[2rem] border-2 border-green-100 hover:border-green-200 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Parent Peace of Mind</h3>
              <p className="text-slate-600 leading-relaxed">
                100% safe, ad-free environment. Detailed progress dashboards let you see exactly what your 
                child is mastering in real-time.
              </p>
            </div>
          </div>

          {/* Why Different Section - Redesigned Light Theme */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-[2.5rem] p-8 lg:p-16 border border-indigo-100 shadow-xl shadow-indigo-100/50 overflow-hidden relative">
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <h3 className="text-3xl lg:text-4xl font-black text-slate-800">Why EduVerse is Different</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-indigo-50">
                      <Gamepad2 className="w-7 h-7 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">True Gamification</h4>
                      <p className="text-slate-600 text-lg">Not just badges. We build immersive worlds where learning is the key to progress.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-indigo-50">
                      <Trophy className="w-7 h-7 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Adaptive Audio Guidance</h4>
                      <p className="text-slate-600 text-lg">Friendly voice mentors guide your child, reading text aloud and offering encouragement.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-indigo-50">
                      <Heart className="w-7 h-7 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">Emotional Intelligence</h4>
                      <p className="text-slate-600 text-lg">We recognize frustration and celebration, adjusting the difficulty to keep confidence high.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Preview - Clean Light Version */}
              <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-blue-100 border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-2xl shadow-lg shadow-yellow-200">
                    <BadgeCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-slate-800">Parent Dashboard</p>
                    <p className="text-slate-500">Weekly Activity Snapshot</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                      <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                        <span>Math Quests</span>
                        <span className="text-blue-600">75%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[75%] bg-blue-500 rounded-full"></div>
                      </div>
                  </div>
                  
                  <div>
                      <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                        <span>Science Labs</span>
                        <span className="text-green-600">90%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                      </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <p className="italic text-slate-600 font-medium">"Since starting EduVerse, Sarah actually asks to do her homework!"</p>
                        <p className="text-right text-slate-400 text-sm mt-2 font-bold">- Mark P., Parent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
