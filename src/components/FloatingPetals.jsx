import React from 'react';
import { motion } from 'framer-motion';

const FloatingPetals = () => {
  const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼'];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: 0,
          }}
          animate={{
            y: -50,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: 'linear',
          }}
        >
          {petals[Math.floor(Math.random() * petals.length)]}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;