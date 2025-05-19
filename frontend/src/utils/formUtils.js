// vocalendar/frontend/src/utils/formUtils.js
/**
 * Format a date object for an HTML date input
 */
export const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Add notification to form data
 */
export const addNotificationToForm = (formData, selectedNotification, notificationOptions) => {
  if (!selectedNotification) return formData;
  
  const notificationOption = notificationOptions.find(
    option => option.value === parseInt(selectedNotification, 10)
  );
  
  if (notificationOption) {
    // Check if this notification is already added
    const alreadyExists = formData.notifications.some(
      n => n.value === notificationOption.value
    );
    
    if (!alreadyExists) {
      return {
        ...formData,
        notifications: [...formData.notifications, notificationOption]
      };
    }
  }
  
  return formData;
};

/**
 * Remove notification from form data at a given index
 */
export const removeNotificationFromForm = (formData, index) => {
  return {
    ...formData,
    notifications: formData.notifications.filter((_, i) => i !== index)
  };
};

/**
 * Handle recurrence change based on input type
 */
export const handleRecurrenceDataChange = (recurrenceData, e, selectedDate) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === 'checkbox' ? checked : value;
  
  if (name === 'frequency') {
    // When changing frequency, reset interval to 1
    return {
      ...recurrenceData,
      [name]: newValue,
      interval: 1,
      // If switching to weekly, set default days
      days: newValue === 'weekly' ? [selectedDate.getDay()] : recurrenceData.days
    };
  } else if (name === 'endsType') {
    return {
      ...recurrenceData,
      ends: {
        ...recurrenceData.ends,
        type: newValue
      }
    };
  } else if (name === 'endsAfter') {
    return {
      ...recurrenceData,
      ends: {
        ...recurrenceData.ends,
        type: 'after',
        occurrences: parseInt(newValue, 10)
      }
    };
  } else if (name === 'endsOn') {
    return {
      ...recurrenceData,
      ends: {
        ...recurrenceData.ends,
        type: 'on',
        date: new Date(newValue)
      }
    };
  } else if (name === 'interval') {
    return {
      ...recurrenceData,
      [name]: parseInt(newValue, 10)
    };
  } else if (name.startsWith('day-')) {
    // Handle weekly day selection checkboxes
    const dayIndex = parseInt(name.replace('day-', ''), 10);
    const newDays = [...recurrenceData.days];
    
    if (checked) {
      // Add day if it's not already included
      if (!newDays.includes(dayIndex)) {
        newDays.push(dayIndex);
        newDays.sort(); // Keep in order
      }
    } else {
      // Remove day if present
      const dayIdx = newDays.indexOf(dayIndex);
      if (dayIdx !== -1 && newDays.length > 1) { // Don't remove last day
        newDays.splice(dayIdx, 1);
      }
    }
    
    return {
      ...recurrenceData,
      days: newDays
    };
  } else {
    return {
      ...recurrenceData,
      [name]: newValue
    };
  }
};