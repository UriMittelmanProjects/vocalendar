// vocalendar/frontend/src/utils/calendarUtils.js
/**
 * Get the number of days in a month
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the day of week (0-6) for the first day of the month
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Get the month name from month number
 */
export const getMonthName = (month) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
};

/**
 * Generate calendar days array with appropriate metadata
 */
export const generateCalendarDays = (currentYear, currentMonth, selectedDate, getEventCountForDay) => {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Previous month days to fill the start of the grid
  const prevMonthDays = firstDayOfMonth;
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
  
  // Calculate total days needed to display complete weeks
  const totalDaysInGrid = Math.ceil((daysInMonth + prevMonthDays) / 7) * 7;
  const nextMonthDays = totalDaysInGrid - daysInMonth - prevMonthDays;
  
  // Next month details
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  
  const calendarDays = [];
  const today = new Date();
  
  // Previous month days
  for (let i = 0; i < prevMonthDays; i++) {
    const day = daysInPrevMonth - prevMonthDays + i + 1;
    calendarDays.push({
      day,
      month: prevMonth,
      year: prevMonthYear,
      isCurrentMonth: false,
      isToday: false,
      isSelected: 
        selectedDate && 
        day === selectedDate.getDate() && 
        prevMonth === selectedDate.getMonth() && 
        prevMonthYear === selectedDate.getFullYear(),
      events: getEventCountForDay(prevMonthYear, prevMonth, day)
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: currentMonth,
      year: currentYear,
      isCurrentMonth: true,
      isToday: 
        i === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear(),
      isSelected: 
        selectedDate && 
        i === selectedDate.getDate() && 
        currentMonth === selectedDate.getMonth() && 
        currentYear === selectedDate.getFullYear(),
      events: getEventCountForDay(currentYear, currentMonth, i)
    });
  }
  
  // Next month days
  for (let i = 1; i <= nextMonthDays; i++) {
    calendarDays.push({
      day: i,
      month: nextMonth,
      year: nextMonthYear,
      isCurrentMonth: false,
      isToday: false,
      isSelected: 
        selectedDate && 
        i === selectedDate.getDate() && 
        nextMonth === selectedDate.getMonth() && 
        nextMonthYear === selectedDate.getFullYear(),
      events: getEventCountForDay(nextMonthYear, nextMonth, i)
    });
  }
  
  return calendarDays;
};

/**
 * Check if a date is in a repeating series
 */
export const isDateInSeries = (date, event) => {
  if (!event.repeat) return false;
  
  const originalDate = new Date(event.date);
  const targetDate = new Date(date);
  const { frequency, interval, days, ends } = event.repeat;
  
  // Check end date constraints
  if (ends) {
    if (ends.type === 'on' && targetDate > new Date(ends.date)) {
      return false;
    }
    
    // For 'after' type, we'll check during series generation
  }
  
  // Check if target date is before the original event date
  if (targetDate < originalDate) {
    return false;
  }
  
  // Handle different frequencies
  switch (frequency) {
    case 'daily':
      // Calculate days between dates
      const dayDiff = Math.floor((targetDate - originalDate) / (1000 * 60 * 60 * 24));
      return dayDiff % interval === 0;
      
    case 'weekly':
      // Check if it's the right day of the week
      const dayOfWeek = targetDate.getDay();
      if (!days.includes(dayOfWeek)) {
        return false;
      }
      
      // Check if it's the right interval of weeks
      const weekDiff = Math.floor((targetDate - originalDate) / (1000 * 60 * 60 * 24 * 7));
      return weekDiff % interval === 0;
      
    case 'monthly':
      // Get difference in months
      const monthDiff = (targetDate.getFullYear() - originalDate.getFullYear()) * 12 + 
                       (targetDate.getMonth() - originalDate.getMonth());
                       
      // If not at the right interval of months, return false
      if (monthDiff % interval !== 0) {
        return false;
      }
      
      // Check if it's the right day of the month
      return targetDate.getDate() === originalDate.getDate();
      
    case 'yearly':
      // Check if it's the same month and day
      if (targetDate.getMonth() !== originalDate.getMonth() || 
          targetDate.getDate() !== originalDate.getDate()) {
        return false;
      }
      
      // Check if it's the right interval of years
      const yearDiff = targetDate.getFullYear() - originalDate.getFullYear();
      return yearDiff % interval === 0;
      
    default:
      return false;
  }
};

/**
 * Generate occurrences for a repeating event within a date range
 */
/**
 * Generate occurrences for a repeating event within a date range
 */
