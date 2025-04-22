import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import WeatherIcon from "./WeatherIcon";
import { formatDate } from "../utils/dateUtils";
import { moodOptions } from "../constants/moodOptions";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const CalendarView = ({ entries, onClose }) => {
  const [filterMood, setFilterMood] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { darkMode } = useTheme();

  const getFilteredEntries = () => {
    let filtered = entries;

    if (filterMood) {
      filtered = filtered.filter((entry) => entry.mood.label === filterMood);
    }

    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      filtered = filtered.filter((entry) => {
        // Ensure we're comparing the local date parts, not the full timestamp
        const entryDate = new Date(entry.date);
        const entryYear = entryDate.getFullYear();
        const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0');
        const entryDay = String(entryDate.getDate()).padStart(2, '0');
        const entryDateStr = `${entryYear}-${entryMonth}-${entryDay}`;
        return entryDateStr === dateStr;
      });
    }

    return filtered;
  };

  // Helper function to map weather codes to descriptions
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Unknown",
      1000: "Clear",
      1100: "Mostly Clear",
      1101: "Partly Cloudy",
      1102: "Mostly Cloudy",
      1001: "Cloudy",
      2000: "Fog",
      2100: "Light Fog",
      4000: "Drizzle",
      4001: "Rain",
      4200: "Light Rain",
      4201: "Heavy Rain",
      5000: "Snow",
      5001: "Flurries",
      5100: "Light Snow",
      5101: "Heavy Snow",
      6000: "Freezing Drizzle",
      6001: "Freezing Rain",
      6200: "Light Freezing Rain",
      6201: "Heavy Freezing Rain",
      7000: "Ice Pellets",
      7101: "Heavy Ice Pellets",
      7102: "Light Ice Pellets",
      8000: "Thunderstorm",
    };

    return weatherCodes[code] || "Unknown";
  };

  // Calendar functions
  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Create a date-to-mood mapping using local dates consistently
  const entryDates = entries.reduce((acc, entry) => {
    // Create a date object from the entry date string
    const entryDate = new Date(entry.date);
    
    // Create a date string using the local date components
    // Format: YYYY-MM-DD using local time
    const localYear = entryDate.getFullYear();
    const localMonth = String(entryDate.getMonth() + 1).padStart(2, '0');
    const localDay = String(entryDate.getDate()).padStart(2, '0');
    const localDateStr = `${localYear}-${localMonth}-${localDay}`;
    
    acc[localDateStr] = entry.mood;
    return acc;
  }, {});

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const daysCount = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const days = [];
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysCount; day++) {
      const date = new Date(year, month, day);
      
      // Generate date string in the same format as used for entryDates
      const dateYear = date.getFullYear();
      const dateMonth = String(date.getMonth() + 1).padStart(2, '0');
      const dateDay = String(date.getDate()).padStart(2, '0');
      const dateStr = `${dateYear}-${dateMonth}-${dateDay}`;
      
      const hasEntry = entryDates[dateStr];

      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-10 w-10 rounded-full flex items-center justify-center
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${hasEntry ? `${hasEntry.color} border-2 border-gray-300` : ""}
            hover:bg-gray-200 dark:hover:bg-gray-700`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`relative w-full max-w-4xl max-h-screen overflow-y-auto rounded-lg shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close calendar view"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Your Mood Journal</h2>

        {/* Calendar UI */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={previousMonth}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-lg font-semibold">
              {formatMonthYear(currentMonth)}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-medium">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>

        {getFilteredEntries().length > 0 ? (
          <div className="space-y-4">
            {getFilteredEntries()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((entry) => {
                const weather = entry.weather?.timelines?.minutely?.[0]?.values;
                const weatherCode = weather?.weatherCode;
                const condition = weatherCode
                  ? getWeatherDescription(weatherCode)
                  : "Unknown";
                const temperatureDisplay =
                  weather?.temperature !== undefined
                    ? `${Math.round(weather.temperature)}°C`
                    : "";

                return (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-lg ${entry.mood.color} border ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`font-semibold text-black`}>
                          {formatDate(entry.date)}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-2xl mr-2">
                            {entry.mood.emoji}
                          </span>
                          <span
                            className={`font-medium ${entry.mood.textColor}`}
                          >
                            {entry.mood.label}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {weatherCode && (
                          <WeatherIcon code={weatherCode} size={20} />
                        )}
                        <span className="ml-1 text-sm text-black">
                          {condition}, {temperatureDisplay}
                        </span>
                      </div>
                    </div>
                    {entry.note && (
                      <div className="mt-3 px-3 py-2 bg-white text-black bg-opacity-50 rounded">
                        {entry.note}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No journal entries found.</p>
            {(filterMood || selectedDate) && (
              <button
                onClick={() => {
                  setFilterMood(null);
                  setSelectedDate(null);
                }}
                className="mt-2 text-blue-500 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;