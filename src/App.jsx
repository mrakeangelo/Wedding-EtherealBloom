import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeddingProvider } from './contexts/WeddingContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import WeddingDetails from './components/WeddingDetails';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import BridalParty from './components/BridalParty';
import RSVP from './components/RSVP';
import Guestbook from './components/Guestbook';
import Countdown from './components/Countdown';
import FlowerMeanings from './components/FlowerMeanings';
import VowReveal from './components/VowReveal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import FloatingPetals from './components/FloatingPetals';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blush-50 to-sage-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-3 border-blush-200 border-t-blush-500 rounded-full mx-auto mb-4"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl">🌸</div>
            </div>
          </div>
          <h2 className="font-script text-2xl text-blush-600 dark:text-blush-400 mb-2">
            Ethereal Bloom
          </h2>
          <p className="text-sage-600 dark:text-sage-400 font-serif text-sm">
            Loading your magical day...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WeddingProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-ivory-50 via-blush-50 to-sage-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 bg-transition">
            <FloatingPetals />
            <MusicPlayer />
            <Navigation />
            
            <AnimatePresence mode="wait">
              <Routes>
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="hardware-accelerated"
                    >
                      <Hero />
                      <OurStory />
                      <WeddingDetails />
                      <Timeline />
                      <Countdown />
                      <Gallery />
                      <BridalParty />
                      <RSVP />
                      <Guestbook />
                      <FlowerMeanings />
                      <VowReveal />
                    </motion.div>
                  }
                />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </AnimatePresence>
            
            <Footer />
          </div>
        </Router>
      </WeddingProvider>
    </ThemeProvider>
  );
}

export default App;