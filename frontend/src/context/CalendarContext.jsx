// vocalendar/frontend/src/context/CalendarContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { generateCalendarDays } from '../utils/calendarUtils';
import mockEvents from '../data/mockEvents';

// Utility function to generate recurring event instances
const generateRecurringInstances = (event, startDate, endDate) => {
  if (!event.isRecurring || !event.recurrenceRule) return [event];

  const instances = [];
  const rule = event.recurrenceRule;
  let currentDate = new Date(event.date);
  let count = 0;

  // Convert endDate string to Date object if needed
  const ruleEndDate = rule.endDate ? (typeof rule.endDate === 'string' ? new Date(rule.endDate) : rule.endDate) : null;

  while (currentDate <= endDate && (rule.count === null || count < rule.count)) {
    if (currentDate >= startDate) {
      if (rule.frequency === 'weekly' && rule.daysOfWeek.length > 0) {
        // For weekly events, check if current date matches selected days
        if (rule.daysOfWeek.includes(currentDate.getDay())) {
          instances.push({
            ...event,
            id: `${event.id}-${currentDate.getTime()}`,
            date: new Date(currentDate),
            isRecurringInstance: true,
            originalEventId: event.id
          });
          count++;
        }
      } else {
        instances.push({
          ...event,
          id: `${event.id}-${currentDate.getTime()}`,
          date: new Date(currentDate),
          isRecurringInstance: true,
          originalEventId: event.id
        });
        count++;
      }
    }

    // Move to next occurrence
    switch (rule.frequency) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + rule.interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + rule.interval);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + rule.interval);
        break;
      default:
        break;
    }

    if (ruleEndDate && currentDate > ruleEndDate) break;
  }

  return instances;
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
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentView, setCurrentView] = useState('month');

  // Generate expanded events with recurring instances
  const expandedEvents = React.useMemo(() => {
    const startDate = new Date(currentYear - 1, 0, 1);
    const endDate = new Date(currentYear + 1, 11, 31);

    const allEvents = [];
    events.forEach(event => {
      if (event.isRecurring) {
        const instances = generateRecurringInstances(event, startDate, endDate);
        allEvents.push(...instances);
      } else {
        allEvents.push(event);
      }
    });

    return allEvents;
  }, [events, currentYear]);

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
  const selectedDateEvents = expandedEvents.filter(
    event =>
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );

  // Count events for day
  const getEventCountForDay = (year, month, day) => {
    return expandedEvents.filter(
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
    events: expandedEvents,
    originalEvents: events,
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
    currentView,
    setCurrentView
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);