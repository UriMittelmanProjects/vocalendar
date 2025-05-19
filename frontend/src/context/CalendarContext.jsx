// vocalendar/frontend/src/context/CalendarContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { generateCalendarDays, generateOccurrences } from '../utils/calendarUtils';
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
  const [isRecurrenceActionModalOpen, setIsRecurrenceActionModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [recurrenceAction, setRecurrenceAction] = useState(null); // 'edit' or 'delete'
  
  // Navigation functions
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };
  
  // Event management functions
  const addEvent = (newEvent) => {
    // Generate a seriesId if this is a repeating event
    if (newEvent.repeat) {
      newEvent.repeat.seriesId = `series-${Date.now()}`;
    }
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };
  
  const updateEvent = (updatedEvent, updateMode = 'single') => {
    // If the event is not part of a series or we're only updating this instance
    if (!updatedEvent.repeat || !updatedEvent.repeat.seriesId || updateMode === 'single') {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      return;
    }
    
    // If we're updating all occurrences in the series
    if (updateMode === 'all') {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.repeat && event.repeat.seriesId === updatedEvent.repeat.seriesId 
            ? { ...event, ...updatedEvent, id: event.id, date: event.date } 
            : event
        )
      );
    }
  };
  
  const deleteEvent = (eventId, deleteMode = 'single') => {
    const eventToDelete = events.find(event => event.id === eventId);
    
    // If the event is not part of a series or we're only deleting this instance
    if (!eventToDelete || !eventToDelete.repeat || !eventToDelete.repeat.seriesId || deleteMode === 'single') {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      return;
    }
    
    // If we're deleting all occurrences in the series
    if (deleteMode === 'all') {
      const seriesId = eventToDelete.repeat.seriesId;
      setEvents(prevEvents => 
        prevEvents.filter(event => 
          !(event.repeat && event.repeat.seriesId === seriesId)
        )
      );
    }
  };
  
  // Modal management for Add Event
  const openAddEventModal = () => setIsAddEventModalOpen(true);
  const closeAddEventModal = () => setIsAddEventModalOpen(false);
  
  // Modal management for Edit Event
  const openEditEventModal = (event) => {
    setCurrentEvent(event);
    
    // If it's a repeating event, open the recurrence action modal first
    if (event.repeat && event.repeat.seriesId) {
      setRecurrenceAction('edit');
      setIsRecurrenceActionModalOpen(true);
    } else {
      setIsEditEventModalOpen(true);
    }
  };
  
  const closeEditEventModal = () => {
    setIsEditEventModalOpen(false);
    setCurrentEvent(null);
  };
  
  // Modal management for Delete Confirmation
  const openDeleteConfirmModal = (event) => {
    setCurrentEvent(event);
    
    // If it's a repeating event, open the recurrence action modal first
    if (event.repeat && event.repeat.seriesId) {
      setRecurrenceAction('delete');
      setIsRecurrenceActionModalOpen(true);
    } else {
      setIsDeleteConfirmModalOpen(true);
    }
  };
  
  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setCurrentEvent(null);
  };
  
  const confirmDeleteEvent = (deleteMode = 'single') => {
    if (currentEvent) {
      deleteEvent(currentEvent.id, deleteMode);
      closeDeleteConfirmModal();
    }
  };
  
  // Modal management for Recurrence Action
  const closeRecurrenceActionModal = () => {
    setIsRecurrenceActionModalOpen(false);
    setRecurrenceAction(null);
  };
  
  const handleRecurrenceAction = (actionType) => {
    closeRecurrenceActionModal();
    
    if (recurrenceAction === 'edit') {
      setIsEditEventModalOpen(true);
    } else if (recurrenceAction === 'delete') {
      setIsDeleteConfirmModalOpen(true);
    }
    
    // Store the action type in currentEvent for later use
    setCurrentEvent(prev => ({
      ...prev,
      recurrenceActionType: actionType
    }));
  };
  
  // Get visible month range to retrieve repeating events
  const getMonthRangeForEvents = () => {
    const startDate = new Date(currentYear, currentMonth - 1, 1); // One month before
    const endDate = new Date(currentYear, currentMonth + 1, getDaysInMonth(currentYear, currentMonth + 1)); // One month after
    return { startDate, endDate };
  };
  
  // Process visible events including repeating ones
  const [processedEvents, setProcessedEvents] = useState([]);
  
  useEffect(() => {
    const { startDate, endDate } = getMonthRangeForEvents();
    
    // Process all events, expanding recurring ones
    const allEvents = [];
    
    events.forEach(event => {
      if (event.repeat) {
        // Generate all occurrences of repeating events
        const occurrences = generateOccurrences(event, startDate, endDate);
        allEvents.push(...occurrences);
      } else {
        // For non-repeating events, just check if they're in the current range
        const eventDate = new Date(event.date);
        if (eventDate >= startDate && eventDate <= endDate) {
          allEvents.push(event);
        }
      }
    });
    
    setProcessedEvents(allEvents);
  }, [events, currentMonth, currentYear]);
  
  // Get events for selected date from processed events
  const selectedDateEvents = processedEvents.filter(
    event => 
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );
  
  // Count events for day from processed events
  const getEventCountForDay = (year, month, day) => {
    return processedEvents.filter(
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
    confirmDeleteEvent,
    isRecurrenceActionModalOpen,
    closeRecurrenceActionModal,
    handleRecurrenceAction
  };
  
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);

// Helper function to get days in month (used in getMonthRangeForEvents)
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};