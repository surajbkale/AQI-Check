export function getAQICategoryKey(aqi: number) {
  if (aqi <= 33) return "Very Good";
  if (aqi <= 66) return "Good";
  if (aqi <= 99) return "Fair";
  if (aqi <= 149) return "Poor";
  if (aqi <= 200) return "Very Poor";
  return "Very Hazardous";
}
