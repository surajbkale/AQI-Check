import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of the suggestion result
export interface CitySearchResult {
  uid: number;
  name: string;
  url: string; // The specific station URL (useful for unique identification)
}

const API_TOKEN = import.meta.env.VITE_AQI_TOKEN; // Ensure this is in your .env

export function useCitySuggestions(query: string) {
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Don't search if query is too short
    if (query.length < 3) {
      setResults([]);
      return;
    }

    // 2. Debounce: Wait 500ms before making the API call
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        // Using the WAQI Search Endpoint
        const response = await axios.get(
          `https://api.waqi.info/search/?keyword=${query}&token=${API_TOKEN}`
        );

        if (response.data.status === "ok") {
          // Map the raw data to a cleaner format
          const formattedResults = response.data.data.map((item: any) => ({
            uid: item.uid,
            name: item.station.name, // "Beijing" or "US Embassy, Beijing"
            url: item.station.url,
          }));
          setResults(formattedResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer on key press
  }, [query]);

  return { results, loading };
}
