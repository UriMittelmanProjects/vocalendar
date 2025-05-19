// vocalendar/frontend/src/components/Calendar/EventsList.jsx
import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import EventCard from './EventCard';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const EventsList = () => {
  const { 
    selectedDate, 
    selectedDateEvents, 
    isAddEventModalOpen, 
    openAddEventModal, 
    closeAddEventModal,
    isEditEventModalOpen,
    closeEditEventModal,
    currentEvent,
    isDeleteConfirmModalOpen,
    closeDeleteConfirmModal,
    confirmDeleteEvent
  } = useCalendarContext();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">
        {selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })}
      </h3>
      
      {selectedDateEvents.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          No events scheduled for this day
        </div>
      ) : (
        <div className="space-y-3">
          {selectedDateEvents
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(event => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      )}
      
      <button
        className="mt-4 w-full p-2 rounded-md border border-purple-500 text-purple-600 hover:bg-purple-50"
        onClick={openAddEventModal}
      >
        + Add Event
      </button>
      
      {/* Event Modals */}
      <AddEventModal 
        isOpen={isAddEventModalOpen} 
        onClose={closeAddEventModal} 
      />
      
      <EditEventModal 
        isOpen={isEditEventModalOpen} 
        onClose={closeEditEventModal} 
        event={currentEvent}
      />
      
      <DeleteConfirmModal 
        isOpen={isDeleteConfirmModalOpen} 
        onClose={closeDeleteConfirmModal}
        onConfirm={confirmDeleteEvent}
        eventTitle={currentEvent?.title || ''}
      />
    </div>
  );
};

export default EventsList;