import React, { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

import projectsData from '../data/projects.json';

const projects: Project[] = projectsData;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
      {/* Image Container */}
      <div className="h-48 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-secondary border border-white/5">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/5 hover:border-white/20">
              <Github className="h-4 w-4" />
              Source
            </a>
            <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-sm text-primary hover:bg-primary/20 hover:text-white transition-all duration-300 border border-primary/20 hover:border-primary/50 group/link">
              Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-32 bg-[#050511] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Works</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A curation of my best engineering work, featuring complex systems and beautiful interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <button 
                onClick={() => {
                  if (showAll) {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setShowAll(!showAll);
                }}
                className="px-8 py-3 rounded-full border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white hover:border-primary/50 transition-all duration-300"
             >
                 {showAll ? 'Show Less' : 'View All Projects'}
             </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;