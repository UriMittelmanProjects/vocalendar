// vocalendar/frontend/src/components/Calendar/WeekView.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const WeekView = () => {
  const { selectedDate, events, setSelectedDate } = useCalendarContext();

  const getWeekDays = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
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

  const weekDays = getWeekDays();
  const today = new Date();

  return (
    <div className="week-view">
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = day.toDateString() === today.toDateString();
          const isSelected = day.toDateString() === selectedDate.toDateString();
          
          return (
            <div
              key={index}
              className={`border rounded-lg p-2 min-h-32 cursor-pointer transition-colors ${
                isSelected ? 'ring-2 ring-purple-600' : ''
              } ${isToday ? 'bg-purple-50' : 'bg-white'} hover:bg-gray-50`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-center mb-2">
                <div className="text-xs font-medium text-gray-600">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm md:text-base font-semibold ${
                  isToday ? 'bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto' : ''
                }`}>
                  {day.getDate()}
                </div>
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;