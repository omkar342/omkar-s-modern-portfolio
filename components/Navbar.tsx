import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const resumeLink = "https://drive.google.com/file/d/1tqjsBKiaWeejWlk4WmSP-wF696fgg6sn/view?usp=sharing";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between h-16 px-6 rounded-full transition-all duration-300 ${scrolled ? 'glass-high-contrast' : 'bg-transparent'}`}>
          
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <Cpu className="relative h-8 w-8 text-white" />
            </div>
            <span className="font-display text-white font-bold text-xl tracking-wide">Omkar<span className="text-primary">.dev</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <a 
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white text-sm font-medium transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 md:hidden glass-high-contrast rounded-2xl p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl text-base font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
             <a 
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white px-4 py-3 rounded-xl text-base font-medium transition-colors mt-2"
              >
                View Resume
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;