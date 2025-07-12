import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';
import { format, differenceInDays } from 'date-fns';

const VowReveal = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [daysUntilReveal, setDaysUntilReveal] = useState(0);

  useEffect(() => {
    const weddingDate = new Date(weddingData.wedding.date);
    const today = new Date();
    const daysBefore = new Date(weddingDate);
    daysBefore.setDate(daysBefore.getDate() - 1); // Day before wedding

    const daysLeft = differenceInDays(daysBefore, today);
    setDaysUntilReveal(daysLeft);

    // Unlock if it's the day before or day of wedding
    if (daysLeft <= 0) {
      setIsUnlocked(true);
    }
  }, [weddingData.wedding.date]);

  const handleUnlock = () => {
    // For demo purposes, allow manual unlock
    setIsUnlocked(true);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blush-50 via-ivory-50 to-sage-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Our Sacred Vows
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <div className="text-2xl">💍</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            {isUnlocked 
              ? "The promises we make to each other, from our hearts to yours"
              : "A special surprise that will be revealed the day before our wedding"
            }
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass rounded-2xl p-12 text-center"
            >
              {/* Lock Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-8xl mb-8"
              >
                🔒
              </motion.div>

              <h3 className="font-script text-3xl text-blush-600 dark:text-blush-400 mb-6">
                Coming Soon...
              </h3>

              {daysUntilReveal > 0 ? (
                <div className="space-y-4">
                  <p className="text-xl font-serif text-gray-700 dark:text-gray-300">
                    Our heartfelt vows will be revealed in
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl font-bold text-gold-600 dark:text-gold-400"
                  >
                    {daysUntilReveal} day{daysUntilReveal !== 1 ? 's' : ''}
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400">
                    A special surprise for the day before our wedding
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xl font-serif text-gray-700 dark:text-gray-300">
                    The time has come to share our hearts with you
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUnlock}
                    className="px-8 py-4 bg-gradient-to-r from-gold-500 to-blush-500 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-blush-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Reveal Our Vows ✨
                  </motion.button>
                </div>
              )}

              {/* Floating Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl opacity-20"
                    initial={{
                      x: Math.random() * 100 + '%',
                      y: Math.random() * 100 + '%',
                      rotate: 0,
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: Math.random() * 5,
                      ease: 'linear',
                    }}
                  >
                    💫
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              {/* Bride's Vows */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blush-100 dark:bg-blush-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">👰‍♀️</span>
                  </div>
                  <div>
                    <h3 className="font-script text-2xl text-blush-600 dark:text-blush-400">
                      {weddingData.couple.bride}'s Vows
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      To my beloved {weddingData.couple.groom}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-blush-200 dark:text-blush-800 opacity-30">
                    "
                  </div>
                  <p className="text-lg font-serif text-gray-700 dark:text-gray-300 leading-relaxed pl-8 pr-8 relative z-10">
                    {weddingData.vows.bride}
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-6xl text-blush-200 dark:text-blush-800 opacity-30 rotate-180">
                    "
                  </div>
                </div>

                {/* Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-lg opacity-20"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: '100%',
                        rotate: 0,
                      }}
                      animate={{
                        y: '-10%',
                        rotate: 360,
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: 'linear',
                      }}
                    >
                      💕
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Groom's Vows */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">🤵‍♂️</span>
                  </div>
                  <div>
                    <h3 className="font-script text-2xl text-sage-600 dark:text-sage-400">
                      {weddingData.couple.groom}'s Vows
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      To my beloved {weddingData.couple.bride}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-sage-200 dark:text-sage-800 opacity-30">
                    "
                  </div>
                  <p className="text-lg font-serif text-gray-700 dark:text-gray-300 leading-relaxed pl-8 pr-8 relative z-10">
                    {weddingData.vows.groom}
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-6xl text-sage-200 dark:text-sage-800 opacity-30 rotate-180">
                    "
                  </div>
                </div>

                {/* Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-lg opacity-20"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: '100%',
                        rotate: 0,
                      }}
                      animate={{
                        y: '-10%',
                        rotate: 360,
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: 'linear',
                      }}
                    >
                      💖
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Closing Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-center"
              >
                <div className="glass rounded-2xl p-8">
                  <div className="text-4xl mb-4">💍</div>
                  <p className="text-lg font-serif text-gray-700 dark:text-gray-300 italic">
                    "Two hearts, one soul, forever intertwined in love's eternal dance"
                  </p>
                  <div className="mt-4 text-2xl">🌸</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VowReveal;