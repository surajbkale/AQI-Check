import { http } from "../utils/http.js";
import { ENV } from "../config/env.js";
import type { AirQualityResult } from "../types/airQuality.types.js";
import { cache } from "../utils/cache.js";

export class AirQualityService {
  async getCityAQI(city: string): Promise<AirQualityResult> {
    const key = `api:${city.toLowerCase()}`;

    const cached = cache.get<AirQualityResult>(key);
    if (cached) {
      return cached;
    }

    const url = `https://api.waqi.info/feed/${encodeURIComponent(
      city
    )}/?token=${ENV.AQICN_TOKEN}`;

    const response = await http.get(url);

    if (response.data.status !== "ok") {
      throw new Error("Vendor returned non-ok response");
    }

    const d = response.data.data;

    const result: AirQualityResult = {
      city: {
        name: d.city?.name || city,
        geo: d.city?.geo || null,
        url: d.city?.url || null,
      },
      aqi: d.aqi,
      dominantPollutant: d.dominentpol,
      pollutants: d.iaqi || {},
      time: d.time,
      vendorIndex: d.idx,
    };

    cache.set(key, result);
    return result;
  }
}

export const airQualityService = new AirQualityService();
