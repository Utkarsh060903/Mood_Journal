import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherService';

export function UseWeather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      setIsLoading(true);
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              
              try {
                const data = await fetchWeatherData(latitude, longitude);
                setWeather(data);
                setError(null);
              } catch (weatherError) {
                console.error("Weather error:", weatherError);
                setError('Failed to fetch weather data. ' + weatherError.message);
              }
              
              setIsLoading(false);
            },
            (locationError) => {
              console.error("Location error:", locationError);
              setError('Location access denied. Please enable location permissions for weather data.');
              setIsLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
          );
        } else {
          setError('Geolocation is not supported by your browser');
          setIsLoading(false);
        }
      } catch (e) {
        console.error("General error:", e);
        setError('An unexpected error occurred');
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, []);

  const refreshWeather = async () => {
    if (!location) return;
    
    setIsLoading(true);
    try {
      const data = await fetchWeatherData(location.latitude, location.longitude);
      setWeather(data);
      setError(null);
    } catch (weatherError) {
      setError('Failed to refresh weather data');
    }
    setIsLoading(false);
  };

  return { weather, location, isLoading, error, refreshWeather };
}