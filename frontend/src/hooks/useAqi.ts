import { useState, useRef, useCallback } from "react";
import { api } from "../lib/api";
import { AxiosError } from "axios";

export function useAqi() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(async (city: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await api.get("/air-quality", {
        params: { city },
        signal: controller.signal,
      });

      setData(res.data);
    } catch (err: any) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
        return;
      }

      const errorMessage =
        (err as AxiosError<{ error: string }>)?.response?.data?.error ||
        err.message ||
        "Failed to fetch air quality data";

      setError(errorMessage);
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  }, []);

  return { loading, data, error, search };
}
