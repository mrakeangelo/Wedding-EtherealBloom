import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiMusic, FiGift, FiCamera, FiStar } = FiIcons;

const Timeline = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const timelineEvents = [
    {
      time: '3:30 PM',
      title: 'Guest Arrival',
      description: 'Welcome drinks and garden mingling',
      icon: FiGift,
      color: 'blush'
    },
    {
      time: '4:00 PM',
      title: 'Ceremony',
      description: 'Exchange of vows in the Rose Garden',
      icon: FiHeart,
      color: 'sage'
    },
    {
      time: '4:30 PM',
      title: 'Cocktail Hour',
      description: 'Celebration drinks and photography',
      icon: FiCamera,
      color: 'lilac'
    },
    {
      time: '6:00 PM',
      title: 'Reception Dinner',
      description: 'Garden feast under the stars',
      icon: FiStar,
      color: 'peach'
    },
    {
      time: '8:00 PM',
      title: 'Dancing',
      description: 'First dance and celebration',
      icon: FiMusic,
      color: 'gold'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Garden Timeline
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-blush-400" />
            <div className="text-2xl">⏰</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-blush-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            A day of love, laughter, and magical moments
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blush-400 via-sage-400 to-gold-400 rounded-full" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl glass backdrop-blur-sm border-2 border-${event.color}-200 dark:border-${event.color}-800 hover:shadow-xl transition-all duration-300 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                        <span className={`text-2xl font-serif font-bold text-${event.color}-600 dark:text-${event.color}-400`}>
                          {event.time}
                        </span>
                      </div>
                      <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                        <div className={`w-12 h-12 rounded-full bg-${event.color}-100 dark:bg-${event.color}-900 flex items-center justify-center`}>
                          <SafeIcon 
                            icon={event.icon} 
                            className={`w-6 h-6 text-${event.color}-600 dark:text-${event.color}-400`} 
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Circle */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className={`w-6 h-6 rounded-full bg-${event.color}-500 border-4 border-white dark:border-gray-900 shadow-lg`}
                  />
                  
                  {/* Floating petals around the circle */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-sm opacity-60"
                        initial={{
                          x: 0,
                          y: 0,
                          rotate: 0,
                        }}
                        animate={{
                          x: [0, 15, -15, 0],
                          y: [0, -15, 15, 0],
                          rotate: [0, 120, 240, 360],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          delay: i * 2,
                          ease: 'linear',
                        }}
                        style={{
                          left: `${Math.cos(i * 120 * Math.PI / 180) * 20}px`,
                          top: `${Math.sin(i * 120 * Math.PI / 180) * 20}px`,
                        }}
                      >
                        🌸
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;