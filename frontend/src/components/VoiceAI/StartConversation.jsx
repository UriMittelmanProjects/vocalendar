// vocalendar/frontend/src/components/VoiceAI/StartConversation.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon, SparkleIcon } from '../UI/Icons';

// Animation variants
const micVariants = {
  idle: { scale: 1 },
  listening: { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } }
};

const waveVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: [0, 1, 0], 
    scale: [1, 1.5, 2], 
    transition: { repeat: Infinity, duration: 2, repeatDelay: 0 } 
  }
};

const StartConversation = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversations, setConversations] = useState([
    { 
      id: 1, 
      user: "Schedule a team meeting tomorrow at 2pm", 
      ai: "I've added a team meeting to your calendar for tomorrow at 2:00 PM. Would you like to add any specific details or invitees?"
    },
    { 
      id: 2, 
      user: "Yes, invite the design team and add a note that we'll be discussing the new UI mockups", 
      ai: "Great! I've updated the event with a note about discussing UI mockups and added the design team as invitees. The meeting is set for tomorrow at 2:00 PM. Is there anything else you'd like to add?"
    }
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Simulate voice recognition (would be replaced with actual voice API)
    if (!isListening) {
      setTimeout(() => {
        setTranscript("What's on my calendar for next Friday?");
        
        // After "hearing" the user, simulate AI response
        setTimeout(() => {
          setConversations(prev => [
            ...prev, 
            {
              id: prev.length + 1,
              user: "What's on my calendar for next Friday?",
              ai: "You have 3 events scheduled for next Friday: a dentist appointment at 10:00 AM, lunch with Sara at 1:00 PM, and a team meeting at 3:00 PM. Would you like me to read details for any of these events?"
            }
          ]);
          setTranscript('');
          setIsListening(false);
        }, 2000);
      }, 2000);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    // Simulate AI response to text input
    setConversations(prev => [
      ...prev, 
      {
        id: prev.length + 1,
        user: transcript,
        ai: "I've processed your request: " + transcript + ". Is there anything else you'd like me to help with?"
      }
    ]);
    setTranscript('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Conversation History */}
      <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[70vh]">
        {conversations.map(convo => (
          <div key={convo.id} className="space-y-2">
            <div className="flex items-start">
              <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-[80%] text-gray-800">
                <p>{convo.user}</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-purple-100 rounded-lg py-2 px-3 max-w-[80%] text-gray-800">
                <p>{convo.ai}</p>
              </div>
            </div>
          </div>
        ))}
        
        {transcript && (
          <div className="flex items-start">
            <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-[80%] text-gray-800">
              <p>{transcript}</p>
            </div>
          </div>
        )}
        
        {isListening && (
          <div className="flex justify-center my-2">
            <div className="text-sm text-purple-600 animate-pulse">Listening...</div>
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="mt-auto">
        <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Type your command or question..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            {transcript && (
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700"
              >
                <SparkleIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <motion.button
            type="button"
            className={`p-3 rounded-full ${
              isListening 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
            }`}
            onClick={toggleListening}
            variants={micVariants}
            animate={isListening ? 'listening' : 'idle'}
          >
            <div className="relative">
              <MicrophoneIcon className="h-6 w-6" />
              {isListening && (
                <motion.div 
                  className="absolute -inset-4 rounded-full border-2 border-purple-400"
                  variants={waveVariants}
                  initial="hidden"
                  animate="visible"
                />
              )}
            </div>
          </motion.button>
        </form>
        
        <div className="mt-2 flex justify-center">
          <p className="text-xs text-gray-500">
            Press the microphone button to start voice command or type your query
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartConversation;