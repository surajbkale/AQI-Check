export function classifyAQI(aqi: number) {
  if (isNaN(aqi)) {
    return {
      label: "Unknown",
      color: "#999",
    };
  }

  if (aqi <= 33) {
    return {
      label: "Very Good",
      color: "#2795F5",
    };
  }
  if (aqi <= 66) {
    return {
      label: "Good",
      color: "#009966",
    };
  }
  if (aqi <= 99) {
    return {
      label: "Fair",
      color: "#829100",
    };
  }
  if (aqi <= 149) {
    return {
      label: "Poor",
      color: "#ff9933",
    };
  }
  if (aqi <= 200) {
    return {
      label: "Very Poor",
      color: "#660099",
    };
  }
  return {
    label: "Hazardous",
    color: "#7e0023",
  };
}
