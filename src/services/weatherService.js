
export const fetchWeatherData = async (lat, lon) => {
  try {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API error:", errorData);
      throw new Error(`Weather API error: ${errorData.message || 'Unknown error'}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};