// vocalendar/frontend/src/components/VoiceAI/VoiceAIContainer.jsx
import React, { useState } from 'react';
import VoiceTraining from './VoiceTraining';
import PreviousChats from './PreviousChats';
import StartConversation from './StartConversation';

const VoiceAIContainer = () => {
  const [activeSection, setActiveSection] = useState('start'); // 'start', 'training', or 'chats'
  
  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeSection === 'start' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-500'
              }`}
              onClick={() => setActiveSection('start')}
            >
              Start Conversation
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeSection === 'training' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-500'
              }`}
              onClick={() => setActiveSection('training')}
            >
              Voice Training
            </button>
            <button 
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeSection === 'chats' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-500'
              }`}
              onClick={() => setActiveSection('chats')}
            >
              Previous Chats
            </button>
          </div>
        </div>
        
        {/* Active Section Content */}
        <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
          {activeSection === 'start' && <StartConversation />}
          {activeSection === 'training' && <VoiceTraining />}
          {activeSection === 'chats' && <PreviousChats />}
        </div>
      </div>
      
      {/* Right Sidebar - Quick Actions and Tips */}
      <div className="w-full md:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Voice AI Assistant
          </h3>
          
          <div className="space-y-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-medium text-purple-700">Quick Tips</h4>
              <ul className="mt-2 text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Say "Add event" to create a new calendar item
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Say "What's on my schedule today" to hear your events
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Say "Move my meeting with Alex to 3PM" to reschedule
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Say "Show me next week" to navigate
                </li>
              </ul>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <button className="text-sm py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors">
                  Complete Training
                </button>
                <button className="text-sm py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors">
                  Voice Settings
                </button>
                <button className="text-sm py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors">
                  Test Microphone
                </button>
                <button className="text-sm py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors">
                  Help & Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAIContainer;