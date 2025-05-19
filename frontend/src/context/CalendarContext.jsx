// vocalendar/frontend/src/context/CalendarContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { generateCalendarDays, generateOccurrences } from '../utils/calendarUtils';
import mockEvents from '../data/mockEvents';

// Helper function to check if an event is a recurring instance
const isRecurringInstance = (eventId) => {
  return String(eventId).includes('-');
};

// Helper function to get original event ID from a recurring instance ID
const getOriginalEventId = (instanceId) => {
  if (!isRecurringInstance(instanceId)) return instanceId;
  return parseInt(String(instanceId).split('-')[0], 10);
};

// Helper function to find an event by ID, handling both original and recurring instances
const findEventById = (events, eventId) => {
  if (isRecurringInstance(eventId)) {
    // For recurring instances, find the original event
    const originalId = getOriginalEventId(eventId);
    return events.find(event => event.id === originalId);
  }
  // For regular events, direct lookup
  return events.find(event => event.id === eventId);
};

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
    // Get information about the event being updated
    const isInstance = updatedEvent.isRecurringInstance || isRecurringInstance(updatedEvent.id);

    // If we're only updating this instance
    if (updateMode === 'single') {
      if (isInstance) {
        // For a recurring instance, create a standalone event and add exception to original
        const originalId = getOriginalEventId(updatedEvent.id);
        const originalEvent = findEventById(events, originalId);

        if (originalEvent) {
          // 1. Create a new standalone event with the updated properties
          const standaloneEvent = {
            ...updatedEvent,
            id: Date.now(), // New unique ID
            repeat: null    // Not recurring anymore
          };

          // 2. Add an exception to the original event
          const exceptions = originalEvent.repeat.exceptions || [];
          const exceptionDate = new Date(updatedEvent.date).toISOString();

          setEvents(prevEvents => [
            // Add the new standalone event
            ...prevEvents,
            standaloneEvent,
            // Update the original event with the new exception
            ...prevEvents.map(event =>
              event.id === originalId
                ? {
                  ...event,
                  repeat: {
                    ...event.repeat,
                    exceptions: [...exceptions, exceptionDate]
                  }
                }
                : event
            )
          ]);
        }
      } else if (updatedEvent.repeat && updatedEvent.repeat.seriesId) {
        // For the original event of a series, update just this occurrence:
        // 1. Add an exception for the original date
        // 2. Create a standalone event with the updated properties
        const exceptions = updatedEvent.repeat.exceptions || [];
        const exceptionDate = new Date(updatedEvent.date).toISOString();

        // Create standalone event
        const standaloneEvent = {
          ...updatedEvent,
          id: Date.now(), // New unique ID
          repeat: null    // Not recurring anymore
        };

        // Update the original and add standalone
        setEvents(prevEvents => [
          ...prevEvents.map(event =>
            event.id === updatedEvent.id
              ? {
                ...event,
                repeat: {
                  ...event.repeat,
                  exceptions: [...exceptions, exceptionDate]
                }
              }
              : event
          ),
          standaloneEvent
        ]);
      } else {
        // Regular non-recurring event update
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
      }
      return;
    }

    // If we're updating all occurrences in the series
    if (updateMode === 'all') {
      // Get the original event ID if this is an instance
      const originalId = getOriginalEventId(updatedEvent.id);

      setEvents(prevEvents =>
        prevEvents.map(event => {
          // Match either the original event or any event in the same series
          if (event.id === originalId ||
            (event.repeat && updatedEvent.repeat &&
              event.repeat.seriesId === updatedEvent.repeat.seriesId)) {
            return {
              ...event,
              title: updatedEvent.title,
              startTime: updatedEvent.startTime,
              endTime: updatedEvent.endTime,
              location: updatedEvent.location,
              description: updatedEvent.description,
              isTentative: updatedEvent.isTentative,
              notifications: updatedEvent.notifications,
              repeat: {
                ...event.repeat,
                frequency: updatedEvent.repeat.frequency,
                interval: updatedEvent.repeat.interval,
                days: updatedEvent.repeat.days,
                ends: updatedEvent.repeat.ends
              }
            };
          }
          return event;
        })
      );
    }
  };


  const deleteEvent = (eventId, deleteMode = 'single') => {
    // Get information about the event being deleted
    const isInstance = isRecurringInstance(eventId);
    const originalId = getOriginalEventId(eventId);
    const eventToDelete = findEventById(events, eventId);

    // If no event found, return
    if (!eventToDelete) return;

    // For non-recurring events or 'single' deletion of regular events
    if (!eventToDelete.repeat || (!isInstance && !eventToDelete.repeat.seriesId)) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      return;
    }

    // Handle recurring events
    if (deleteMode === 'single') {
      if (isInstance) {
        // For recurring instances, add exception to original event
        const originalEvent = findEventById(events, originalId);
        if (originalEvent) {
          const exceptions = originalEvent.repeat.exceptions || [];
          const exceptionDate = new Date(eventToDelete.date).toISOString();

          setEvents(prevEvents =>
            prevEvents.map(event =>
              event.id === originalId
                ? {
                  ...event,
                  repeat: {
                    ...event.repeat,
                    exceptions: [...exceptions, exceptionDate]
                  }
                }
                : event
            )
          );
        }
      } else {
        // For the original event of a series, add exception for this date
        const exceptions = eventToDelete.repeat.exceptions || [];
        const exceptionDate = new Date(eventToDelete.date).toISOString();

        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === eventId
              ? {
                ...event,
                repeat: {
                  ...event.repeat,
                  exceptions: [...exceptions, exceptionDate]
                }
              }
              : event
          )
        );
      }
      return;
    }

    // If we're deleting all occurrences in the series
    if (deleteMode === 'all') {
      // Get the series ID from the event
      const seriesId = eventToDelete.repeat.seriesId;

      // Remove all events in this series
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
    // Store both the event and whether it's a recurring instance
    setCurrentEvent({
      ...event,
      isRecurringInstance: isRecurringInstance(event.id)
    });

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
    // Store both the event and whether it's a recurring instance
    setCurrentEvent({
      ...event,
      isRecurringInstance: isRecurringInstance(event.id)
    });

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
      const deleteMode = currentEvent?.recurrenceActionType || 'single';
      deleteEvent(currentEvent.id, deleteMode);
      closeDeleteConfirmModal();
    }
  };

  // Modal management for Recurrence Action
  const closeRecurrenceActionModal = () => {
    setIsRecurrenceActionModalOpen(false);
    // setRecurrenceAction(null);
  };

  const handleRecurrenceAction = (actionType) => {
    setCurrentEvent(prev => ({
      ...prev,
      recurrenceActionType: actionType
    }));

    // Now handle modal transitions
    closeRecurrenceActionModal();

    if (recurrenceAction === 'edit') {
      setIsEditEventModalOpen(true);
    } else if (recurrenceAction === 'delete') {
      setIsDeleteConfirmModalOpen(true);
    }
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
    handleRecurrenceAction,
    recurrenceAction
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