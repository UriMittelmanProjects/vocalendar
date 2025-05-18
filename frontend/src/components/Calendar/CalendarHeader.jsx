// vocalendar/frontend/src/components/Calendar/CalendarHeader.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import { getMonthName } from '../../utils/calendarUtils';

const CalendarHeader = () => {
  const { currentMonth, currentYear, goToPrevMonth, goToNextMonth, goToToday } = useCalendarContext();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">
        {getMonthName(currentMonth)} {currentYear}
      </h2>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={goToPrevMonth}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button
          onClick={goToToday}
          className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
        >
          Today
        </button>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;