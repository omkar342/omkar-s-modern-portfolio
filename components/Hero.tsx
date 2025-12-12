import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MousePointer2, FileText } from 'lucide-react';

import config from '../data/config.json';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const points: { x: number; y: number; z: number }[] = [];
    const numPoints = 80;
    const radius = Math.min(width, height) * 0.25;

    // Initialize points on a sphere
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / numPoints);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta)
      });
    }

    let rotationX = 0;
    let rotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.0005;
      mouseY = (e.clientY - rect.top - height / 2) * 0.0005;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      rotationX += (mouseY - rotationX) * 0.05;
      rotationY += (mouseX - rotationY) * 0.05;
      
      // Auto rotate slowly
      const time = Date.now() * 0.0005;
      const autoRotX = Math.sin(time) * 0.2;
      const autoRotY = time * 0.3;

      const finalRotX = rotationX + autoRotX;
      const finalRotY = rotationY + autoRotY;

      const projectedPoints = points.map(p => {
        // Rotate Y
        let x = p.x * Math.cos(finalRotY) - p.z * Math.sin(finalRotY);
        let z = p.z * Math.cos(finalRotY) + p.x * Math.sin(finalRotY);
        
        // Rotate X
        let y = p.y * Math.cos(finalRotX) - z * Math.sin(finalRotX);
        z = z * Math.cos(finalRotX) + p.y * Math.sin(finalRotX);

        // Project
        const scale = 400 / (400 + z);
        return {
          x: x * scale + width / 2,
          y: y * scale + height / 2,
          scale,
          z
        };
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.1)'; // Primary color low opacity
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const d = Math.hypot(
            projectedPoints[i].x - projectedPoints[j].x,
            projectedPoints[i].y - projectedPoints[j].y
          );
          if (d < 80) {
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
          }
        }
      }
      ctx.stroke();

      // Draw points
      projectedPoints.forEach(p => {
        const opacity = (p.z + radius) / (2 * radius); // Fade back points
        ctx.fillStyle = `rgba(6, 182, 212, ${Math.max(0.1, opacity)})`; // Secondary color
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-60"
      />

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        
        <div className="mb-6 animate-float">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-secondary shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>2+ Years Commercial Experience</span>
          </div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
          Full Stack <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-glow">
            Architecture
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          Hi, I'm Omkar. I build high-performance web applications using MERN, AWS, and modern JavaScript.
          Specializing in scalable backend systems and optimized frontend experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-primary font-display rounded-lg hover:bg-[#034ABC] hover:shadow-[0_0_30px_rgba(3,74,188,0.5)] hover:-translate-y-1"
          >
            Explore Work
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={config.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-slate-200 transition-all duration-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white backdrop-blur-sm hover:-translate-y-1 font-display hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <FileText className="mr-2 h-5 w-5" />
            Download Resume
          </a>
        </div>

        <div className="mt-16 flex items-center gap-8">
          <a href="https://github.com/omkar342" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-all transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            <Github className="h-7 w-7" />
          </a>
          <a href="https://www.linkedin.com/in/omkar-jadhav-7809b7196/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-secondary transition-all transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <Linkedin className="h-7 w-7" />
          </a>
          <a href="mailto:omkarjadhav095@gmail.com" className="text-slate-500 hover:text-accent transition-all transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]">
            <Mail className="h-7 w-7" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <MousePointer2 className="h-6 w-6" />
      </div>
    </section>
  );
};

export default Hero;