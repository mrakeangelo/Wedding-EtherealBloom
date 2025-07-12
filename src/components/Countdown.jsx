import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';

const Countdown = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(weddingData.wedding.date);
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingData.wedding.date]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'blush' },
    { label: 'Hours', value: timeLeft.hours, color: 'sage' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'lilac' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'peach' }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blush-50 via-ivory-50 to-sage-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Until Forever Begins
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <div className="text-2xl">✨</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            Every moment brings us closer to our special day
          </p>
        </motion.div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl glass backdrop-blur-sm border-2 border-${unit.color}-200 dark:border-${unit.color}-800 text-center hover:shadow-xl transition-all duration-300`}
              >
                {/* Sparkle Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xs opacity-40"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        scale: 0,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>

                {/* Number */}
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-4xl md:text-5xl font-bold text-${unit.color}-600 dark:text-${unit.color}-400 mb-2 relative z-10`}
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>

                {/* Label */}
                <p className={`text-sm md:text-base font-serif text-${unit.color}-700 dark:text-${unit.color}-300 uppercase tracking-wide relative z-10`}>
                  {unit.label}
                </p>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 rounded-2xl">
                  <div
                    className="w-full h-full bg-repeat"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${unit.color === 'blush' ? 'f472b6' : unit.color === 'sage' ? '5cb85c' : unit.color === 'lilac' ? 'a855f7' : 'fb923c'}' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          {timeLeft.days > 0 ? (
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <motion.p
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl md:text-2xl font-script bg-gradient-to-r from-blush-600 via-gold-600 to-blush-600 bg-clip-text text-transparent bg-300% mb-4"
              >
                Our hearts are blooming with anticipation!
              </motion.p>
              <p className="text-gray-600 dark:text-gray-300 font-serif">
                Each passing moment brings us closer to the beginning of our forever
              </p>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-script text-gold-600 dark:text-gold-400 mb-4">
                  Today is the Day! 🌸
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-serif">
                  Our forever begins now
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;