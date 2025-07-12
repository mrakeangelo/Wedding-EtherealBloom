import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FlowerMeanings = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const flowers = [
    {
      name: 'Roses',
      emoji: '🌹',
      meaning: 'Deep love and passion',
      color: 'blush',
      description: 'The classic symbol of romantic love, representing the depth of our commitment.'
    },
    {
      name: 'Peonies',
      emoji: '🌸',
      meaning: 'Honor and wealth',
      color: 'sage',
      description: 'Symbolizing a happy marriage and good fortune in our new life together.'
    },
    {
      name: 'Baby\'s Breath',
      emoji: '🤍',
      meaning: 'Everlasting love',
      color: 'ivory',
      description: 'Representing the eternal nature of our bond and pure intentions.'
    },
    {
      name: 'Lavender',
      emoji: '💜',
      meaning: 'Devotion and serenity',
      color: 'lilac',
      description: 'For the calm and peaceful life we wish to build together.'
    },
    {
      name: 'Eucalyptus',
      emoji: '🌿',
      meaning: 'Protection and healing',
      color: 'sage',
      description: 'Blessing our union with strength and the healing power of love.'
    },
    {
      name: 'Sunflowers',
      emoji: '🌻',
      meaning: 'Adoration and loyalty',
      color: 'gold',
      description: 'Like sunflowers follow the sun, we follow each other through life.'
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-sage-50 to-ivory-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Language of Flowers
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-sage-400" />
            <div className="text-2xl">🌺</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-sage-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            Each bloom in our garden wedding carries a special meaning, 
            telling the story of our love through nature's poetry
          </p>
        </motion.div>

        {/* Flowers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flowers.map((flower, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`p-8 rounded-2xl glass backdrop-blur-sm border-2 border-${flower.color}-200 dark:border-${flower.color}-800 hover:shadow-xl transition-all duration-300 h-full`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-repeat"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${flower.color === 'blush' ? 'f472b6' : flower.color === 'sage' ? '5cb85c' : flower.color === 'ivory' ? 'f59e0b' : flower.color === 'lilac' ? 'a855f7' : 'f59e0b'}' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Flower Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="text-6xl mb-6 text-center relative z-10"
                >
                  <motion.span
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {flower.emoji}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {flower.name}
                  </h3>
                  <p className={`text-lg font-medium text-${flower.color}-600 dark:text-${flower.color}-400 mb-4`}>
                    {flower.meaning}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {flower.description}
                  </p>
                </div>

                {/* Floating Petals on Hover */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-sm opacity-0 group-hover:opacity-60"
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
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'linear',
                      }}
                    >
                      {flower.emoji}
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${flower.color}-400/10 to-${flower.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl text-blush-200 dark:text-blush-800 opacity-50">
                "
              </div>
              <blockquote className="text-lg md:text-xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
                In the garden of love, every flower speaks a thousand words, 
                and every bloom tells our story of eternal devotion.
              </blockquote>
              <div className="absolute -bottom-4 -right-4 text-6xl text-blush-200 dark:text-blush-800 opacity-50 rotate-180">
                "
              </div>
            </div>
            <div className="mt-4 text-2xl">🌺</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlowerMeanings;