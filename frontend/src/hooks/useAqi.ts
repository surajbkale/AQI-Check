import { useState } from "react";
import { api } from "../lib/api";

export function useAqi() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const search = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/air-quality?city=${city}`);
      setData(res.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, search };
}
