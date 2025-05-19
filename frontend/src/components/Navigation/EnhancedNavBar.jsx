// vocalendar/frontend/src/components/Navigation/EnhancedNavBar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Animation variants for menu items
const itemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0 }
};

const EnhancedNavBar = ({ activeTab, setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      ),
      badge: true
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  // Mobile bottom navigation
  const mobileTabs = navItems.slice(0, 3); // Only show first 3 tabs on mobile

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <motion.nav 
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex justify-around">
          {mobileTabs.map(item => (
            <motion.button
              key={item.id}
              className={`relative flex flex-col items-center justify-center py-3 px-5 ${
                activeTab === item.id 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              whileTap={{ scale: 0.9 }}
            >
              {item.badge && (
                <span className="absolute top-2 right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
              )}
              <div className="h-6 w-6">
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  className="absolute bottom-0 h-1 w-8 bg-purple-600 dark:bg-purple-400 rounded-t-lg"
                  layoutId="navIndicator"
                  initial={false}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Desktop Side Navigation */}
      <motion.nav 
        className="hidden md:flex flex-col fixed left-0 top-24 h-auto bg-white dark:bg-gray-800 shadow-md rounded-tr-lg rounded-br-lg z-10"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <div className={`flex flex-col py-4 ${isExpanded ? 'px-4' : 'px-2'} transition-all duration-300`}>
          {navItems.map(item => (
            <motion.button
              key={item.id}
              className={`
                relative flex items-center ${isExpanded ? 'justify-start' : 'justify-center'} 
                py-3 ${isExpanded ? 'px-4' : 'px-2'} rounded-lg mb-2 transition-colors
                ${
                  activeTab === item.id 
                    ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              whileTap={{ scale: 0.95 }}
            >
              {item.badge && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
              )}
              <div className="h-6 w-6 flex-shrink-0">
                {item.icon}
              </div>
              
              {isExpanded && (
                <motion.span 
                  className="ml-3 whitespace-nowrap"
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default EnhancedNavBar;