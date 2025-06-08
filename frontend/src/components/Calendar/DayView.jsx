// vocalendar/frontend/src/components/Calendar/DayView.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const DayView = () => {
  const { selectedDate, selectedDateEvents } = useCalendarContext();

  const timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push(hour);
  }

  const formatTime = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    if (hour < 12) return `${hour} AM`;
    return `${hour - 12} PM`;
  };

  const getEventsForHour = (hour) => {
    return selectedDateEvents.filter(event => {
      const startHour = parseInt(event.startTime.split(':')[0]);
      const endHour = parseInt(event.endTime.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
  };

  return (
    <div className="day-view">
      <div className="text-lg font-semibold mb-4 text-center">
        {selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        })}
      </div>
      
      <div className="max-h-96 overflow-y-auto border rounded-lg">
        {timeSlots.map(hour => (
          <div key={hour} className="flex border-b border-gray-100 min-h-12">
            <div className="w-16 md:w-20 flex-shrink-0 text-xs md:text-sm text-gray-500 p-2 bg-gray-50">
              {formatTime(hour)}
            </div>
            <div className="flex-1 p-2 relative">
              {getEventsForHour(hour).map(event => (
                <div
                  key={event.id}
                  className="bg-blue-100 text-blue-800 text-xs md:text-sm px-2 py-1 rounded mb-1 border-l-2 border-blue-500"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs">{event.startTime} - {event.endTime}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayView;