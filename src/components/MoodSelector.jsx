import React from "react";
import { moodOptions } from "../constants/moodOptions";

const MoodSelector = ({ currentMood, onMoodSelect }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-6">
      {moodOptions.map((mood) => (
        <button
          key={mood.label}
          type="button"
          onClick={() => onMoodSelect(mood)}
          className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
            mood.color
          } ${currentMood?.label === mood.label ? "ring-4 ring-blue-500" : ""}`}
          aria-label={`Select mood: ${mood.label}`}
        >
          <span className="text-3xl mb-1">{mood.emoji}</span>
          <span className={`text-sm font-medium ${mood.textColor}`}>
            {mood.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
