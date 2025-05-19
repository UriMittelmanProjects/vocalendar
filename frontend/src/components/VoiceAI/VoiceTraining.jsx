// vocalendar/frontend/src/components/VoiceAI/VoiceTraining.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon } from '../UI/Icons';

const trainingPhrases = [
  "Schedule a meeting for tomorrow at 3 PM",
  "Move my appointment with Dr. Smith to Friday",
  "What's on my calendar for next week?",
  "Cancel my lunch plans on Wednesday",
  "Remind me about the team call 10 minutes before",
  "Add a note to tomorrow's dentist appointment"
];

const VoiceTraining = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState([]);

  const startRecording = () => {
    if (isRecording) return;
    
    setIsRecording(true);
    
    // Simulate recording for demonstration
    setTimeout(() => {
      setIsRecording(false);
      
      // Mark current phrase as completed
      if (!completedPhrases.includes(currentPhrase)) {
        setCompletedPhrases([...completedPhrases, currentPhrase]);
      }
      
      // Calculate progress
      const newProgress = Math.round(((completedPhrases.length + 1) / trainingPhrases.length) * 100);
      setProgress(newProgress);
      
      // Move to next phrase if not at the end
      if (currentPhrase < trainingPhrases.length - 1) {
        setCurrentPhrase(currentPhrase + 1);
      }
    }, 3000);
  };

  const resetTraining = () => {
    setCurrentPhrase(0);
    setCompletedPhrases([]);
    setProgress(0);
    setIsRecording(false);
  };

  const selectPhrase = (index) => {
    setCurrentPhrase(index);
  };

  const isComplete = progress === 100;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Voice Training</h3>
        <p className="text-gray-600">
          Help your assistant recognize your voice by reading the phrases below. 
          Click the microphone button and speak each phrase clearly.
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div 
            className="bg-purple-600 h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      {/* Current Phrase */}
      <div className="bg-purple-50 rounded-lg p-6 mb-6 text-center relative">
        {isComplete ? (
          <div className="py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-green-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Training Complete!</h3>
            <p className="text-gray-600 mb-4">
              Your voice assistant is now trained to recognize your voice and commands.
            </p>
            <button 
              onClick={resetTraining}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        ) : (
          <>
            <div className="text-lg font-medium text-gray-800 mb-3">
              "{trainingPhrases[currentPhrase]}"
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Please say this phrase clearly when the microphone is active
            </div>
            <motion.button
              onClick={startRecording}
              disabled={isRecording}
              className={`mx-auto p-4 rounded-full ${
                isRecording 
                  ? 'bg-red-600 text-white pointer-events-none' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } transition-colors shadow-md`}
              whileTap={{ scale: 0.9 }}
              animate={isRecording ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } } : {}}
            >
              <MicrophoneIcon className="h-8 w-8" />
            </motion.button>
            {isRecording && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-900 bg-opacity-10 rounded-lg"></div>
                <div className="text-purple-800 font-medium animate-pulse">
                  Listening...
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Phrase List */}
      <div className="overflow-y-auto flex-grow">
        <h4 className="font-medium mb-2">Training Phrases</h4>
        <div className="space-y-2">
          {trainingPhrases.map((phrase, index) => (
            <div 
              key={index}
              onClick={() => !isRecording && selectPhrase(index)}
              className={`
                p-3 rounded-md cursor-pointer flex items-center
                ${currentPhrase === index ? 'bg-purple-100 border-l-4 border-purple-600' : 'bg-gray-50 hover:bg-gray-100'}
                ${completedPhrases.includes(index) ? 'border-l-4 border-green-500' : ''}
              `}
            >
              <div className="mr-3">
                {completedPhrases.includes(index) ? (
                  <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
              <div className="flex-grow text-sm">{phrase}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceTraining;