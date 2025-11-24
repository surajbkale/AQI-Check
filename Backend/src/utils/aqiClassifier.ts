export function classifyAQI(aqi: number) {
  if (isNaN(aqi)) {
    return {
      label: "Unknown",
      color: "#999",
    };
  }

  if (aqi <= 50) {
    return {
      label: "Good",
      color: "#009966",
    };
  }
  if (aqi <= 100) {
    return {
      label: "Moderate",
      color: "#ffde33",
    };
  }
  if (aqi <= 150) {
    return {
      label: "Unhealthy for Sensitive Groups",
      color: "#ff9933",
    };
  }
  if (aqi <= 200) {
    return {
      label: "Unhealthy",
      color: "#cc0033",
    };
  }
  if (aqi <= 300) {
    return {
      label: "Very Unhealthy",
      color: "#660099",
    };
  }
  return {
    label: "Hazardous",
    color: "#7e0023",
  };
}
