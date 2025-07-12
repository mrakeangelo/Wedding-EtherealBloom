import React, { createContext, useContext, useState, useEffect } from 'react';

const WeddingContext = createContext();

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

export const WeddingProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState({
    couple: {
      bride: 'Isabella',
      groom: 'Alexander',
      brideLastName: 'Rose',
      groomLastName: 'Sterling'
    },
    wedding: {
      date: '2024-09-15',
      time: '16:00',
      venue: 'Enchanted Garden Estate',
      location: 'Napa Valley, California',
      ceremony: 'Rose Garden Pavilion',
      reception: 'Moonlight Terrace'
    },
    story: {
      title: 'Our Love Story',
      content: 'Like two flowers blooming in the same garden, Isabella and Alexander found each other in the most unexpected way. Their love story began three springs ago at a botanical garden where both were seeking solace among the roses.',
      engagement: 'Under the same rose arbor where they first met, Alexander asked Isabella to be his forever. With petals falling like confetti and the golden hour light dancing through the leaves, she said yes to their eternal spring.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      'https://images.unsplash.com/photo-1594736797933-d0d6e6a0cdb0?w=800'
    ],
    bridalParty: [
      {
        name: 'Sophia Chen',
        role: 'Maid of Honor',
        relationship: 'Best Friend',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=400'
      },
      {
        name: 'Emma Rodriguez',
        role: 'Bridesmaid',
        relationship: 'Sister',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
      },
      {
        name: 'James Mitchell',
        role: 'Best Man',
        relationship: 'Brother',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
      },
      {
        name: 'David Park',
        role: 'Groomsman',
        relationship: 'Best Friend',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
      }
    ],
    rsvps: [],
    guestbook: [],
    vows: {
      bride: 'My dearest Alexander, like a flower that blooms in the perfect season, you came into my life when I needed you most...',
      groom: 'Beautiful Isabella, you are the garden where my heart finds peace, the sunrise that brightens my every day...',
      revealed: false
    }
  });

  const [isPreview, setIsPreview] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);

  const updateWeddingData = (newData) => {
    setWeddingData(prev => ({ ...prev, ...newData }));
  };

  const addRSVP = (rsvpData) => {
    setWeddingData(prev => ({
      ...prev,
      rsvps: [...prev.rsvps, { ...rsvpData, id: Date.now() }]
    }));
  };

  const addGuestbookEntry = (entry) => {
    setWeddingData(prev => ({
      ...prev,
      guestbook: [...prev.guestbook, { ...entry, id: Date.now(), timestamp: new Date() }]
    }));
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const togglePasswordProtection = () => {
    setIsPasswordProtected(!isPasswordProtected);
  };

  return (
    <WeddingContext.Provider value={{
      weddingData,
      updateWeddingData,
      addRSVP,
      addGuestbookEntry,
      isPreview,
      togglePreview,
      isPasswordProtected,
      togglePasswordProtection
    }}>
      {children}
    </WeddingContext.Provider>
  );
};