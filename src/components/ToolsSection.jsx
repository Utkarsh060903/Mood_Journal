import React from "react";
import { Download, PieChart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { exportToCSV } from "../utils/exportUtils";

const ToolsSection = ({ entries }) => {
  const { darkMode } = useTheme();

  const handleExport = () => {
    exportToCSV(entries);
  };

  return (
    <section
      className={`mb-8 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Tools</h2>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export Journal (CSV)
        </button>
      </div>
    </section>
  );
};

export default ToolsSection;
