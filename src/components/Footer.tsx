'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/social-links')
      .then(res => res.json())
      .then(data => setSocialLinks(Array.isArray(data) ? data : []));
  }, []);

  const iconMap: any = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
    whatsapp: MessageCircle,
  };

  const brandColors: any = {
    github: 'bg-[#181717] hover:bg-[#2b2b2b]',
    linkedin: 'bg-[#0A66C2] hover:bg-[#004182]',
    instagram: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
    facebook: 'bg-[#1877F2] hover:bg-[#0C63D4]',
    whatsapp: 'bg-[#25D366] hover:bg-[#1EBE57]',
  };

  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Icons - Mobile Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="sm:hidden flex flex-wrap justify-center gap-2 mb-6"
        >
          {socialLinks.map((link) => {
            const Icon = iconMap[link.platform.toLowerCase()] || Github;
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className={`p-2.5 rounded-xl ${brandColors[link.platform.toLowerCase()]} text-white shadow-md transition-all duration-200`}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
          
          {/* Phone Icon */}
          <motion.a
            href="tel:+919360004968"
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-md transition-all duration-200"
          >
            <Phone size={18} />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            © 2025. All Rights Reserved. Developed by{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              SURYA KUMAR
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
