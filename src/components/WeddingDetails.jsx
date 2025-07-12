import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiClock, FiMapPin, FiHeart } = FiIcons;

const WeddingDetails = () => {
  const { weddingData } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const weddingDate = new Date(weddingData.wedding.date);
  const formattedDate = format(weddingDate, 'EEEE, MMMM do, yyyy');
  const formattedTime = format(new Date(`2024-01-01T${weddingData.wedding.time}`), 'h:mm a');

  const details = [
    {
      icon: FiCalendar,
      title: 'Date',
      content: formattedDate,
      color: 'blush'
    },
    {
      icon: FiClock,
      title: 'Time',
      content: formattedTime,
      color: 'sage'
    },
    {
      icon: FiMapPin,
      title: 'Venue',
      content: weddingData.wedding.venue,
      subtitle: weddingData.wedding.location,
      color: 'lilac'
    },
    {
      icon: FiHeart,
      title: 'Ceremony',
      content: weddingData.wedding.ceremony,
      subtitle: weddingData.wedding.reception,
      color: 'peach'
    }
  ];

  return (
    <section id="details" ref={ref} className="py-20 bg-gradient-to-br from-sage-50 to-ivory-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Wedding Details
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-sage-400" />
            <div className="text-2xl">🌿</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-sage-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            Join us for a celebration of love in nature's embrace
          </p>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-2xl glass backdrop-blur-sm border-2 border-${detail.color}-200 dark:border-${detail.color}-800 hover:shadow-xl transition-all duration-300`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 rounded-2xl">
                <div
                  className="w-full h-full bg-repeat opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f472b6' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className={`w-16 h-16 rounded-full bg-${detail.color}-100 dark:bg-${detail.color}-900 flex items-center justify-center mb-6 mx-auto`}
              >
                <SafeIcon 
                  icon={detail.icon} 
                  className={`w-8 h-8 text-${detail.color}-600 dark:text-${detail.color}-400`} 
                />
              </motion.div>

              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {detail.title}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {detail.content}
                </p>
                {detail.subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {detail.subtitle}
                  </p>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 text-2xl opacity-30">
                {index === 0 && '🌸'}
                {index === 1 && '🕐'}
                {index === 2 && '🏛️'}
                {index === 3 && '💒'}
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${detail.color}-400/10 to-${detail.color}-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-script text-2xl text-blush-600 dark:text-blush-400 mb-4">
              Dress Code
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-serif mb-4">
              Garden Party Elegance
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We invite you to dress in soft, romantic colors that complement our garden setting. 
              Think flowing fabrics, floral patterns, and comfortable shoes for walking on grass. 
              Ladies, consider wearing low heels or flats. Gentlemen, light suits or slacks with dress shirts are perfect.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDetails;