import React, { useState } from "react";
import MoodSelector from "./MoodSelector";
import { useTheme } from "../context/ThemeContext";
import { getCurrentDateISO } from "../utils/dateUtils";

const JournalForm = ({ onSaveEntry, weather }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [note, setNote] = useState("");
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentMood) {
      alert("Please select a mood before saving.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: getCurrentDateISO(),
      mood: currentMood,
      note: note.trim(),
      weather: weather || {
        current: { weather: [{ main: "Unknown" }], temp: "N/A" },
      },
    };

    onSaveEntry(newEntry);
    setCurrentMood(null);
    setNote("");
  };

  return (
    <section
      className={`mb-8 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>

      <form onSubmit={handleSubmit}>
        <MoodSelector currentMood={currentMood} onMoodSelect={setCurrentMood} />

        <div className="mb-6">
          <label htmlFor="note" className="block mb-2 text-sm font-medium">
            Notes
          </label>
          <textarea
            id="note"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? What made you feel this way?"
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          Save Entry
        </button>
      </form>
    </section>
  );
};

export default JournalForm;
