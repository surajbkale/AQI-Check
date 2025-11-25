export const AQI_CATEGORY_DATA: Record<
  string,
  {
    image: string;
    advice: string;
  }
> = {
  "Very Good": {
    image: "/images/very_good.png",
    advice: "Enjoy outdoor and indoor activities freely",
  },
  Good: {
    image: "/images/good.png",
    advice: "Enjoy activities. Air quality is considered acceptable.",
  },
  Fair: {
    image: "/images/fair.png",
    advice:
      "People unusually sensitive to air pollution should reduce strenuous outdoor activity.",
  },
  Poor: {
    image: "/images/poor.png",
    advice:
      "Sensitive groups: Cut back or reschedule strenuous outdoor activities.",
  },
  "Very Poor": {
    image: "/images/very_poor.png",
    advice:
      "Sensitive groups: Avoid strenuous outdoor activities. Others should limit long outdoor exposure.",
  },
  "Very Hazardous": {
    image: "/images/hazardous.png",
    advice:
      "Avoid all outdoor physical activity. Everyone should reduce activities.",
  },
};
