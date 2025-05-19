// vocalendar/frontend/src/components/Calendar/EventCard.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const EventCard = ({ event }) => {
  const { openEditEventModal, openDeleteConfirmModal } = useCalendarContext();

  return (
    <div className={`bg-white rounded-lg shadow-sm p-3 border-l-4 ${event.isTentative ? 'border-yellow-500' : 'border-blue-500'} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <div className="font-medium text-gray-900">
          {event.title}
          {event.isTentative && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              Tentative
            </span>
          )}
        </div>
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
      
      {event.description && (
        <div className="text-sm text-gray-600 mt-1 line-clamp-2">
          {event.description}
        </div>
      )}
      
      {event.notifications && event.notifications.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {event.notifications.map((notification, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notification.label}
            </span>
          ))}
        </div>
      )}
      
      {/* Action buttons */}
      <div className="mt-3 flex justify-end space-x-2">
        <button
          onClick={() => openEditEventModal(event)}
          className="p-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
          aria-label="Edit event"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => openDeleteConfirmModal(event)}
          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
          aria-label="Delete event"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EventCard;