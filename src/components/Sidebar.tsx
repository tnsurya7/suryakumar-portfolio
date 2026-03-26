'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, color: 'from-blue-500 to-blue-600' },
  { id: 'about', label: 'About', icon: User, color: 'from-purple-500 to-purple-600' },
  { id: 'skills', label: 'Skills', icon: Code, color: 'from-pink-500 to-pink-600' },
  { id: 'projects', label: 'Projects', icon: Briefcase, color: 'from-green-500 to-green-600' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'from-orange-500 to-orange-600' },
];

function DockIcon({ item, isActive, onClick, mouseX }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const Icon = item.icon;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 64, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{ width }}
      className="relative group aspect-square"
    >
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isActive
            ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
            : 'bg-white/40 dark:bg-gray-800/40 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 shadow-md'
        }`}
      >
        <Icon className="w-1/2 h-1/2" strokeWidth={2.5} />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900/95 dark:bg-white/95 text-white dark:text-gray-900 text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm shadow-xl">
        {item.label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900/95 dark:border-t-white/95" />
      </div>
    </motion.button>
  );
}

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Dock Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="hidden sm:flex fixed top-6 left-0 right-0 z-50 justify-center px-4"
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="relative"
        >
          {/* Liquid Glass Container with Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/30 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/30 rounded-[2.5rem] blur-xl" />
          
          {/* Main Dock Container */}
          <div className="relative flex items-center gap-3 px-5 py-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-gray-700/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
            
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative w-12 h-12 rounded-[1.2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0"
            >
              SK
            </motion.div>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400/50 dark:via-gray-600/50 to-transparent" />

            {/* Navigation Items */}
            <div className="flex items-center gap-2">
              {menuItems.map((item) => (
                <DockIcon
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                  mouseX={mouseX}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400/50 dark:via-gray-600/50 to-transparent" />

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative w-12 h-12 rounded-[1.2rem] bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20" />
                {theme === 'dark' ? <Sun size={24} className="relative z-10" strokeWidth={2.5} /> : <Moon size={24} className="relative z-10" strokeWidth={2.5} />}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Dock Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="sm:hidden fixed top-3 left-0 right-0 z-50 flex justify-center px-3"
      >
        <div className="relative w-full max-w-md">
          {/* Liquid Glass Container with Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/30 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/30 rounded-[1.5rem] blur-xl" />
          
          {/* Main Dock Container */}
          <div className="relative flex items-center justify-between gap-3 px-4 py-2.5 bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[1.5rem] border border-white/40 dark:border-gray-700/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
            
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
            
            {/* Logo + Name */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0"
              >
                SK
              </motion.div>
              
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent truncate">
                Surya Kumar
              </span>
            </div>

            {/* Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md flex-shrink-0"
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="sm:hidden fixed top-20 left-3 right-3 z-50"
            >
              <div className="relative max-w-md mx-auto">
                {/* Liquid Glass Container */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/30 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/30 rounded-3xl blur-xl" />
                
                <div className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-2xl p-4">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />
                  
                  <div className="relative space-y-2">
                    {/* Navigation Items */}
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      
                      return (
                        <motion.button
                          key={item.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                            isActive
                              ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
                              : 'bg-white/40 dark:bg-gray-800/40 backdrop-blur-md text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <Icon size={20} strokeWidth={2.5} />
                          <span className="font-semibold">{item.label}</span>
                        </motion.button>
                      );
                    })}
                    
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-400/50 dark:via-gray-600/50 to-transparent my-2" />
                    
                    {/* Theme Toggle */}
                    {mounted && (
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setTheme(theme === 'dark' ? 'light' : 'dark');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 text-white shadow-lg"
                      >
                        {theme === 'dark' ? (
                          <>
                            <Sun size={20} strokeWidth={2.5} />
                            <span className="font-semibold">Light Mode</span>
                          </>
                        ) : (
                          <>
                            <Moon size={20} strokeWidth={2.5} />
                            <span className="font-semibold">Dark Mode</span>
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
