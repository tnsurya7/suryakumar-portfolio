'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, X, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SetupNotice() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if MongoDB is configured by trying to fetch data
    fetch('/api/social-links')
      .then(res => res.json())
      .then(data => {
        if (data.error && data.message?.includes('MongoDB')) {
          setShow(true);
        }
      })
      .catch(() => {
        setShow(true);
      });

    // Check if user has dismissed the notice
    const isDismissed = localStorage.getItem('setup-notice-dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('setup-notice-dismissed', 'true');
  };

  if (!show || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full mx-4"
      >
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Database className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ MongoDB Setup Required
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                Your portfolio is running, but you need to setup MongoDB to store data.
              </p>
              <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-semibold">Quick Setup (5 minutes):</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Create free account at <a href="https://www.mongodb.com/cloud/atlas" target="_blank" rel="noopener noreferrer" className="underline font-semibold">MongoDB Atlas</a></li>
                  <li>Create a cluster (free tier)</li>
                  <li>Get your connection string</li>
                  <li>Update <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">.env.local</code> file</li>
                  <li>Visit <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">/api/init</code> to create admin user</li>
                </ol>
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href="/MONGODB_SETUP.md"
                  target="_blank"
                  className="text-xs px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
                >
                  📖 Setup Guide
                </a>
                <a
                  href="https://www.mongodb.com/cloud/atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
                >
                  🚀 Get MongoDB
                </a>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
            >
              <X size={20} className="text-yellow-600 dark:text-yellow-400" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
