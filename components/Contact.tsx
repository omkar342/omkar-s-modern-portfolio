import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Transmission received. I will respond shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-dark to-[#050510] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Let's Build the <br /> <span className="text-primary">Impossible</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Have an idea that needs engineering? Or just want to discuss system design and architecture? 
                My inbox is always open.
                </p>
            </div>
            
            <div className="space-y-6">
              <div className="group flex items-center gap-5 p-4 glass-morphism rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="p-3 bg-primary/20 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <a href="mailto:omkarjadhav095@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                    omkarjadhav095@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="group flex items-center gap-5 p-4 glass-morphism rounded-2xl border border-white/5 hover:border-secondary/30 transition-all duration-300">
                <div className="p-3 bg-secondary/20 rounded-xl text-secondary group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-slate-400">
                    Pune, Bangalore, Hyderabad, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-high-contrast p-8 rounded-3xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="flex items-center gap-2 mb-6">
                 <MessageSquare className="text-primary h-5 w-5" />
                 <span className="text-white font-semibold">Send Message</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
                    placeholder="ENTER NAME"
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
                    placeholder="ENTER EMAIL"
                    />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-dark/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none placeholder-slate-600"
                  placeholder="INITIALIZE COMMUNICATION..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-primary to-violet-600 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transform hover:-translate-y-1"
              >
                Transmit Data
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;