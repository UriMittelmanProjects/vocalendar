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
    ]
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
    notifications: []
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
    ]
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
    notifications: []
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
    ]
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
    notifications: []
  }
];

export default mockEvents;