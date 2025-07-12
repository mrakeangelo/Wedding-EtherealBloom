import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingPetals = () => {
  const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼'];
  
  // Memoize petal configurations to prevent re-renders
  const petalConfigs = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      id: i,
      emoji: petals[Math.floor(Math.random() * petals.length)],
      initialX: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 25 + Math.random() * 10,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petalConfigs.map((config) => (
        <motion.div
          key={config.id}
          className="absolute text-lg opacity-20 floating-element"
          initial={{
            x: `${config.initialX}vw`,
            y: '110vh',
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            rotate: 360,
            x: `${config.initialX + Math.sin(config.id) * 20}vw`,
          }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            delay: config.delay,
            ease: 'linear',
          }}
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          {config.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(FloatingPetals);