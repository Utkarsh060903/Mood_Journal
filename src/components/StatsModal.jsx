import React from "react";
import { useTheme } from "../context/ThemeContext";
import { moodOptions } from "../constants/moodOptions";

const StatsModal = ({ entries, onClose }) => {
  const { darkMode } = useTheme();

  const moodStats = () => {
    const stats = {};
    moodOptions.forEach((mood) => {
      stats[mood.label] = entries.filter(
        (entry) => entry.mood.label === mood.label
      ).length;
    });
    return stats;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`relative w-full max-w-md rounded-lg shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        } p-6`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close stats modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Your Mood Statistics</h2>

        {entries.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(moodStats()).map(([mood, count]) => {
              const moodInfo = moodOptions.find((m) => m.label === mood);
              const percentage =
                entries.length > 0
                  ? Math.round((count / entries.length) * 100)
                  : 0;

              return (
                <div key={mood} className="flex items-center">
                  <div className="w-8 text-center mr-2">{moodInfo?.emoji}</div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${moodInfo?.textColor}`}
                      >
                        {mood}
                      </span>
                      <span className="text-sm font-medium">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div
                      className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700`}
                    >
                      <div
                        className={`h-2.5 rounded-full`}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: moodInfo?.color
                            ?.replace("bg-", "")
                            .split("-")[0],
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-6 text-sm text-gray-500">
              Total entries: {entries.length}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No journal entries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsModal;
