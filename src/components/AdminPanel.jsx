import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../contexts/WeddingContext';
import { useTheme } from '../contexts/ThemeContext';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEye, FiEyeOff, FiSave, FiLock, FiUnlock, FiUsers, FiMessageCircle, FiHome, FiEdit } = FiIcons;

const AdminPanel = () => {
  const { weddingData, updateWeddingData, isPreview, togglePreview, isPasswordProtected, togglePasswordProtection } = useWedding();
  const { isDark } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [editData, setEditData] = useState(weddingData);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication (in real app, this would be more secure)
    if (loginData.email === 'admin@etherealbloom.com' && loginData.password === 'wedding2024') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSave = () => {
    updateWeddingData(editData);
    alert('Changes saved successfully!');
  };

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🌸</div>
              <h1 className="font-script text-3xl text-blush-600 dark:text-blush-400 mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Ethereal Bloom Wedding Management
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-800"
                  placeholder="admin@etherealbloom.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-800"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blush-500 to-sage-500 text-white font-semibold rounded-xl hover:from-blush-600 hover:to-sage-600 transition-all duration-300"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Demo credentials: admin@etherealbloom.com / wedding2024
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiHome },
    { id: 'content', name: 'Content', icon: FiEdit },
    { id: 'rsvps', name: 'RSVPs', icon: FiUsers },
    { id: 'guestbook', name: 'Guestbook', icon: FiMessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-script text-4xl text-blush-600 dark:text-blush-400 mb-2">
                Wedding Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your Ethereal Bloom wedding website
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePreview}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  isPreview 
                    ? 'bg-sage-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <SafeIcon icon={isPreview ? FiEye : FiEyeOff} className="w-4 h-4" />
                <span>{isPreview ? 'Preview On' : 'Preview Off'}</span>
              </button>
              <button
                onClick={togglePasswordProtection}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  isPasswordProtected 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <SafeIcon icon={isPasswordProtected ? FiLock : FiUnlock} className="w-4 h-4" />
                <span>{isPasswordProtected ? 'Protected' : 'Public'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blush-500 text-blush-600 dark:text-blush-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blush-100 dark:bg-blush-900 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="w-6 h-6 text-blush-600 dark:text-blush-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total RSVPs</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {weddingData.rsvps.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage-100 dark:bg-sage-900 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiMessageCircle} className="w-6 h-6 text-sage-600 dark:text-sage-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Guestbook Entries</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {weddingData.guestbook.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-lilac-100 dark:bg-lilac-900 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💒</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wedding Date</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {format(new Date(weddingData.wedding.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Wedding Content
                </h2>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blush-500 text-white rounded-lg hover:bg-blush-600 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bride's Name
                    </label>
                    <input
                      type="text"
                      value={editData.couple.bride}
                      onChange={(e) => handleInputChange('couple', 'bride', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Groom's Name
                    </label>
                    <input
                      type="text"
                      value={editData.couple.groom}
                      onChange={(e) => handleInputChange('couple', 'groom', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Wedding Date
                  </label>
                  <input
                    type="date"
                    value={editData.wedding.date}
                    onChange={(e) => handleInputChange('wedding', 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={editData.wedding.venue}
                    onChange={(e) => handleInputChange('wedding', 'venue', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Our Story
                  </label>
                  <textarea
                    value={editData.story.content}
                    onChange={(e) => handleInputChange('story', 'content', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blush-400 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rsvps' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                RSVP Responses
              </h2>
              {weddingData.rsvps.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No RSVPs received yet
                </p>
              ) : (
                <div className="space-y-4">
                  {weddingData.rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {rsvp.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {rsvp.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rsvp.attendance === 'yes' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {rsvp.attendance === 'yes' ? 'Attending' : 'Not Attending'}
                          </span>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {rsvp.guests} guest{rsvp.guests !== '1' ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      {rsvp.message && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          "{rsvp.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'guestbook' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Guestbook Messages
              </h2>
              {weddingData.guestbook.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No guestbook entries yet
                </p>
              ) : (
                <div className="space-y-4">
                  {weddingData.guestbook.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {entry.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {entry.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;