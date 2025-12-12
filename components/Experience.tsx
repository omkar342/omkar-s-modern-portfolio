import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

import experienceData from '../data/experience.json';

const experiences: ExperienceType[] = experienceData;

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 bg-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Experience</h2>
          <div className="h-1 w-20 bg-accent rounded-full"></div>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline Node */}
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-dark border-2 border-slate-600 group-hover:border-accent group-hover:shadow-[0_0_10px_rgba(244,114,182,0.6)] transition-all duration-300"></div>
              
              <div className="glass-morphism p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                    <div>
                        <h3 className="text-2xl font-bold text-white font-display group-hover:text-accent transition-colors">
                        {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-medium mt-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{exp.company}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg text-sm text-slate-400 border border-white/5 whitespace-nowrap">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                    </div>
                </div>
                
                <ul className="space-y-3 mt-6 mb-6">
                    {exp.description.map((item, idx) => (
                    <li key={idx} className="text-slate-300 text-sm md:text-base leading-relaxed flex items-start">
                        <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                        {item}
                    </li>
                    ))}
                </ul>

                {exp.skills && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {exp.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:border-white/20 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;