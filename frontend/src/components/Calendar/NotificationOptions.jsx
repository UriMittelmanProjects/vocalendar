// vocalendar/frontend/src/components/Calendar/NotificationOptions.jsx
import React from 'react';

const NOTIFICATION_OPTIONS = [
  { value: 10, unit: 'minute', label: '10 minutes before' },
  { value: 30, unit: 'minute', label: '30 minutes before' },
  { value: 60, unit: 'minute', label: '1 hour before' },
  { value: 120, unit: 'minute', label: '2 hours before' },
  { value: 300, unit: 'minute', label: '5 hours before' },
  { value: 1440, unit: 'minute', label: '1 day before' },
  { value: 4320, unit: 'minute', label: '3 days before' },
];

const NotificationOptions = ({ 
  formData, 
  selectedNotification, 
  setSelectedNotification, 
  addNotification, 
  removeNotification 
}) => {
  return (
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
  );
};

// Export the NOTIFICATION_OPTIONS to be used in other components
export { NOTIFICATION_OPTIONS };
export default NotificationOptions;