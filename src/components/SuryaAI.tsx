
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  "Show Surya's top skills",
  "Explain Online Petition Portal",
  "Tell me about his experience",
  "What projects has he built?",
];

export default function SuryaAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm SURYA.AI 👋\n\nYour AI assistant to explore Surya's portfolio. Ask me anything about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to render message with clickable links
  const renderMessageWithLinks = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-100 underline font-medium break-all"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/surya-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      // Check if response contains scroll command
      if (data.response.includes('scrollToSection(')) {
        const scrollMatch = data.response.match(/scrollToSection\("([^"]+)"\);/);
        if (scrollMatch) {
          const sectionId = scrollMatch[1];
          const cleanResponse = data.response.replace(/\n\nscrollToSection\("[^"]+"\);/, '');
          setMessages((prev) => [...prev, { role: 'assistant', content: cleanResponse }]);
          
          // Scroll to section after a short delay
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // Also scroll window to ensure visibility
              window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
              });
            }
          }, 800);
        }
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-2xl flex items-center justify-center transition-all"
        style={{
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="text-2xl font-bold">S</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 shadow-2xl overflow-hidden ${
              isMobile
                ? 'inset-x-0 bottom-0 rounded-t-3xl h-[85vh]'
                : 'bottom-24 right-6 w-96 h-[600px] rounded-3xl'
            }`}
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.95)), linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(139, 92, 246, 0.2)',
            }}
          >
            {/* Header */}
            <div className="relative p-4 text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-90" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                  >
                    <Bot size={20} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      SURYA.AI
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Sparkles size={16} />
                      </motion.div>
                    </h3>
                    <p className="text-xs opacity-90">AI Portfolio Assistant</p>
                  </div>
                </div>
                {isMobile && (
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className={`overflow-y-auto p-4 space-y-4 ${isMobile ? 'h-[calc(85vh-180px)]' : 'h-[400px]'}`}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl backdrop-blur-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/10 text-white border border-white/20 shadow-lg'
                    }`}
                    style={
                      msg.role === 'user'
                        ? { boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)' }
                        : { boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)' }
                    }
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {renderMessageWithLinks(msg.content)}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && !isLoading && (
              <div className="p-3 border-t border-white/10 backdrop-blur-sm">
                <p className="text-xs text-white/60 mb-2 font-medium">✨ Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(prompt)}
                      className="text-xs px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
