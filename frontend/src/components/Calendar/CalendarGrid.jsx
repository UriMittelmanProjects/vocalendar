// vocalendar/frontend/src/components/Calendar/CalendarGrid.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import { generateCalendarDays } from '../../utils/calendarUtils';
import CalendarCell from './CalendarCell';

const CalendarGrid = () => {
  const { currentYear, currentMonth, selectedDate, setSelectedDate, getEventCountForDay } = useCalendarContext();
  
  // Generate calendar days array for the current month
  const calendarDays = generateCalendarDays(
    currentYear, 
    currentMonth, 
    selectedDate, 
    getEventCountForDay
  );
  
  // Week days header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handleDateClick = (year, month, day) => {
    setSelectedDate(new Date(year, month, day));
  };
  
  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className="text-center text-sm font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <CalendarCell
            key={index}
            day={day.day}
            month={day.month}
            year={day.year}
            isCurrentMonth={day.isCurrentMonth}
            isToday={day.isToday}
            isSelected={day.isSelected}
            hasEvents={day.events}
            onClick={() => handleDateClick(day.year, day.month, day.day)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;