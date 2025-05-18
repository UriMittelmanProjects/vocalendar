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