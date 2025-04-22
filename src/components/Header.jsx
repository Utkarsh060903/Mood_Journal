import React from "react";
import { Sun, Moon, Calendar } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = ({ onCalendarToggle }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header
      className={`py-4 px-4 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mood Journal</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={onCalendarToggle}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
            aria-label="View calendar"
          >
            <Calendar size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
