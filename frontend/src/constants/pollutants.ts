export const POLLUTANT_MAP: Record<string, { label: string; name: string }> = {
  pm25: { label: "PM 2.5", name: "Fine Particles" },
  pm10: { label: "PM 10", name: "Respirable Particles" },
  o3: { label: "O₃", name: "Ozone" },
  no2: { label: "NO₂", name: "Nitrogen Dioxide" },
  so2: { label: "SO₂", name: "Sulfur Dioxide" },
  co: { label: "CO", name: "Carbon Monoxide" },
  // Fallbacks for less common ones
  t: { label: "Temp", name: "Temperature" },
  h: { label: "Hum", name: "Humidity" },
  w: { label: "Wind", name: "Wind Speed" },
  p: { label: "Pres", name: "Pressure" },
  dew: { label: "Dew", name: "Dew Point" },
};
