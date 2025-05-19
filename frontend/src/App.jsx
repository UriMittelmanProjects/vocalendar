// vocalendar/frontend/src/App.jsx
import React, { useState } from 'react';
import './App.css';
import CalendarContainer from './components/Calendar/CalendarContainer';
import VoiceAIContainer from './components/VoiceAI/VoiceAIContainer';
import IntegrationsContainer from './components/Integrations/IntegrationsContainer';
import EnhancedNavBar from './components/Navigation/EnhancedNavBar';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <header className="bg-purple-800 text-white p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Vocalendar</h1>
          {/* Only show on desktop, since we have bottom nav for mobile */}
          <nav className="hidden md:block">
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm transition-colors ${
                  activeTab === 'calendar' 
                    ? 'bg-white bg-opacity-20 rounded-md font-medium' 
                    : 'hover:bg-white hover:bg-opacity-10 rounded-md'
                }`}
                onClick={() => setActiveTab('calendar')}
              >
                Calendar
              </button>
              <button 
                className={`px-3 py-1 text-sm transition-colors ${
                  activeTab === 'ai' 
                    ? 'bg-white bg-opacity-20 rounded-md font-medium' 
                    : 'hover:bg-white hover:bg-opacity-10 rounded-md'
                }`}
                onClick={() => setActiveTab('ai')}
              >
                Voice AI
              </button>
              <button 
                className={`px-3 py-1 text-sm transition-colors ${
                  activeTab === 'integrations' 
                    ? 'bg-white bg-opacity-20 rounded-md font-medium' 
                    : 'hover:bg-white hover:bg-opacity-10 rounded-md'
                }`}
                onClick={() => setActiveTab('integrations')}
              >
                Integrations
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="pb-16 md:pb-4 md:ml-16">
        <AnimatePresence mode="wait">
          {activeTab === 'calendar' && (
            <motion.div
              key="calendar"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            >
              <CalendarContainer />
            </motion.div>
          )}
          
          {activeTab === 'ai' && (
            <motion.div
              key="voice-ai"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            >
              <VoiceAIContainer />
            </motion.div>
          )}
          
          {activeTab === 'integrations' && (
            <motion.div
              key="integrations"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            >
              <IntegrationsContainer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* <EnhancedNavBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
    </div>
  );
}

export default App;