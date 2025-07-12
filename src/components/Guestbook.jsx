import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWedding } from '../contexts/WeddingContext';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiHeart, FiSend } = FiIcons;

const Guestbook = () => {
  const { weddingData, addGuestbookEntry } = useWedding();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.message.trim()) {
      addGuestbookEntry(formData);
      setFormData({ name: '', message: '' });
      setIsSubmitted(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="guestbook" ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-blush-600 dark:text-blush-400 mb-4">
            Leave a Blessing
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-blush-400" />
            <div className="text-2xl">📖</div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-blush-400" />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-serif">
            Share your love, wishes, and blessings for our new journey together
          </p>
        </motion.div>

        {/* Guestbook Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-sage-100 dark:bg-sage-900/20 border border-sage-300 dark:border-sage-700 rounded-xl text-center"
              >
                <div className="text-2xl mb-2">🌸</div>
                <p className="text-sage-700 dark:text-sage-300 font-medium">
                  Thank you for your beautiful blessing!
                </p>
              </motion.div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-800 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Blessing
                </label>
                <div className="relative">
                  <SafeIcon icon={FiHeart} className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-800 transition-all duration-300 resize-none"
                    placeholder="Share your heartfelt wishes, memories, or blessings for Isabella and Alexander..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blush-500 to-sage-500 text-white font-semibold rounded-xl hover:from-blush-600 hover:to-sage-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiSend} className="w-5 h-5" />
                <span>Send Blessing</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Guestbook Entries */}
        <div className="space-y-6">
          <h3 className="font-script text-2xl text-blush-600 dark:text-blush-400 text-center mb-8">
            Blessings from Our Loved Ones
          </h3>
          
          {weddingData.guestbook.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">🌸</div>
              <p className="text-gray-600 dark:text-gray-400 font-serif">
                Be the first to leave a blessing for the happy couple!
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {weddingData.guestbook.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 relative overflow-hidden"
                >
                  {/* Floating Petals */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
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
                          duration: 8,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                          ease: 'linear',
                        }}
                      >
                        🌸
                      </motion.div>
                    ))}
                  </div>

                  {/* Entry Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blush-100 dark:bg-blush-900 rounded-full flex items-center justify-center">
                          <span className="text-lg">💕</span>
                        </div>
                        <div>
                          <h4 className="font-serif font-semibold text-gray-800 dark:text-gray-200">
                            {entry.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl opacity-30">💌</div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-3xl text-blush-200 dark:text-blush-800 opacity-50">
                        "
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-serif leading-relaxed pl-4">
                        {entry.message}
                      </p>
                      <div className="absolute -bottom-2 -right-2 text-3xl text-blush-200 dark:text-blush-800 opacity-50 rotate-180">
                        "
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;