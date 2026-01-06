
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

const Cursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Velocity hooks for squash/stretch effect
  const mouseXVelocity = useVelocity(mouseX);
  const mouseYVelocity = useVelocity(mouseY);

  // Transform velocity into scale values (stretch when moving fast)
  const scaleX = useTransform(mouseXVelocity, [-1000, 0, 1000], [1.2, 1, 1.2]);
  const scaleY = useTransform(mouseYVelocity, [-1000, 0, 1000], [0.8, 1, 0.8]);

  // Spring configs for that "heavy liquid" feel
  // Damping high to prevent oscillation, Mass high for "weight"
  const springConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const trailSpringConfig = { damping: 40, stiffness: 150, mass: 1.2 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const trailX = useSpring(mouseX, trailSpringConfig);
  const trailY = useSpring(mouseY, trailSpringConfig);

  const [hoverState, setHoverState] = useState<'none' | 'small' | 'large'>('none');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"], .group')) {
        setHoverState('large');
      } else if (target.classList.contains('clickable-area')) {
        setHoverState('small');
      } else {
        setHoverState('none');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block overflow-hidden">
      {/* Liquid Trail - The "Body" of the liquid */}
      <motion.div
        className="absolute w-12 h-12 rounded-full blur-[20px] opacity-30"
        style={{
          x: trailX,
          y: trailY,
          scaleX: scaleX, // Squash and stretch based on velocity
          scaleY: scaleY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#E65100', // Saffron color
        }}
      />

      {/* Secondary Trail Layer for depth */}
      <motion.div
        className="absolute w-8 h-8 rounded-full blur-[10px] opacity-40"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#FFD700', // Gold core
        }}
      />

      {/* Main Cursor Core - The "Head" */}
      <motion.div
        className="absolute w-4 h-4 rounded-full border border-[#FFD700] mix-blend-difference z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : hoverState === 'large' ? 3.5 : hoverState === 'small' ? 2 : 1,
          backgroundColor: hoverState === 'large' ? 'rgba(230, 81, 0, 0.2)' : 'rgba(255, 215, 0, 0)',
          borderColor: isClicking ? '#E65100' : '#FFD700',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Center Dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-[#E65100] rounded-full shadow-[0_0_10px_#E65100]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverState !== 'none' ? 0 : 1,
        }}
      />

      {/* Click Ripple Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute w-12 h-12 rounded-full border border-[#E65100]"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cursor;
