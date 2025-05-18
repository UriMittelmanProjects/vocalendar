// vocalendar/frontend/src/components/Calendar/EventCard.jsx
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="font-medium text-gray-900">{event.title}</div>
        <div className="text-sm text-gray-500">{event.startTime} - {event.endTime}</div>
      </div>
      {event.location && (
        <div className="text-sm text-gray-600 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>
      )}
    </div>
  );
};

export default EventCard;