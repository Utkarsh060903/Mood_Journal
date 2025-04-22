export const exportToCSV = (entries) => {
    const headers = ["Date", "Mood", "Note", "Weather", "Temperature"];
    const csvContent = entries.map(entry => {
      const date = new Date(entry.date).toLocaleDateString();
      const mood = entry.mood.label;
      const note = entry.note;
      
      const weatherValues = entry.weather?.timelines?.minutely?.[0]?.values;
      
      const getWeatherDescription = (code) => {
        const weatherCodes = {
          0: 'Unknown',
          1000: 'Clear',
          1100: 'Mostly Clear',
          1101: 'Partly Cloudy',
          1102: 'Mostly Cloudy',
          1001: 'Cloudy',
          2000: 'Fog',
          2100: 'Light Fog',
          4000: 'Drizzle',
          4001: 'Rain',
          4200: 'Light Rain',
          4201: 'Heavy Rain',
          5000: 'Snow',
          5001: 'Flurries',
          5100: 'Light Snow',
          5101: 'Heavy Snow',
          6000: 'Freezing Drizzle',
          6001: 'Freezing Rain',
          6200: 'Light Freezing Rain',
          6201: 'Heavy Freezing Rain',
          7000: 'Ice Pellets',
          7101: 'Heavy Ice Pellets',
          7102: 'Light Ice Pellets',
          8000: 'Thunderstorm'
        };
        
        return weatherCodes[code] || 'Unknown';
      };
      
      const weather = weatherValues ? getWeatherDescription(weatherValues.weatherCode) : 'Unknown';
      const temp = weatherValues?.temperature ? `${Math.round(weatherValues.temperature)}°C` : 'N/A';
      
      // Escape quotes in note to prevent CSV formatting issues
      const escapedNote = note ? note.replace(/"/g, '""') : '';
      
      return `"${date}","${mood}","${escapedNote}","${weather}","${temp}"`;
    });
    
    const csv = [headers.join(","), ...csvContent].join("\n");
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "mood-journal.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };