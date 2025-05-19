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
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  
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
  
  const updateEvent = (updatedEvent) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };
  
  const deleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };
  
  // Modal management for Add Event
  const openAddEventModal = () => setIsAddEventModalOpen(true);
  const closeAddEventModal = () => setIsAddEventModalOpen(false);
  
  // Modal management for Edit Event
  const openEditEventModal = (event) => {
    setCurrentEvent(event);
    setIsEditEventModalOpen(true);
  };
  const closeEditEventModal = () => {
    setIsEditEventModalOpen(false);
    setCurrentEvent(null);
  };
  
  // Modal management for Delete Confirmation
  const openDeleteConfirmModal = (event) => {
    setCurrentEvent(event);
    setIsDeleteConfirmModalOpen(true);
  };
  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setCurrentEvent(null);
  };
  const confirmDeleteEvent = () => {
    if (currentEvent) {
      deleteEvent(currentEvent.id);
      closeDeleteConfirmModal();
    }
  };
  
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
    updateEvent,
    deleteEvent,
    isAddEventModalOpen,
    openAddEventModal,
    closeAddEventModal,
    isEditEventModalOpen,
    openEditEventModal,
    closeEditEventModal,
    currentEvent,
    isDeleteConfirmModalOpen,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    confirmDeleteEvent
  };
  
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);