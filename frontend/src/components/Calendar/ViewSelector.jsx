// vocalendar/frontend/src/components/Calendar/ViewSelector.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const ViewSelector = () => {
  const { currentView, setCurrentView } = useCalendarContext();

  const views = [
    { id: 'day', label: 'Day', shortLabel: 'D' },
    { id: 'three-day', label: '3 Days', shortLabel: '3D' },
    { id: 'week', label: 'Week', shortLabel: 'W' },
    { id: 'month', label: 'Month', shortLabel: 'M' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      {views.map(view => (
        <button
          key={view.id}
          onClick={() => setCurrentView(view.id)}
          className={`px-2 py-1 text-xs md:text-sm rounded-md transition-colors ${
            currentView === view.id
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
          }`}
        >
          <span className="hidden md:inline">{view.label}</span>
          <span className="md:hidden">{view.shortLabel}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewSelector;