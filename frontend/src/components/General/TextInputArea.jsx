// vocalendar/frontend/src/components/General/TextInputArea.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Text Input Area Component - For AI chat-like interaction
 */
const TextInputArea = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // This would integrate with AI in the future
    console.log('Text submitted:', input);
    setInput('');
  };

  return (
    <div className="flex items-center border-t border-gray-200 p-2 bg-white">
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="button"
        className="mr-2 p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800"
        aria-label="Voice command"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      </motion.button>
      
      <input
        type="text"
        placeholder="Ask about your calendar or add an event..."
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
      />
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        className="ml-2 p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
      >
        Send
      </motion.button>
    </div>
  );
};

export default TextInputArea;