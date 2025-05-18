// vocalendar/frontend/src/components/Calendar/CalendarContainer.jsx
import React from 'react';
import { CalendarProvider } from '../../context/CalendarContext';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventsList from './EventsList';

const CalendarContainer = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <CalendarHeader />
            <CalendarGrid />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <EventsList />
        </div>
      </div>
    </CalendarProvider>
  );
};

export default CalendarContainer;