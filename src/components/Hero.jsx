import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';
import { format } from 'date-fns';

const Hero = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentPetal, setCurrentPetal] = useState(0);
  
  const petals = useMemo(() => ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼'], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetal((prev) => (prev + 1) % petals.length);
    }, 3000); // Slower transition

    return () => clearInterval(interval);
  }, [petals.length]);

  const weddingDate = new Date(weddingData.wedding.date);
  const formattedDate = format(weddingDate, 'MMMM do, yyyy');

  // Smooth animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blush-50 via-ivory-50 to-sage-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 hardware-accelerated"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-20 dark:opacity-10 hardware-accelerated"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 dark:from-transparent dark:via-black/20 dark:to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Decorative Element */}
          <motion.div
            variants={itemVariants}
            className="text-6xl mb-8"
          >
            <motion.span
              key={currentPetal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {petals[currentPetal]}
            </motion.span>
          </motion.div>

          {/* Couple Names */}
          <motion.h1
            variants={itemVariants}
            className="font-script text-5xl md:text-7xl lg:text-8xl text-blush-600 dark:text-blush-400 mb-4"
          >
            <span className="block">{weddingData.couple.bride}</span>
            <span className="text-3xl md:text-4xl lg:text-5xl text-sage-600 dark:text-sage-400 font-serif italic">
              &
            </span>
            <span className="block">{weddingData.couple.groom}</span>
          </motion.h1>

          {/* Wedding Date */}
          <motion.div
            variants={itemVariants}
            className="space-y-2"
          >
            <p className="text-xl md:text-2xl font-serif text-gray-700 dark:text-gray-200">
              are getting married
            </p>
            <p className="text-2xl md:text-3xl font-serif font-semibold text-gold-600 dark:text-gold-400">
              {formattedDate}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="space-y-1"
          >
            <p className="text-lg md:text-xl font-serif text-gray-600 dark:text-gray-300">
              {weddingData.wedding.venue}
            </p>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
              {weddingData.wedding.location}
            </p>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-4 my-8"
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-blush-400" />
            <div className="text-2xl">🌿</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-blush-400" />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={itemVariants}
            className="text-lg md:text-xl font-serif italic text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            "Love is the bridge between two hearts,<br />
            blooming eternal in the garden of forever."
          </motion.blockquote>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-blush-400 dark:text-blush-300"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-current rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);