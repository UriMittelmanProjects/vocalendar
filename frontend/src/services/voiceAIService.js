// vocalendar/frontend/src/services/voiceAIService.js
// Mock data for voice AI conversations and interactions

// Sample voice training phrases
export const trainingPhrases = [
  "Schedule a meeting for tomorrow at 3 PM",
  "Move my appointment with Dr. Smith to Friday",
  "What's on my calendar for next week?",
  "Cancel my lunch plans on Wednesday",
  "Remind me about the team call 10 minutes before",
  "Add a note to tomorrow's dentist appointment",
  "Show me all events in June",
  "Create a recurring meeting every Monday",
  "Set up a video call with marketing team",
  "When's my next appointment?"
];

// Sample previous conversations
export const previousConversations = [
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

// Mock voice training status
export const voiceTrainingStatus = {
  isComplete: false,
  completedPhrases: [],
  lastTrainingDate: null
};

// Mock API functions (would actually interact with a backend in a real app)
export const startVoiceRecognition = () => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
};

export const saveConversation = (conversation) => {
  return new Promise((resolve) => {
    // Simulate saving to backend
    setTimeout(() => {
      resolve({ success: true, id: Date.now() });
    }, 500);
  });
};

export const deleteConversation = (conversationId) => {
  return new Promise((resolve) => {
    // Simulate deletion from backend
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

export const completeTrainingPhrase = (phraseIndex) => {
  return new Promise((resolve) => {
    // Simulate saving training progress
    setTimeout(() => {
      voiceTrainingStatus.completedPhrases.push(phraseIndex);
      if (voiceTrainingStatus.completedPhrases.length === trainingPhrases.length) {
        voiceTrainingStatus.isComplete = true;
        voiceTrainingStatus.lastTrainingDate = new Date().toISOString();
      }
      resolve({ success: true, progress: (voiceTrainingStatus.completedPhrases.length / trainingPhrases.length) * 100 });
    }, 300);
  });
};

export default {
  trainingPhrases,
  previousConversations,
  voiceTrainingStatus,
  startVoiceRecognition,
  saveConversation,
  deleteConversation,
  completeTrainingPhrase
};