import React, { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

import projectsData from '../data/projects.json';

const projects: Project[] = projectsData;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative h-[450px] w-full preserve-3d group perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div
        className="absolute inset-0 rounded-2xl glass-high-contrast border border-white/10 transition-all duration-200 ease-out shadow-2xl"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image Container */}
        <div className="h-1/2 w-full overflow-hidden rounded-t-2xl relative">
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ transform: 'translateZ(20px)' }}
          />
        </div>

        {/* Content */}
        <div className="p-6 relative z-20 bg-dark/80 backdrop-blur-md rounded-b-2xl h-1/2 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
              {project.description}
            </p>
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-secondary border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-4">
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

        {/* Shine effect */}
        <div 
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: `radial-gradient(circle at ${50 + rotation.y * 2}% ${50 + rotation.x * 2}%, rgba(255,255,255,0.1), transparent 50%)`,
                transform: 'translateZ(1px)'
            }}
        ></div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <button className="px-8 py-3 rounded-full border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white hover:border-primary/50 transition-all duration-300">
                 View All Projects
             </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;