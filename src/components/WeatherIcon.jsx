import React from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail,
  Cloudy,
} from "lucide-react";

const WeatherIcon = ({ code, size = 24 }) => {
  const getIconByCode = (weatherCode) => {
    const props = { size, strokeWidth: 1.5 };

    switch (true) {
      // Clear
      case weatherCode === 1000:
        return <Sun {...props} className="text-yellow-500" />;

      // Mostly Clear, Partly Cloudy
      case weatherCode === 1100:
      case weatherCode === 1101:
        return <CloudSun {...props} className="text-gray-500" />;

      // Mostly Cloudy, Cloudy
      case weatherCode === 1102:
      case weatherCode === 1001:
        return <Cloudy {...props} className="text-gray-500" />;

      // Fog, Light Fog
      case weatherCode === 2000:
      case weatherCode === 2100:
        return <CloudFog {...props} className="text-gray-400" />;

      // Drizzle
      case weatherCode === 4000:
        return <CloudDrizzle {...props} className="text-blue-400" />;

      // Rain, Light Rain, Heavy Rain
      case weatherCode === 4001:
      case weatherCode === 4200:
      case weatherCode === 4201:
        return <CloudRain {...props} className="text-blue-500" />;

      // Snow, Flurries, Light Snow, Heavy Snow
      case weatherCode === 5000:
      case weatherCode === 5001:
      case weatherCode === 5100:
      case weatherCode === 5101:
        return <CloudSnow {...props} className="text-blue-200" />;

      // Freezing Rain types
      case weatherCode === 6000:
      case weatherCode === 6001:
      case weatherCode === 6200:
      case weatherCode === 6201:
        return <CloudRain {...props} className="text-blue-300" />;

      // Ice Pellets
      case weatherCode === 7000:
      case weatherCode === 7101:
      case weatherCode === 7102:
        return <CloudHail {...props} className="text-blue-200" />;

      // Thunderstorm
      case weatherCode === 8000:
        return <CloudLightning {...props} className="text-yellow-400" />;

      // Default/Unknown
      default:
        return <Cloud {...props} className="text-gray-400" />;
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      {getIconByCode(code)}
    </div>
  );
};

export default WeatherIcon;
