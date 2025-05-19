// vocalendar/frontend/src/components/Calendar/RecurrenceActionModal.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';

const RecurrenceActionModal = () => {
  const { 
    isRecurrenceActionModalOpen, 
    closeRecurrenceActionModal, 
    handleRecurrenceAction,
    currentEvent
  } = useCalendarContext();

  if (!isRecurrenceActionModalOpen || !currentEvent) return null;

  // Determine if we're editing or deleting
  const isEditing = currentEvent && currentEvent.recurrenceAction === 'edit';
  const modalTitle = isEditing ? 'Edit Recurring Event' : 'Delete Recurring Event';
  const actionText = isEditing ? 'edit' : 'delete';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{modalTitle}</h2>
        
        <p className="mb-6 text-gray-700">
          Would you like to {actionText} just this occurrence or all events in the series?
        </p>
        
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleRecurrenceAction('single')}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Just this occurrence
          </button>
          
          <button
            type="button"
            onClick={() => handleRecurrenceAction('all')}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            All events in the series
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeRecurrenceActionModal}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurrenceActionModal;