// vocalendar/frontend/src/components/Calendar/EventCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Event Card Component - Displays a single calendar event
 */
const EventCard = ({ event }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white rounded-lg shadow-md p-3 mb-2 border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="font-medium text-gray-900">{event.title}</div>
        <div className="text-sm text-gray-500">{event.startTime} - {event.endTime}</div>
      </div>
      <div className="text-sm text-gray-600 mt-1">{event.location}</div>
    </motion.div>
  );
};

export default EventCard;