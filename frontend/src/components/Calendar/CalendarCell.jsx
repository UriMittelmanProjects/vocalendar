// vocalendar/frontend/src/components/Calendar/CalendarCell.jsx
import React from 'react';

const CalendarCell = ({ 
  day, 
  month, 
  year, 
  isCurrentMonth, 
  isToday, 
  isSelected, 
  hasEvents, 
  onClick 
}) => {
  // Determine event dot colors - would be based on event categories in a real app
  const eventColors = hasEvents ? ['bg-blue-500', 'bg-green-500', 'bg-red-500'].slice(0, Math.min(hasEvents, 3)) : [];

  return (
    <div
      className={`
        relative flex flex-col justify-center items-center h-12 md:h-16 border border-gray-200 
        cursor-pointer transition-colors duration-200
        ${!isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'bg-white'}
        ${isToday ? 'bg-purple-100' : ''}
        ${isSelected ? 'ring-2 ring-purple-600' : ''}
        hover:bg-gray-50
      `}
      onClick={onClick}
      role="button"
      aria-label={`${day} ${month + 1} ${year}`}
      aria-selected={isSelected}
    >
      <div className="text-center">
        <div className={`
          text-sm md:text-base font-medium 
          ${isToday ? 'bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''}
        `}>
          {day}
        </div>
        
        {/* Event indicators (dots) */}
        {hasEvents > 0 && (
          <div className="flex justify-center space-x-1 mt-1">
            {eventColors.map((color, index) => (
              <div 
                key={index} 
                className={`h-1 w-1 md:h-2 md:w-2 rounded-full ${color}`}
                aria-hidden="true"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarCell;