// vocalendar/frontend/src/App.jsx
import React from 'react';
import './App.css';
import CalendarContainer from './components/Calendar/CalendarContainer';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 p-4">
      <header className="bg-purple-800 text-white p-4 rounded-lg mb-4">
        <h1 className="text-xl font-bold">Vocalendar</h1>
      </header>
      <main>
        <CalendarContainer />
      </main>
    </div>
  );
}

export default App;