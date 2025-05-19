// vocalendar/frontend/src/data/mockEvents.js

// Sample event data for prototyping
const mockEvents = [
  { 
    id: 1, 
    title: 'Team Meeting', 
    date: new Date(2025, 4, 20), 
    startTime: '10:00', 
    endTime: '11:00', 
    location: 'Conference Room A',
    description: 'Weekly team sync to discuss project progress.',
    isTentative: false,
    notifications: [
      { value: 10, unit: 'minute', label: '10 minutes before' }
    ],
    repeat: {
      frequency: 'weekly',
      days: [1], // Monday (0-6, where 0 is Sunday)
      interval: 1, // Every week
      ends: {
        type: 'after',
        occurrences: 10
      },
      seriesId: 'series-1', // All events in the same series share this ID
    }
  },
  { 
    id: 2, 
    title: 'Lunch with Sara', 
    date: new Date(2025, 4, 20), 
    startTime: '13:00', 
    endTime: '14:00', 
    location: 'Café Downtown',
    description: 'Catching up with Sara from marketing.',
    isTentative: false,
    notifications: [],
    repeat: null
  },
  { 
    id: 3, 
    title: 'Dentist Appointment', 
    date: new Date(2025, 4, 22), 
    startTime: '15:30', 
    endTime: '16:30', 
    location: 'Dental Clinic',
    description: 'Regular checkup.',
    isTentative: false,
    notifications: [
      { value: 60, unit: 'minute', label: '1 hour before' }
    ],
    repeat: null
  },
  { 
    id: 4, 
    title: 'Starbucks Coffee', 
    date: new Date(2025, 4, 20), 
    startTime: '17:00', 
    endTime: '18:00', 
    location: 'Starbucks, 19122 Beardslee Blvd #208, Bothell, WA 98011',
    description: '',
    isTentative: false,
    notifications: [],
    repeat: null
  },
  { 
    id: 5, 
    title: 'Project Deadline', 
    date: new Date(2025, 4, 25), 
    startTime: '09:00', 
    endTime: '18:00', 
    location: 'Remote',
    description: 'Final submission of the Vocalendar project.',
    isTentative: false,
    notifications: [
      { value: 1440, unit: 'minute', label: '1 day before' },
      { value: 120, unit: 'minute', label: '2 hours before' }
    ],
    repeat: null
  },
  {
    id: 6,
    title: 'Halloween',
    date: new Date(2025, 9, 31), // October 31, 2025
    startTime: '00:00',
    endTime: '23:59',
    location: '',
    description: 'Halloween holiday.',
    isTentative: true,
    notifications: [],
    repeat: {
      frequency: 'yearly',
      interval: 1, // Every year
      ends: {
        type: 'never'
      },
      seriesId: 'series-2'
    }
  },
  {
    id: 7,
    title: 'Weekly Gym Session',
    date: new Date(2025, 4, 19), // May 19, 2025
    startTime: '18:00',
    endTime: '19:30',
    location: 'City Fitness Center',
    description: 'Cardio and weights workout.',
    isTentative: false,
    notifications: [
      { value: 60, unit: 'minute', label: '1 hour before' }
    ],
    repeat: {
      frequency: 'weekly',
      days: [1, 3, 5], // Monday, Wednesday, Friday
      interval: 1, // Every week
      ends: {
        type: 'on',
        date: new Date(2025, 6, 31) // July 31, 2025
      },
      seriesId: 'series-3'
    }
  }
];

export default mockEvents;