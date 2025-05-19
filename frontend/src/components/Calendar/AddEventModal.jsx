// vocalendar/frontend/src/components/Calendar/AddEventModal.jsx
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

const AddEventModal = ({ isOpen, onClose }) => {
    const { selectedDate, addEvent } = useCalendarContext();

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
        setRecurrenceData(prev =>
            handleRecurrenceDataChange(prev, e, selectedDate)
        );
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
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Add New Event">
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

export default AddEventModal;