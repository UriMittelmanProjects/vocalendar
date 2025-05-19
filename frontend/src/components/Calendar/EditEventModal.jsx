// vocalendar/frontend/src/components/Calendar/EditEventModal.jsx
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

const EditEventModal = ({ isOpen, onClose, event }) => {
  const { updateEvent } = useCalendarContext();
  
  // Format the date for the date input
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Initialize form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    isTentative: false,
    notifications: []
  });
  
  // State for notification dropdown
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  // Set initial form data when event changes
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        date: formatDateForInput(event.date),
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        description: event.description,
        isTentative: event.isTentative,
        notifications: event.notifications || []
      });
    }
  }, [event]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
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
    
    // Create updated event object
    const [year, month, day] = formData.date.split('-').map(num => parseInt(num, 10));
    
    // Create date using local date components (month is 0-indexed in JavaScript Date)
    const eventDate = new Date(year, month - 1, day);
    
    const updatedEvent = {
      ...event, // Keep the original id and any other properties
      title: formData.title,
      date: eventDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      description: formData.description,
      isTentative: formData.isTentative,
      notifications: formData.notifications
    };
    
    // Update event
    updateEvent(updatedEvent);
    
    // Close modal
    onClose();
  };
  
  if (!isOpen || !event) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Event</h2>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;