export interface AirQualityResult {
  city: {
    name: string;
    geo: number[] | null;
    url: string | null;
    country: string | null;
  };
  category: {
    label: string;
    color: string;
  };
  aqi: number;
  dominantPollutant: string | null;
  pollutants: Record<string, { v: number }>;
  time: any;
  vendorIndex: number;
}
