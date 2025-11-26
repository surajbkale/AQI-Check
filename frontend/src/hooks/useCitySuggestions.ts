import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface CitySearchResult {
  uid: number;
  name: string;
  url: string;
}

export function useCitySuggestions(query: string) {
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await api.get(`/cities?prefix=${query}`);
        setResults(response.data || []);
      } catch (error) {
        console.error("Search error: ", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
