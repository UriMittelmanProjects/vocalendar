// vocalendar/frontend/src/components/Calendar/ThreeDayView.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const ThreeDayView = () => {
  const { selectedDate, events, setSelectedDate } = useCalendarContext();

  const getThreeDays = () => {
    const days = [];
    for (let i = -1; i <= 1; i++) {
      const day = new Date(selectedDate);
      day.setDate(selectedDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
    );
  };

  const threeDays = getThreeDays();
  const today = new Date();

  return (
    <div className="three-day-view">
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {threeDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = day.toDateString() === today.toDateString();
          const isSelected = day.toDateString() === selectedDate.toDateString();
          
          return (
            <div
              key={index}
              className={`border rounded-lg p-2 md:p-3 min-h-40 cursor-pointer transition-colors ${
                isSelected ? 'ring-2 ring-purple-600' : ''
              } ${isToday ? 'bg-purple-50' : 'bg-white'} hover:bg-gray-50`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-center mb-3">
                <div className="text-xs font-medium text-gray-600">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-base md:text-lg font-semibold ${
                  isToday ? 'bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center mx-auto' : ''
                }`}>
                  {day.getDate()}
                </div>
                <div className="text-xs text-gray-500">
                  {day.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
              
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-xs">{event.startTime}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeDayView;