
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, ExternalLink } from 'lucide-react';
import { getSweetRecommendation } from '../services/geminiService';
import { Message } from '../types';
import { COLORS } from '../constants';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! Welcome to New Jyoti Sweets, Teliyarganj. I am your personal host. How can I delight you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getSweetRecommendation(userMsg);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: response.text, 
      groundingLinks: response.groundingLinks 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="mb-4 w-[90vw] sm:w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border border-[#4A0404]/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#4A0404] text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 paisley-pattern opacity-10"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#E65100] flex items-center justify-center border-2 border-white/20 shadow-lg">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold serif text-lg leading-tight">Jyoti Sweets Bot</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#FFD700] tracking-widest font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    ACTIVE IN TELIYARGANJ
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFF8E1]/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] space-y-2`}>
                    <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-[#E65100] text-white rounded-tr-none' 
                        : 'bg-white text-[#3E2723] rounded-tl-none border border-black/5'
                    }`}>
                      {m.content}
                    </div>
                    {m.groundingLinks && m.groundingLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.groundingLinks.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-[#4A0404]/10 rounded-full text-[10px] font-bold text-[#4A0404] hover:bg-[#4A0404] hover:text-white transition-all shadow-sm"
                          >
                            <ExternalLink size={10} />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-black/5 flex gap-1 shadow-sm">
                    <span className="w-2 h-2 bg-[#E65100] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#E65100] rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-[#E65100] rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-[#4A0404]/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for recommendations..."
                className="flex-1 bg-[#FFF8E1]/50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#E65100] outline-none placeholder-[#3E2723]/30"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-3.5 bg-[#4A0404] text-white rounded-2xl hover:bg-[#E65100] transition-colors disabled:opacity-50 shadow-lg active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#E65100] text-white shadow-[0_10px_30px_rgba(230,81,0,0.4)] flex items-center justify-center hover:bg-[#4A0404] transition-colors relative group"
      >
        <MessageSquare size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2E7D32] border-2 border-[#FFF8E1] rounded-full animate-pulse"></span>
      </motion.button>
    </div>
  );
};

export default AIAssistant;
