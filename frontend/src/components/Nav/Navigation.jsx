// vocalendar/frontend/src/components/Nav/Navigation.jsx
import React, { useState } from 'react';

/**
 * Navigation Component - Header navigation for the application
 */
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-purple-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Vocalendar</h1>
        </div>
        
        <div className="hidden md:flex space-x-4">
          <button className="p-2 hover:bg-purple-700 rounded">
            Voice Setup
          </button>
          <button className="p-2 hover:bg-purple-700 rounded">
            AI Settings
          </button>
          <button className="p-2 hover:bg-purple-700 rounded">
            Past Conversations
          </button>
          <button className="p-2 hover:bg-purple-700 rounded">
            Link Calendars
          </button>
        </div>
        
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-700 text-white">
          <button className="w-full text-left p-3 hover:bg-purple-600">
            Voice Setup
          </button>
          <button className="w-full text-left p-3 hover:bg-purple-600">
            AI Settings
          </button>
          <button className="w-full text-left p-3 hover:bg-purple-600">
            Past Conversations
          </button>
          <button className="w-full text-left p-3 hover:bg-purple-600">
            Link Calendars
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;