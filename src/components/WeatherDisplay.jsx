import React from "react";
import { formatDate } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";
import WeatherIcon from "./WeatherIcon";

const WeatherDisplay = ({ weather, isLoading, error }) => {
  const { darkMode } = useTheme();

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

  if (isLoading) {
    return (
      <section
        className={`mb-8 p-6 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">{formatDate()}</h2>
        <div className="animate-pulse flex items-center">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={`mb-8 p-6 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">{formatDate()}</h2>
        <div className="text-yellow-600">
          {error}. Weather data will not be recorded.
        </div>
      </section>
    );
  }

  const values = weather?.timelines?.minutely?.[0]?.values;

  return (
    <section
      className={`mb-8 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">{formatDate()}</h2>
      {values ? (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center">
            <WeatherIcon code={values.weatherCode} size={28} />
            <span className="ml-2 capitalize">
              {getWeatherDescription(values.weatherCode)},{" "}
              {Math.round(values.temperature)}°C
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Feels like: {Math.round(values.temperatureApparent)}°C | Humidity:{" "}
            {values.humidity}% | Wind: {Math.round(values.windSpeed * 3.6)} km/h
          </div>
        </div>
      ) : (
        <div>Weather data unavailable</div>
      )}
    </section>
  );
};

export default WeatherDisplay;
