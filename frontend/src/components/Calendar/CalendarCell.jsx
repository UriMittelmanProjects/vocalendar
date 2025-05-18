// vocalendar/frontend/src/components/CalendarCell.jsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Calendar Cell Component - Represents a single day in the calendar grid
 */
const CalendarCell = ({ day, month, year, isCurrentMonth, isToday, isSelected, hasEvents, onClick }) => {
  const cellVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  // Determine event dot colors - would be based on event categories in a real app
  const eventColors = hasEvents ? ['bg-blue-500', 'bg-green-500', 'bg-red-500'].slice(0, Math.min(hasEvents, 3)) : [];

  return (
    <motion.div
      variants={cellVariants}
      className={`relative flex justify-center items-center h-10 md:h-14 border border-gray-200 cursor-pointer
        ${!isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'bg-white'}
        ${isToday ? 'bg-purple-200' : ''}
        ${isSelected ? 'ring-2 ring-black' : ''}
      `}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-sm md:text-base font-medium">{day}</div>
        
        {/* Event indicators (dots) */}
        {hasEvents > 0 && (
          <div className="flex justify-center space-x-1 mt-1">
            {eventColors.map((color, index) => (
              <div key={index} className={`h-1 w-1 md:h-2 md:w-2 rounded-full ${color}`}></div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CalendarCell;