import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';

const OurStory = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const storyBlocks = [
    {
      title: 'How We Met',
      content: weddingData.story.content,
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&q=80',
      side: 'left'
    },
    {
      title: 'The Proposal',
      content: weddingData.story.engagement,
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80',
      side: 'right'
    },
    {
      title: 'Our Future',
      content: 'Now we begin our greatest adventure together, building a life filled with love, laughter, and endless spring mornings. Every day with you feels like a beautiful beginning.',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
      side: 'left'
    }
  ];

  return (
    <section id="story" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Our Love Story
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-blush-400" />
            <div className="text-2xl">💕</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-blush-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            Every love story is beautiful, but ours is our favorite
          </p>
        </motion.div>

        {/* Story Blocks */}
        <div className="space-y-20">
          {storyBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.3 }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                block.side === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Floating Petals */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-lg opacity-60"
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
                          duration: 8 + Math.random() * 4,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                          ease: 'linear',
                        }}
                      >
                        🌸
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: block.side === 'right' ? 50 : -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1, delay: index * 0.3 + 0.2 }}
                  className="relative"
                >
                  <h3 className="font-script text-3xl md:text-4xl text-blush-600 dark:text-blush-400 mb-4">
                    {block.title}
                  </h3>
                  
                  <div className="absolute -top-4 -left-4 text-6xl text-blush-200 dark:text-blush-800 opacity-50">
                    "
                  </div>
                  
                  <p className="text-lg font-serif text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
                    {block.content}
                  </p>
                  
                  <div className="absolute -bottom-4 -right-4 text-6xl text-blush-200 dark:text-blush-800 opacity-50 rotate-180">
                    "
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-12 h-px bg-gradient-to-r from-blush-400 to-transparent" />
                  <div className="text-blush-400">🌿</div>
                  <div className="w-12 h-px bg-gradient-to-l from-blush-400 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;