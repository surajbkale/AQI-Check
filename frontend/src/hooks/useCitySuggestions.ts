import { useState, useEffect } from "react";
import axios from "axios";

export interface CitySearchResult {
  uid: number;
  name: string;
  url: string;
}

const API_TOKEN = import.meta.env.VITE_AQI_TOKEN;

export function useCitySuggestions(query: string) {
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.waqi.info/search/?keyword=${query}&token=${API_TOKEN}`
        );

        if (response.data.status === "ok") {
          const formattedResults = response.data.data.map((item: any) => ({
            uid: item.uid,
            name: item.station.name,
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

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
