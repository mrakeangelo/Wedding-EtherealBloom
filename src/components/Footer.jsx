import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiMail, FiMapPin, FiPhone } = FiIcons;

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <footer ref={ref} className="bg-gradient-to-br from-blush-900 via-sage-900 to-lilac-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Wedding Info */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="font-script text-2xl text-blush-300 mb-2">
                Isabella & Alexander
              </h3>
              <p className="text-blush-200 font-serif">
                September 15, 2024
              </p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-sm text-blush-200 leading-relaxed"
            >
              Join us as we celebrate the beginning of our forever in the garden of love.
            </motion.p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-lg text-sage-300 mb-6"
            >
              Wedding Details
            </motion.h4>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-sage-400" />
                <span className="text-sm text-sage-200">
                  Enchanted Garden Estate, Napa Valley
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-sage-400" />
                <span className="text-sm text-sage-200">
                  hello@etherealbloom.com
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-sage-400" />
                <span className="text-sm text-sage-200">
                  (555) 123-4567
                </span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-lg text-lilac-300 mb-6"
            >
              Quick Links
            </motion.h4>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-3"
            >
              {['Our Story', 'Wedding Details', 'RSVP', 'Gallery', 'Guestbook'].map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '')}`}
                  whileHover={{ x: 5 }}
                  className="block text-sm text-lilac-200 hover:text-white transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center space-x-4 mb-8"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-blush-400" />
          <div className="text-2xl">🌿</div>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-blush-400" />
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-sm text-blush-200">Made with</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-400" />
            <span className="text-sm text-blush-200">for Isabella & Alexander</span>
          </div>
          
          <p className="text-xs text-blush-300 mb-2">
            Ethereal Bloom – A Garden Wedding Template by Mrake Agency
          </p>
          
          <p className="text-xs text-blush-400">
            © 2024 Ethereal Bloom. All rights reserved.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl opacity-10"
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
                duration: 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              🌸
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;