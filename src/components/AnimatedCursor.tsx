'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap } from 'lucide-react';

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let trailId = 0;
    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setMousePosition({ x: newX, y: newY });
      
      // Add trail point
      setTrail(prev => [...prev.slice(-8), { x: newX, y: newY, id: trailId++ }]);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Trail Effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          initial={{ x: point.x, y: point.y, opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div 
            className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ 
              boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
            }}
          />
        </motion.div>
      ))}

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.3 : 1,
        }}
        transition={{ 
          scale: { duration: 0.1, ease: "easeOut" }
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute -inset-4"
          animate={{
            rotate: 360,
            scale: isPointer ? 1.2 : 1,
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.2 }
          }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400/50" 
            style={{ 
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.4)',
            }}
          />
        </motion.div>

        {/* Inner Glow */}
        <motion.div
          className="absolute -inset-2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-md" />
        </motion.div>

        {/* Code Icon */}
        <motion.div
          animate={{
            rotate: isClicking ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <Code2 
            className="text-cyan-400" 
            size={20}
            strokeWidth={2.5}
            style={{
              filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.8))',
            }}
          />
        </motion.div>

        {/* Zap Effect on Click */}
        {isClicking && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Zap className="text-yellow-400" size={20} fill="currentColor" />
          </motion.div>
        )}

        {/* Corner Particles */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * (isPointer ? 20 : 15),
              y: Math.sin((angle * Math.PI) / 180) * (isPointer ? 20 : 15),
              rotate: angle + (isPointer ? 360 : 0),
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              x: { duration: 0.2 },
              y: { duration: 0.2 },
            }}
          >
            <div className="w-1 h-1 rounded-full bg-cyan-400" 
              style={{ 
                boxShadow: '0 0 4px rgba(34, 211, 238, 0.8)',
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