export const generateOccurrences = (event, startDate, endDate, limit = 100) => {
  if (!event.repeat) return [event];
  
  const occurrences = [];
  const { frequency, interval, days, ends } = event.repeat;
  const originalDate = new Date(event.date);
  
  // Get exceptions list (dates to skip)
  const exceptions = event.repeat.exceptions || [];
  
  let currentDate = new Date(originalDate);
  let count = 0;
  
  // Add the original event if it's not in exceptions
  const originalDateISO = originalDate.toISOString().split('T')[0];
  const isOriginalExcepted = exceptions.some(exception => {
    const exceptionDate = new Date(exception);
    return exceptionDate.toISOString().split('T')[0] === originalDateISO;
  });
  
  if (currentDate >= startDate && currentDate <= endDate && !isOriginalExcepted) {
    occurrences.push({...event});
  }
  
  // Set up the loop based on frequency
  switch (frequency) {
    case 'daily':
      while (currentDate <= endDate && count < limit) {
        // Move to next day
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + interval);
        
        // Check exceptions
        const currentDateISO = currentDate.toISOString().split('T')[0];
        const isExcepted = exceptions.some(exception => {
          const exceptionDate = new Date(exception);
          return exceptionDate.toISOString().split('T')[0] === currentDateISO;
        });
        
        if (currentDate >= startDate && currentDate <= endDate && !isExcepted) {
          const occurrence = {
            ...event,
            id: `${event.id}-${count}`,
            date: new Date(currentDate)
          };
          occurrences.push(occurrence);
        }
        
        count++;
        
        // Check end conditions
        if (ends.type === 'after' && count >= ends.occurrences) break;
        if (ends.type === 'on' && currentDate > new Date(ends.date)) break;
      }
      break;
      
    case 'weekly':
      // For each specified day of the week
      while (currentDate <= endDate && count < limit) {
        // Move to next week
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + (7 * interval));
        
        // Check each day in the week
        for (const day of days) {
          const dayDiff = day - currentDate.getDay();
          const dateForDay = new Date(currentDate);
          dateForDay.setDate(dateForDay.getDate() + dayDiff);
          
          // Check exceptions
          const dateForDayISO = dateForDay.toISOString().split('T')[0];
          const isExcepted = exceptions.some(exception => {
            const exceptionDate = new Date(exception);
            return exceptionDate.toISOString().split('T')[0] === dateForDayISO;
          });
          
          if (dateForDay >= startDate && dateForDay <= endDate && dateForDay >= originalDate && !isExcepted) {
            const occurrence = {
              ...event,
              id: `${event.id}-${count}`,
              date: new Date(dateForDay)
            };
            occurrences.push(occurrence);
            count++;
          }
        }
        
        // Check end conditions
        if (ends.type === 'after' && count >= ends.occurrences) break;
        if (ends.type === 'on' && currentDate > new Date(ends.date)) break;
      }
      break;
      
    case 'monthly':
      while (currentDate <= endDate && count < limit) {
        // Move to next month
        currentDate = new Date(currentDate);
        currentDate.setMonth(currentDate.getMonth() + interval);
        
        // Check exceptions
        const currentDateISO = currentDate.toISOString().split('T')[0];
        const isExcepted = exceptions.some(exception => {
          const exceptionDate = new Date(exception);
          return exceptionDate.toISOString().split('T')[0] === currentDateISO;
        });
        
        if (currentDate >= startDate && currentDate <= endDate && !isExcepted) {
          const occurrence = {
            ...event,
            id: `${event.id}-${count}`,
            date: new Date(currentDate)
          };
          occurrences.push(occurrence);
        }
        
        count++;
        
        // Check end conditions
        if (ends.type === 'after' && count >= ends.occurrences) break;
        if (ends.type === 'on' && currentDate > new Date(ends.date)) break;
      }
      break;
      
    case 'yearly':
      while (currentDate <= endDate && count < limit) {
        // Move to next year
        currentDate = new Date(currentDate);
        currentDate.setFullYear(currentDate.getFullYear() + interval);
        
        // Check exceptions
        const currentDateISO = currentDate.toISOString().split('T')[0];
        const isExcepted = exceptions.some(exception => {
          const exceptionDate = new Date(exception);
          return exceptionDate.toISOString().split('T')[0] === currentDateISO;
        });
        
        if (currentDate >= startDate && currentDate <= endDate && !isExcepted) {
          const occurrence = {
            ...event,
            id: `${event.id}-${count}`,
            date: new Date(currentDate)
          };
          occurrences.push(occurrence);
        }
        
        count++;
        
        // Check end conditions
        if (ends.type === 'after' && count >= ends.occurrences) break;
        if (ends.type === 'on' && currentDate > new Date(ends.date)) break;
      }
      break;
  }
  
  return occurrences;
};