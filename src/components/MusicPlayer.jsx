import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMusic, FiPlay, FiPause, FiVolume2, FiVolumeX } = FiIcons;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  // Simulated audio control (in real app, you'd use actual audio files)
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Music Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={toggleVisibility}
        className="fixed top-20 right-4 z-40 w-12 h-12 bg-blush-500 hover:bg-blush-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
      >
        <SafeIcon icon={FiMusic} className="w-5 h-5" />
      </motion.button>

      {/* Music Player Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 z-30 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                  Garden Serenade
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Ambient Wedding Music
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isPlaying 
                      ? 'bg-sage-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isMuted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Visual Indicator */}
            {isPlaying && (
              <div className="mt-3 flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-sage-500 rounded-full"
                    animate={{
                      height: [4, 16, 4],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Note: In a real implementation, you would include actual audio elements */}
            <audio
              ref={audioRef}
              loop
              preload="none"
              className="hidden"
            >
              {/* Add your audio sources here */}
              <source src="/path/to/wedding-music.mp3" type="audio/mpeg" />
            </audio>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;