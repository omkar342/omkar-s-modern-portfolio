import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Cpu, ChevronRight } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Greetings. I am CYBER-V, Omkar's automated portfolio interface. Ask me about Omkar's skills, projects, or experience.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(history, userMsg.text);

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error: Neural link unstable. Unable to process request.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-110 border border-white/10 ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-primary text-white'}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-[#0a0a16] border border-primary/30 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
          
          {/* Header */}
          <div className="bg-slate-900/80 p-4 border-b border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-bold font-display tracking-wide">CYBER-V <span className="text-xs font-mono text-primary bg-primary/10 px-1 py-0.5 rounded">v2.0</span></h3>
                <p className="text-[10px] text-secondary uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                  System Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] relative group ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-2xl rounded-tr-sm'
                      : 'bg-slate-800/80 border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  <div className="px-5 py-3 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  <div className={`text-[10px] opacity-50 px-5 pb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                     {msg.role === 'model' ? 'AI' : 'YOU'} • {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-white/10 px-5 py-3 rounded-2xl rounded-tl-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></span>
                  </div>
                  <span className="text-xs text-primary font-mono uppercase">Processing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900/90 border-t border-primary/20">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter query..."
                className="w-full bg-[#050510] border border-slate-700 rounded-lg pl-4 pr-12 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 p-1.5 text-primary hover:bg-primary/20 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 text-center">
                 <p className="text-[9px] text-slate-600 font-mono">POWERED BY GEMINI NEURAL ENGINE</p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;