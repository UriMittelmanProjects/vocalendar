// vocalendar/frontend/src/components/Calendar/EditEventModal.jsx
import React, { useState, useEffect } from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import ModalWrapper from './ModalWrapper';
import EventFormFields from './EventFormFields';
import RecurrenceOptions from './RecurrenceOptions';
import NotificationOptions, { NOTIFICATION_OPTIONS } from './NotificationOptions';
import FormActions from './FormActions';
import {
    formatDateForInput,
    addNotificationToForm,
    removeNotificationFromForm,
    handleRecurrenceDataChange
} from '../../utils/formUtils';

const EditEventModal = ({ isOpen, onClose, event }) => {
    const { updateEvent } = useCalendarContext();

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

    // State for showing recurrence options
    const [showRecurrence, setShowRecurrence] = useState(false);

    // State for recurrence settings
    const [recurrenceData, setRecurrenceData] = useState({
        frequency: 'daily',
        interval: 1,
        days: [0], // Default to Sunday
        ends: {
            type: 'never'
        }
    });

    // Set initial form data when event changes
    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                date: formatDateForInput(event.date),
                startTime: event.startTime,
                endTime: event.endTime,
                location: event.location || '',
                description: event.description || '',
                isTentative: event.isTentative || false,
                notifications: event.notifications || []
            });

            // Set recurrence data if event is recurring
            if (event.repeat) {
                setShowRecurrence(true);
                setRecurrenceData({
                    frequency: event.repeat.frequency,
                    interval: event.repeat.interval,
                    days: event.repeat.days || [event.date.getDay()],
                    ends: {
                        type: event.repeat.ends?.type || 'never',
                        occurrences: event.repeat.ends?.occurrences || 10,
                        date: event.repeat.ends?.date || null
                    },
                    seriesId: event.repeat.seriesId
                });
            } else {
                setShowRecurrence(false);
                // Initialize with default values based on event date
                setRecurrenceData({
                    frequency: 'daily',
                    interval: 1,
                    days: [event.date.getDay()],
                    ends: {
                        type: 'never'
                    }
                });
            }
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

    const handleRecurrenceChange = (e) => {
        setRecurrenceData(prev =>
            handleRecurrenceDataChange(prev, e, event?.date || new Date())
        );
    };

    const toggleRecurrence = () => {
        setShowRecurrence(!showRecurrence);
    };

    const addNotification = () => {
        setFormData(prev =>
            addNotificationToForm(prev, selectedNotification, NOTIFICATION_OPTIONS)
        );
        setSelectedNotification(null);
    };

    const removeNotification = (index) => {
        setFormData(prev => removeNotificationFromForm(prev, index));
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
            notifications: formData.notifications,
            repeat: showRecurrence ? {
                ...recurrenceData,
                // Keep the series ID if it's part of a series already
                seriesId: event.repeat?.seriesId || recurrenceData.seriesId
            } : null
        };

        // Determine the update mode based on recurrenceActionType
        const updateMode = event.recurrenceActionType || 'single';

        // Update event
        updateEvent(updatedEvent, updateMode);

        // Close modal
        onClose();
    };

    if (!isOpen || !event) return null;

    // Calculate default "ends on" date (1 month from now)
    const defaultEndsOnDate = new Date(event.date);
    defaultEndsOnDate.setMonth(defaultEndsOnDate.getMonth() + 1);
    const formattedEndsOnDate = formatDateForInput(defaultEndsOnDate);

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Edit Event">
            <form onSubmit={handleSubmit}>
                <EventFormFields
                    formData={formData}
                    handleChange={handleChange}
                    formatDateForInput={formatDateForInput}
                />

                <RecurrenceOptions
                    showRecurrence={showRecurrence}
                    toggleRecurrence={toggleRecurrence}
                    recurrenceData={recurrenceData}
                    handleRecurrenceChange={handleRecurrenceChange}
                    formatDateForInput={formatDateForInput}
                    formattedEndsOnDate={formattedEndsOnDate}
                />

                <NotificationOptions
                    formData={formData}
                    selectedNotification={selectedNotification}
                    setSelectedNotification={setSelectedNotification}
                    addNotification={addNotification}
                    removeNotification={removeNotification}
                />

                <FormActions
                    onCancel={onClose}
                    submitLabel={event ? 'Save Changes' : 'Save Event'}
                />
            </form>
        </ModalWrapper>
    );
};

export default EditEventModal;