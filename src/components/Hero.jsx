import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';
import { format } from 'date-fns';

const Hero = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentPetal, setCurrentPetal] = useState(0);

  const petals = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPetal((prev) => (prev + 1) % petals.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const weddingDate = new Date(weddingData.wedding.date);
  const formattedDate = format(weddingDate, 'MMMM do, yyyy');

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blush-50 via-ivory-50 to-sage-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40 dark:from-transparent dark:via-black/20 dark:to-black/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30"
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
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          >
            {petals[Math.floor(Math.random() * petals.length)]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {petals[currentPetal]}
            </motion.span>
          </motion.div>

          {/* Couple Names */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
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
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center justify-center space-x-4 my-8"
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-blush-400" />
            <div className="text-2xl">🌿</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-blush-400" />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.7 }}
            className="text-lg md:text-xl font-serif italic text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            "Love is the bridge between two hearts, 
            <br />
            blooming eternal in the garden of forever."
          </motion.blockquote>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blush-400 dark:text-blush-300"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-current rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;