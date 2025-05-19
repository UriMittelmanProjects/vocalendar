// vocalendar/frontend/src/components/Navigation/NavBar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  // Navigation items with icons
  const navItems = [
    { 
      id: 'calendar', 
      label: 'Calendar', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'ai', 
      label: 'Voice AI', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10">
        <div className="flex justify-around">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-3 ${
                activeTab === item.id 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  className="absolute bottom-0 h-1 w-full bg-purple-600 dark:bg-purple-400"
                  layoutId="underline"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex flex-col fixed left-0 top-20 h-full bg-white dark:bg-gray-800 shadow-md rounded-tr-lg rounded-br-lg p-4 z-10">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`
              flex items-center space-x-2 py-3 px-4 rounded-lg mb-2 transition-colors
              ${
                activeTab === item.id 
                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default NavBar;