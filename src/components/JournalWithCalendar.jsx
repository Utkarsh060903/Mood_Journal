import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import JournalForm from './JournalForm';
import CalendarView from './CalendarView';
import { useTheme } from '../context/ThemeContext';

const JournalWithCalendar = ({ weather }) => {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const { darkMode } = useTheme();

  // Function to handle saving a new journal entry
  const handleSaveEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      date: selectedDate.toISOString(),
    };
    
    setEntries([...entries, newEntry]);
  };

  // When a date is clicked on the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    
    // Check if there are entries for this date
    const entriesForDate = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === date.toDateString();
    });
    
    // If entries exist for this date, show CalendarView with filtered entries
    if (entriesForDate.length > 0) {
      setFilteredEntries(entriesForDate);
      setShowCalendarView(true);
    }
  };

  // Custom tile content to show indicators for dates that have entries
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasEntry = entries.some(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === date.toDateString();
      });
      
      if (hasEntry) {
        return (
          <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {/* Left side: Calendar */}
        <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <div className={`calendar-container ${darkMode ? 'dark-calendar' : ''}`}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              className={`rounded-lg border-none shadow-sm w-full ${darkMode ? 'dark-calendar' : ''}`}
            />
          </div>
          <style jsx>{`
            .dark-calendar {
              background-color: #2d3748;
              color: white;
            }
            .dark-calendar .react-calendar__tile {
              color: white;
              background-color: #2d3748;
            }
            .dark-calendar .react-calendar__tile:enabled:hover,
            .dark-calendar .react-calendar__tile:enabled:focus {
              background-color: #4a5568;
            }
            .dark-calendar .react-calendar__tile--active {
              background-color: #4299e1;
              color: white;
            }
          `}</style>
        </div>

        {/* Right side: Journal Form */}
        <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Journal Entry for {selectedDate.toLocaleDateString()}</h2>
          <JournalForm 
            onSaveEntry={handleSaveEntry} 
            weather={weather} 
            selectedDate={selectedDate}
          />
        </div>
      </div>

      {/* List of recent entries (optional) */}
      <div className={`mt-8 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-4">Recent Entries</h2>
        <div className="space-y-2">
          {entries.length > 0 ? (
            entries
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map(entry => (
                <div 
                  key={entry.id}
                  className={`p-3 rounded ${entry.mood?.color || 'bg-gray-100'} cursor-pointer hover:opacity-90`}
                  onClick={() => {
                    setFilteredEntries([entry]);
                    setShowCalendarView(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{entry.mood?.emoji}</span>
                      <span>{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <span className="text-sm truncate max-w-xs">
                      {entry.note ? `${entry.note.substring(0, 50)}${entry.note.length > 50 ? '...' : ''}` : 'No notes'}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-center">No journal entries yet.</p>
          )}
        </div>
      </div>

      {/* Show CalendarView modal when needed */}
      {showCalendarView && (
        <CalendarView 
          entries={filteredEntries} 
          onClose={() => setShowCalendarView(false)} 
        />
      )}
    </div>
  );
};

export default JournalWithCalendar;