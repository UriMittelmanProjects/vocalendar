// vocalendar/frontend/src/components/VoiceAI/PreviousChats.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparkleIcon, CalendarIcon } from '../UI/Icons';

// Mock data for previous chats
const mockChats = [
  {
    id: 1,
    date: '2025-05-18',
    preview: "Schedule a team meeting tomorrow at 2pm",
    messages: [
      { role: 'user', content: "Schedule a team meeting tomorrow at 2pm" },
      { role: 'ai', content: "I've added a team meeting to your calendar for tomorrow at 2:00 PM. Would you like to add any specific details or invitees?" },
      { role: 'user', content: "Yes, invite the design team and add a note that we'll be discussing the new UI mockups" },
      { role: 'ai', content: "Great! I've updated the event with a note about discussing UI mockups and added the design team as invitees. The meeting is set for tomorrow at 2:00 PM. Is there anything else you'd like to add?" }
    ],
    hasCalendarEvent: true
  },
  {
    id: 2,
    date: '2025-05-17',
    preview: "What's on my schedule next week?",
    messages: [
      { role: 'user', content: "What's on my schedule next week?" },
      { role: 'ai', content: "You have 4 events scheduled for next week: a dentist appointment on Monday at 10:00 AM, a team meeting on Tuesday at 2:00 PM, lunch with Sara on Wednesday at 1:00 PM, and a project deadline on Friday." },
      { role: 'user', content: "Can you move the lunch with Sara to Thursday?" },
      { role: 'ai', content: "I've moved your lunch with Sara from Wednesday to Thursday at 1:00 PM. Your schedule has been updated." }
    ],
    hasCalendarEvent: true
  },
  {
    id: 3,
    date: '2025-05-15',
    preview: "Remind me about my presentation tomorrow",
    messages: [
      { role: 'user', content: "Remind me about my presentation tomorrow" },
      { role: 'ai', content: "I've set a reminder for your presentation tomorrow. Would you like me to add any specific details to the reminder?" },
      { role: 'user', content: "Yes, remind me to bring the sales projections printouts" },
      { role: 'ai', content: "I've updated the reminder with a note to bring the sales projections printouts. The reminder is set for tomorrow. Would you like me to remind you at a specific time?" },
      { role: 'user', content: "Yes, at 8am please" },
      { role: 'ai', content: "Your reminder is set for tomorrow at 8:00 AM. I'll remind you about your presentation and to bring the sales projections printouts." }
    ],
    hasCalendarEvent: false
  },
  {
    id: 4,
    date: '2025-05-10',
    preview: "Cancel my gym session on Friday",
    messages: [
      { role: 'user', content: "Cancel my gym session on Friday" },
      { role: 'ai', content: "I've found a gym session scheduled for Friday at 6:00 PM. Would you like me to cancel this event?" },
      { role: 'user', content: "Yes, please cancel it" },
      { role: 'ai', content: "I've removed the gym session from your calendar for Friday at 6:00 PM. Is there anything else you'd like to do with your schedule?" }
    ],
    hasCalendarEvent: true
  }
];

const PreviousChats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredChats = mockChats.filter(chat => 
    chat.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleChatClick = (chatId) => {
    // If clicking the same chat, close it (toggle)
    if (selectedChat === chatId) {
      setSelectedChat(null);
    } else {
      setSelectedChat(chatId);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Previous Conversations</h3>
        <p className="text-gray-600">
          Review your past conversations with the voice assistant.
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Conversations List */}
      <div className="overflow-y-auto flex-grow">
        {filteredChats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No conversations found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredChats.map(chat => (
              <div key={chat.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-3 bg-white cursor-pointer hover:bg-gray-50"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <SparkleIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{chat.preview}</div>
                        <div className="text-sm text-gray-500">{formatDate(chat.date)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {chat.hasCalendarEvent && (
                        <div className="text-green-600 bg-green-50 p-1 rounded-full" title="Has calendar event">
                          <CalendarIcon className="h-4 w-4" />
                        </div>
                      )}
                      <div className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${selectedChat === chat.id ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Conversation Detail */}
                {selectedChat === chat.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 border-t border-gray-200"
                  >
                    <div className="p-3 space-y-3 max-h-64 overflow-y-auto">
                      {chat.messages.map((message, idx) => (
                        <div key={idx} className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                          <div 
                            className={`max-w-[80%] p-2 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-gray-200 text-gray-800' 
                                : 'bg-purple-100 text-gray-800'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 border-t border-gray-200 flex justify-between">
                      <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                        Delete
                      </button>
                      <button className="text-sm px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Continue Chat
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousChats;