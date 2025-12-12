import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen text-slate-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      <footer className="bg-[#020010] border-t border-white/5 py-12 text-center text-slate-500 text-sm relative z-10">
        <p className="font-display">&copy; {new Date().getFullYear()} Omkar. Crafted with <span className="text-primary">React</span>.</p>
      </footer>

      <ChatAssistant />
    </div>
  );
};

export default App;