// vocalendar/frontend/src/components/Calendar/AddEventModal.jsx
import React, { useState, useEffect } from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const NOTIFICATION_OPTIONS = [
  { value: 10, unit: 'minute', label: '10 minutes before' },
  { value: 30, unit: 'minute', label: '30 minutes before' },
  { value: 60, unit: 'minute', label: '1 hour before' },
  { value: 120, unit: 'minute', label: '2 hours before' },
  { value: 300, unit: 'minute', label: '5 hours before' },
  { value: 1440, unit: 'minute', label: '1 day before' },
  { value: 4320, unit: 'minute', label: '3 days before' },
];

const AddEventModal = ({ isOpen, onClose }) => {
  const { selectedDate, addEvent } = useCalendarContext();
  
  // Format the selected date for the date input
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Initialize form with current selected date
  const [formData, setFormData] = useState({
    title: '',
    date: formatDateForInput(selectedDate),
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    description: '',
    isTentative: false,
    notifications: [],
    repeat: null
  });
  
  // State for notification dropdown
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  // State for showing recurrence options
  const [showRecurrence, setShowRecurrence] = useState(false);
  
  // State for recurrence settings
  const [recurrenceData, setRecurrenceData] = useState({
    frequency: 'daily',
    interval: 1,
    days: [selectedDate.getDay()], // Default to current day of week
    ends: {
      type: 'never'
    }
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleRecurrenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    if (name === 'frequency') {
      // When changing frequency, reset interval to 1
      setRecurrenceData(prev => ({
        ...prev,
        [name]: newValue,
        interval: 1,
        // If switching to weekly, set default days
        days: newValue === 'weekly' ? [selectedDate.getDay()] : prev.days
      }));
    } else if (name === 'endsType') {
      setRecurrenceData(prev => ({
        ...prev,
        ends: {
          ...prev.ends,
          type: newValue
        }
      }));
    } else if (name === 'endsAfter') {
      setRecurrenceData(prev => ({
        ...prev,
        ends: {
          ...prev.ends,
          type: 'after',
          occurrences: parseInt(newValue, 10)
        }
      }));
    } else if (name === 'endsOn') {
      setRecurrenceData(prev => ({
        ...prev,
        ends: {
          ...prev.ends,
          type: 'on',
          date: new Date(newValue)
        }
      }));
    } else if (name === 'interval') {
      setRecurrenceData(prev => ({
        ...prev,
        [name]: parseInt(newValue, 10)
      }));
    } else if (name.startsWith('day-')) {
      // Handle weekly day selection checkboxes
      const dayIndex = parseInt(name.replace('day-', ''), 10);
      
      setRecurrenceData(prev => {
        const newDays = [...prev.days];
        
        if (checked) {
          // Add day if it's not already included
          if (!newDays.includes(dayIndex)) {
            newDays.push(dayIndex);
            newDays.sort(); // Keep in order
          }
        } else {
          // Remove day if present
          const dayIdx = newDays.indexOf(dayIndex);
          if (dayIdx !== -1) {
            newDays.splice(dayIdx, 1);
          }
        }
        
        return {
          ...prev,
          days: newDays
        };
      });
    } else {
      setRecurrenceData(prev => ({
        ...prev,
        [name]: newValue
      }));
    }
  };
  
  const toggleRecurrence = () => {
    setShowRecurrence(!showRecurrence);
    
    // If turning off recurrence, set repeat to null
    if (showRecurrence) {
      setFormData(prev => ({
        ...prev,
        repeat: null
      }));
    }
  };
  
  const addNotification = () => {
    if (!selectedNotification) return;
    
    const notificationOption = NOTIFICATION_OPTIONS.find(
      option => option.value === parseInt(selectedNotification, 10)
    );
    
    if (notificationOption) {
      // Check if this notification is already added
      const alreadyExists = formData.notifications.some(
        n => n.value === notificationOption.value
      );
      
      if (!alreadyExists) {
        setFormData(prev => ({
          ...prev,
          notifications: [...prev.notifications, notificationOption]
        }));
        
        // Reset selection
        setSelectedNotification(null);
      }
    }
  };
  
  const removeNotification = (index) => {
    setFormData(prev => ({
      ...prev,
      notifications: prev.notifications.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create event object
    // Fix the date handling by properly parsing the form date
    const [year, month, day] = formData.date.split('-').map(num => parseInt(num, 10));
    
    // Create date using local date components (month is 0-indexed in JavaScript Date)
    const eventDate = new Date(year, month - 1, day);
    
    const newEvent = {
      id: Date.now(), // Simple unique ID generation
      title: formData.title,
      date: eventDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      description: formData.description,
      isTentative: formData.isTentative,
      notifications: formData.notifications,
      repeat: showRecurrence ? { ...recurrenceData } : null
    };
    
    // Add event
    addEvent(newEvent);
    
    // Close modal and reset form
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      date: formatDateForInput(selectedDate),
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      description: '',
      isTentative: false,
      notifications: [],
      repeat: null
    });
    setSelectedNotification(null);
    setShowRecurrence(false);
  };
  
  // Keep the form date updated when selectedDate changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: formatDateForInput(selectedDate)
    }));
    
    // Also update the default day of week for recurrence
    setRecurrenceData(prev => ({
      ...prev,
      days: [selectedDate.getDay()]
    }));
  }, [selectedDate]);
  
  if (!isOpen) return null;
  
  // Calculate default "ends on" date (1 month from now)
  const defaultEndsOnDate = new Date(selectedDate);
  defaultEndsOnDate.setMonth(defaultEndsOnDate.getMonth() + 1);
  const formattedEndsOnDate = formatDateForInput(defaultEndsOnDate);
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Event</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {/* Recurrence Toggle */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="repeat"
                  checked={showRecurrence}
                  onChange={toggleRecurrence}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="repeat" className="ml-2 block text-sm text-gray-700">
                  Repeat
                </label>
              </div>
            </div>
          </div>
          
          {/* Recurrence Options */}
          {showRecurrence && (
            <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="mb-3">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={recurrenceData.frequency}
                  onChange={handleRecurrenceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat every
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="interval"
                    name="interval"
                    min="1"
                    max="99"
                    value={recurrenceData.interval}
                    onChange={handleRecurrenceChange}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {recurrenceData.frequency === 'daily' ? 'day(s)' : 
                     recurrenceData.frequency === 'weekly' ? 'week(s)' :
                     recurrenceData.frequency === 'monthly' ? 'month(s)' : 'year(s)'}
                  </span>
                </div>
              </div>
              
              {/* Weekly specific options */}
              {recurrenceData.frequency === 'weekly' && (
                <div className="mb-3">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-1">
                      Repeat on
                    </legend>
                    <div className="grid grid-cols-7 gap-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <div key={index} className="flex justify-center">
                          <label className="flex flex-col items-center">
                            <input
                              type="checkbox"
                              name={`day-${index}`}
                              checked={recurrenceData.days.includes(index)}
                              onChange={handleRecurrenceChange}
                              className="sr-only"
                            />
                            <span 
                              className={`
                                w-8 h-8 flex items-center justify-center rounded-full text-xs
                                ${recurrenceData.days.includes(index) 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-gray-200 text-gray-700'}
                              `}
                            >
                              {day}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}
              
              {/* Ends options */}
              <div className="mb-3">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-700 mb-1">
                    Ends
                  </legend>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ends-never"
                        name="endsType"
                        value="never"
                        checked={recurrenceData.ends.type === 'never'}
                        onChange={handleRecurrenceChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label htmlFor="ends-never" className="ml-2 block text-sm text-gray-700">
                        Never
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ends-after"
                        name="endsType"
                        value="after"
                        checked={recurrenceData.ends.type === 'after'}
                        onChange={handleRecurrenceChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label htmlFor="ends-after" className="ml-2 block text-sm text-gray-700">
                        After
                      </label>
                      <input
                        type="number"
                        name="endsAfter"
                        min="1"
                        max="999"
                        value={recurrenceData.ends.occurrences || 10}
                        onChange={handleRecurrenceChange}
                        className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={recurrenceData.ends.type !== 'after'}
                      />
                      <span className="ml-2 text-sm text-gray-700">occurrence(s)</span>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ends-on"
                        name="endsType"
                        value="on"
                        checked={recurrenceData.ends.type === 'on'}
                        onChange={handleRecurrenceChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label htmlFor="ends-on" className="ml-2 block text-sm text-gray-700">
                        On
                      </label>
                      <input
                        type="date"
                        name="endsOn"
                        value={recurrenceData.ends.date ? formatDateForInput(new Date(recurrenceData.ends.date)) : formattedEndsOnDate}
                        onChange={handleRecurrenceChange}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={recurrenceData.ends.type !== 'on'}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isTentative"
                name="isTentative"
                checked={formData.isTentative}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isTentative" className="ml-2 block text-sm text-gray-700">
                My involvement in this event is tentative
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notifications
            </label>
            
            {formData.notifications.length > 0 && (
              <div className="mb-3 space-y-2">
                {formData.notifications.map((notification, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span className="text-sm text-gray-700">{notification.label}</span>
                    <button
                      type="button"
                      onClick={() => removeNotification(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <select
                value={selectedNotification || ''}
                onChange={(e) => setSelectedNotification(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select notification time</option>
                {NOTIFICATION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={addNotification}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                disabled={!selectedNotification}
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;