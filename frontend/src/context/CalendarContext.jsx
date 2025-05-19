// vocalendar/frontend/src/context/CalendarContext.jsx
import { createContext, useState, useContext } from 'react';
import { generateCalendarDays } from '../utils/calendarUtils';
import mockEvents from '../data/mockEvents';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState(mockEvents);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  
  // Navigation functions
  const goToPrevMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };
  
  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };
  
  // Event management functions
  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };
  
  // Modal management
  const openAddEventModal = () => setIsAddEventModalOpen(true);
  const closeAddEventModal = () => setIsAddEventModalOpen(false);
  
  // Get events for selected date
  const selectedDateEvents = events.filter(
    event => 
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );
  
  // Count events for day
  const getEventCountForDay = (year, month, day) => {
    return events.filter(
      event => 
        event.date.getFullYear() === year &&
        event.date.getMonth() === month &&
        event.date.getDate() === day
    ).length;
  };
  
  const value = {
    currentMonth,
    currentYear,
    selectedDate,
    setSelectedDate,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    events,
    selectedDateEvents,
    getEventCountForDay,
    addEvent,
    isAddEventModalOpen,
    openAddEventModal,
    closeAddEventModal
  };
  
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);