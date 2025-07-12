import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';

const BridalParty = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="party" ref={ref} className="py-20 bg-gradient-to-br from-sage-50 to-ivory-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Our Bridal Party
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-sage-400" />
            <div className="text-2xl">👰‍♀️</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-sage-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            The wonderful people who will stand by our side
          </p>
        </motion.div>

        {/* Bridal Party Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {weddingData.bridalParty.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-xl font-semibold mb-1">
                    {person.name}
                  </h3>
                  <p className="text-blush-300 font-medium mb-1">
                    {person.role}
                  </p>
                  <p className="text-sm text-gray-300">
                    {person.relationship}
                  </p>
                </div>

                {/* Hover Effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Floating Hearts */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-lg text-blush-400 opacity-60"
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
                      💕
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blush-400 rounded-2xl transition-colors duration-300" />
              </div>

              {/* Role Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
              >
                <div className={`px-4 py-1 rounded-full text-xs font-medium ${
                  person.role.includes('Maid') || person.role.includes('Bridesmaid')
                    ? 'bg-blush-500 text-white'
                    : 'bg-sage-500 text-white'
                }`}>
                  {person.role}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-script text-2xl text-blush-600 dark:text-blush-400 mb-4">
              Thank You
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
              To our dearest friends and family who have agreed to stand beside us on our special day. 
              Your love, support, and friendship mean the world to us. We are so grateful to have you 
              as part of our love story and can't wait to celebrate with you in our garden of dreams.
            </p>
            <div className="mt-4 text-2xl">💐</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BridalParty;