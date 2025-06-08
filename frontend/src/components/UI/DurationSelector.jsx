// vocalendar/frontend/src/components/UI/DurationSelector.jsx
import React from 'react';

const DurationSelector = ({ startTime, onEndTimeChange, endTime, name }) => {
  const durations = [
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' },
    { value: 240, label: '4 hours' }
  ];

  const calculateEndTime = (start, durationMinutes) => {
    if (!start) return '';
    
    const [hours, minutes] = start.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationMinutes;
    
    const endHours = Math.floor(endMinutes / 60) % 24;
    const endMins = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleDurationClick = (durationMinutes) => {
    const calculatedEndTime = calculateEndTime(startTime, durationMinutes);
    onEndTimeChange({ target: { name, value: calculatedEndTime } });
  };

  return (
    <div className="mt-2">
      <div className="text-xs font-medium text-gray-500 mb-2">Quick Duration</div>
      <div className="flex flex-wrap gap-1">
        {durations.map((duration) => (
          <button
            key={duration.value}
            type="button"
            onClick={() => handleDurationClick(duration.value)}
            disabled={!startTime}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-purple-100 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {duration.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;