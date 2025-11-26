'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function ViewCounter() {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Increment view count
    const incrementView = async () => {
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
        });
        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error('Failed to increment view:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementView();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-2">
          <Eye size={18} className="text-primary-500 animate-pulse" />
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Loading...
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Eye size={18} className="text-primary-500" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">Views</span>
          <motion.span
            key={views}
            initial={{ scale: 1.5, color: '#3b82f6' }}
            animate={{ scale: 1, color: 'inherit' }}
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            {views.toLocaleString()}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
