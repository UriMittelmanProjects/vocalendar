// vocalendar/frontend/src/components/Calendar/CalendarContainer.jsx
import React from 'react';
import { CalendarProvider, useCalendarContext } from '../../context/CalendarContext';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import DayView from './DayView';
import WeekView from './WeekView';
import ThreeDayView from './ThreeDayView';
import EventsList from './EventsList';

const CalendarContainer = () => {
  return (
    <CalendarProvider>
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <CalendarHeader />
            <CalendarViewRenderer />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <EventsList />
        </div>
      </div>
    </CalendarProvider>
  );
};

const CalendarViewRenderer = () => {
  const { currentView } = useCalendarContext();

  switch (currentView) {
    case 'day':
      return <DayView />;
    case 'week':
      return <WeekView />;
    case 'three-day':
      return <ThreeDayView />;
    case 'month':
    default:
      return <CalendarGrid />;
  }
};

export default CalendarContainer;