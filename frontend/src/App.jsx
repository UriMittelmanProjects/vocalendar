// vocalendar/frontend/src/App.jsx
import React from 'react';
import './App.css';
import CalendarContainer from './components/Calendar/CalendarContainer';
import EnhancedNavBar from './components/Navigation/EnhancedNavBar';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <header className="bg-purple-800 text-white p-4 rounded-lg mb-4">
        <h1 className="text-xl font-bold">Vocalendar</h1>
      </header>
      <main className="pb-16 md:pb-4 md:ml-16">
        <CalendarContainer />
      </main>
      <EnhancedNavBar />
    </div>
  );
}

export default App;