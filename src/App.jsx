import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { UseLocalStorage } from './hooks/UseLocalStorage'
import { UseWeather } from './hooks/UseWeather';

import Header from './components/Header';
import WeatherDisplay from './components/WeatherDisplay';
import JournalForm from './components/JournalForm';
import ToolsSection from './components/ToolsSection';
import CalendarView from './components/CalendarView';
import StatsModal from './components/StatsModal';
import SuccessAlert from './components/SuccessAlert';

const MoodJournalApp = () => {
  const { darkMode } = useTheme();
  const [entries, setEntries] = UseLocalStorage('moodEntries', []);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { weather, isLoading, error } = UseWeather();

  const handleSaveEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
    setSuccessMessage("Journal entry saved successfully!");
  };

  const handleDismissSuccess = () => {
    setSuccessMessage("");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header onCalendarToggle={() => setShowCalendar(!showCalendar)} />
      
      <main className="container mx-auto px-4 py-8">
        <WeatherDisplay 
          weather={weather} 
          isLoading={isLoading} 
          error={error} 
        />
        
        <SuccessAlert 
          message={successMessage} 
          onDismiss={handleDismissSuccess} 
        />
      
        <JournalForm 
          onSaveEntry={handleSaveEntry} 
          weather={weather} 
        />
        
        <ToolsSection 
          entries={entries}  
        />
      </main>

      {showCalendar && (
        <CalendarView
          entries={entries}
          onClose={() => setShowCalendar(false)}
        />
      )}

      {showStats && (
        <StatsModal
          entries={entries}
          onClose={() => setShowStats(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MoodJournalApp />
    </ThemeProvider>
  );
}