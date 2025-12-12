import React from 'react';
import { Code2, Server, Cloud, Zap, Brain, Rocket, LucideIcon } from 'lucide-react';
import aboutData from '../data/about.json';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Server,
  Cloud,
  Zap,
  Brain,
  Rocket
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4" dangerouslySetInnerHTML={{ __html: aboutData.headline }}>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
          </div>
          <p className="text-slate-400 max-w-xl text-lg">
            {aboutData.subheadline}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Main Bio - Full Width */}
          <div className="lg:col-span-3 glass-morphism p-8 rounded-3xl border-l-4 border-l-primary flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 className="h-40 w-40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-display">{aboutData.bio.title}</h3>
            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              {aboutData.bio.description}
            </p>
          </div>

          {/* Dynamic Cards */}
          {aboutData.cards.map((card) => {
            const Icon = iconMap[card.icon] || Zap;
            return (
              <div key={card.id} className="glass-morphism p-8 rounded-3xl border border-white/5 hover:border-secondary/50 transition-colors group">
                <div className="p-3 bg-secondary/20 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                <p className="text-sm text-slate-400 mb-4 font-mono border-l-2 border-slate-700 pl-3">
                  {card.quote}
                </p>
                <p className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.description }}>
                </p>
              </div>
            );
          })}

           {/* DSA & Problem Solving (Wide) */}
           <div className="lg:col-span-2 glass-morphism p-8 rounded-3xl border border-white/5 hover:border-green-500/50 transition-colors group flex flex-col md:flex-row gap-6 items-start md:items-center">
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-xl w-fit group-hover:scale-110 transition-transform">
                        <Brain className="h-8 w-8 text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">{aboutData.dsa.title}</h4>
                </div>
                <p className="text-sm text-slate-400 mb-4 font-mono border-l-2 border-slate-700 pl-3">
                    {aboutData.dsa.quote}
                </p>
                <p className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: aboutData.dsa.description }}>
                </p>
             </div>
             <div className="md:w-1/3 bg-black/20 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-5xl font-bold text-white font-display mb-1">{aboutData.dsa.solvedCount}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-4">DSA Problems Solved</div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 w-[90%]"></div>
                </div>
             </div>
          </div>

           {/* Experience Stat */}
           <div className="glass-morphism p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors group flex flex-col justify-center items-center text-center">
             <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:rotate-12 transition-transform">
                <Rocket className="h-10 w-10 text-slate-200" />
             </div>
            <h4 className="text-5xl font-bold text-white mb-2 font-display">{aboutData.experience.years}</h4>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Years Experience</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;