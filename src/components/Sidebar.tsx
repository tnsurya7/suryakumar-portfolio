'use client';

import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home, color: 'from-primary-500 to-primary-600' },
  { id: 'about', label: 'About', icon: User, color: 'from-secondary-500 to-secondary-600' },
  { id: 'skills', label: 'Skills', icon: Code, color: 'from-accent-500 to-accent-600' },
  { id: 'projects', label: 'Projects', icon: Briefcase, color: 'from-success-500 to-success-600' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'from-primary-500 via-accent-500 to-secondary-500' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 lg:hidden p-3 rounded-2xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 shadow-xl"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed left-0 top-0 h-screen w-20 lg:w-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-r border-white/20 dark:border-gray-800/20 z-40 flex flex-col items-center py-8 shadow-2xl overflow-hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="mb-12 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
        >
          SK
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={24} />
                </motion.div>

                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>


              </motion.button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        {mounted && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 flex items-center justify-center text-white shadow-lg"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        )}
      </motion.aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
