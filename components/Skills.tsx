import React from 'react';
import { Code, Database, Layout, Terminal, Cpu, Globe } from 'lucide-react';
import skillsData from '../data/skills.json';

const iconMap: Record<string, React.ReactNode> = {
  frontend: <Layout className="h-6 w-6" />,
  backend: <Terminal className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  devops: <Cpu className="h-6 w-6" />,
  default: <Code className="h-6 w-6" />
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 bg-[#020010] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6" dangerouslySetInnerHTML={{ __html: skillsData.title }}>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            {skillsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.categories.map((category) => (
            <div key={category.id} className="glass-morphism p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary/20 transition-colors">
                  {iconMap[category.id] || iconMap.default}
                </div>
                <h3 className="text-xl font-bold text-white font-display">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm text-slate-300 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 hover:text-white transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
