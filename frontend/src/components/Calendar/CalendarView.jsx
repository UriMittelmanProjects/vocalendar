// vocalendar/frontend/src/components/Calendar/CalendarView.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import components
import CalendarCell from './CalendarCell';
import EventCard from './EventCard';
import TextInputArea from '../General/TextInputArea';
import Navigation from '../Nav/Navigation';
import MobileNav from '../Nav/MobileNav';

// Import utilities
import { getMonthName, generateCalendarDays } from '../../utils/calendarUtils';

// Import mock data
import mockEvents from '../../data/mockEvents';

/**
 * Main Calendar View Component
 */
const CalendarView = () => {
  // State for current date and view
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  // Get events for the selected date
  const selectedDateEvents = mockEvents.filter(
    event => 
      event.date.getFullYear() === selectedDate.getFullYear() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getDate() === selectedDate.getDate()
  );
  
  // Count events per day for the current month view
  const getEventCountForDay = (year, month, day) => {
    return mockEvents.filter(
      event => 
        event.date.getFullYear() === year &&
        event.date.getMonth() === month &&
        event.date.getDate() === day
    ).length;
  };
  
  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Select a date
  const handleDateClick = (year, month, day) => {
    setSelectedDate(new Date(year, month, day));
  };
  
  // Today button
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };
  
  // Generate calendar days array for the current month
  const calendarDays = generateCalendarDays(
    currentYear, 
    currentMonth, 
    selectedDate, 
    getEventCountForDay
  );
  
  // Week days header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      
      <div className="flex-1 overflow-auto pb-16 md:pb-0">
        <div className="container mx-auto p-4">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{getMonthName(currentMonth)} {currentYear}</h2>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevMonth}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Previous month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={goToToday}
                className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
              >
                Today
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={goToNextMonth}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Next month"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="mb-6 bg-white rounded-lg shadow-md p-2">
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => (
                <CalendarCell
                  key={index}
                  day={day.day}
                  month={day.month}
                  year={day.year}
                  isCurrentMonth={day.isCurrentMonth}
                  isToday={day.isToday}
                  isSelected={day.isSelected}
                  hasEvents={day.events}
                  onClick={() => handleDateClick(day.year, day.month, day.day)}
                />
              ))}
            </div>
          </div>
          
          {/* Selected Date Events */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            
            {selectedDateEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No events scheduled for this day</p>
            ) : (
              <div className="space-y-2">
                {selectedDateEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full p-2 rounded-md border border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              + Add Event
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Text Input Area */}
      <div className="fixed bottom-0 left-0 right-0 md:static">
        <TextInputArea />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default CalendarView;