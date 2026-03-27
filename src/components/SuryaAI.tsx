'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Cpu, Mic, MicOff, StopCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

const quickPrompts = [
  "Show Surya's top skills",
  "What projects has he built?",
  "Tell me about his experience",
  "How to contact Surya?",
];

export default function SuryaAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi, I'm SURYA.AI 👋\n\nYour AI assistant to explore Surya's portfolio. Ask me anything — or tap the mic to speak!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Chat history for context (last 6 turns)
  const historyRef = useRef<{ role: string; parts: { text: string }[] }[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check voice support
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setVoiceSupported(true);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessageWithLinks = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-100 underline font-medium break-all">
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // ── STREAMING SEND ──────────────────────────────────────────────
  const handleSend = useCallback(async (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Add empty assistant message that we'll stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);

    // Build history snapshot
    const history = historyRef.current.slice(-6);

    try {
      abortRef.current = new AbortController();

      const res = await fetch('/api/surya-ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // Update the last (streaming) message
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: fullText, streaming: true };
          return updated;
        });
      }

      // Mark streaming done
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: fullText, streaming: false };
        return updated;
      });

      // Save to history
      historyRef.current.push(
        { role: 'user', parts: [{ text: userMessage }] },
        { role: 'model', parts: [{ text: fullText }] }
      );
      if (historyRef.current.length > 12) historyRef.current.splice(0, 2);

    } catch (err: any) {
      if (err.name === 'AbortError') {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], streaming: false };
          return updated;
        });
      } else {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: "Sorry, I'm having trouble connecting right now. Please try again!",
            streaming: false,
          };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading]);

  const handleStop = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  // ── VOICE INPUT ─────────────────────────────────────────────────
  const toggleVoice = useCallback(() => {
    if (!voiceSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // supports Tamil-accented English + Hindi
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-send if we got something
      setInput(prev => {
        if (prev.trim()) {
          setTimeout(() => handleSend(prev.trim()), 100);
        }
        return '';
      });
    };

    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [isListening, voiceSupported, handleSend]);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl backdrop-blur-2xl bg-gradient-to-br from-slate-700/30 via-gray-600/30 to-zinc-700/30 border border-gray-400/50 text-white shadow-2xl flex items-center justify-center transition-all relative"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50,
          boxShadow: '0 10px 40px rgba(100, 116, 139, 0.6), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.2)',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.path d="M20,20 L80,20 L80,80 L20,80 Z M50,20 L50,80 M20,50 L80,50"
              stroke="currentColor" strokeWidth="1" fill="none"
              animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} />
          </svg>
        </div>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative z-10">
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="relative z-10">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                <Cpu size={22} />
              </motion.div>
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
            className={`fixed z-50 shadow-2xl overflow-hidden backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-2 border-white/30 dark:border-gray-700/50 flex flex-col ${
              isMobile ? 'inset-x-4 bottom-20 rounded-2xl max-h-[75vh]' : 'bottom-24 right-6 w-96 rounded-2xl'
            }`}
            style={{
              height: isMobile ? 'auto' : '560px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {/* Header */}
            <div className="relative p-4 backdrop-blur-xl bg-gradient-to-r from-slate-700/90 via-gray-700/90 to-zinc-700/90 text-white border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                    <Cpu size={20} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-base flex items-center gap-2">
                      SURYA.AI
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <Sparkles size={14} />
                      </motion.div>
                    </h3>
                    <p className="text-xs opacity-80 flex items-center gap-1">
                      AI Assistant
                      {voiceSupported && <span className="text-green-300">• Voice ready 🎤</span>}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-4 space-y-3 backdrop-blur-xl bg-gray-50/50 dark:bg-gray-800/50 flex-1">
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl backdrop-blur-xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-slate-700/90 to-gray-700/90 text-white shadow-lg border border-white/20'
                      : 'bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 border border-gray-200/50 dark:border-gray-600/50 shadow-md'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {renderMessageWithLinks(msg.content)}
                      {msg.streaming && (
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-current ml-0.5 align-middle" />
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Thinking dots — only when loading but no streaming message yet */}
              {isLoading && messages[messages.length - 1]?.content === '' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-xl px-4 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-600/50 shadow-md">
                    <div className="flex gap-1.5">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div key={i} animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                          className="w-2 h-2 bg-slate-600 dark:bg-gray-400 rounded-full" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && !isLoading && (
              <div className="px-3 py-2 border-t border-white/20 dark:border-gray-700/50 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60">
                <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-1.5 font-medium">✨ Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickPrompts.map((prompt, idx) => (
                    <motion.button key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(prompt)}
                      className="text-[10px] px-2 py-0.5 backdrop-blur-xl bg-gray-100/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 rounded-md border border-gray-300/50 dark:border-gray-600/50 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all shadow-sm">
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-white/20 dark:border-gray-700/50 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60">
              {/* Voice listening indicator */}
              {isListening && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mb-2 flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-400/30 rounded-lg">
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-xs text-red-500 font-medium">Listening... speak now</span>
                </motion.div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                  placeholder={isListening ? 'Listening...' : 'Type or tap mic to speak...'}
                  disabled={isLoading || isListening}
                  className="flex-1 px-3 py-2 rounded-lg backdrop-blur-xl bg-gray-100/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:border-slate-500/50 focus:ring-2 focus:ring-slate-500/20 transition-all disabled:opacity-50 text-sm shadow-sm"
                />

                {/* Voice button */}
                {voiceSupported && (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={toggleVoice}
                    disabled={isLoading}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-lg border ${
                      isListening
                        ? 'bg-red-500 border-red-400 text-white animate-pulse'
                        : 'backdrop-blur-xl bg-gray-200/70 dark:bg-gray-700/70 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </motion.button>
                )}

                {/* Stop / Send button */}
                {isLoading ? (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleStop}
                    className="w-10 h-10 rounded-lg bg-red-500/80 text-white flex items-center justify-center shadow-lg border border-red-400/50">
                    <StopCircle size={16} />
                  </motion.button>
                ) : (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-lg backdrop-blur-xl bg-gradient-to-br from-slate-700/90 to-gray-700/90 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-white/20"
                    style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <Send size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
