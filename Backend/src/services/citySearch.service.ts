import axios from "axios";
import { ENV } from "../config/env.js";

class CitySearchService {
  async searchCiteis(query: string) {
    if (!query) {
      return [];
    }

    try {
      const response = await axios.get(
        `https://api.waqi.info/search/?keyword=${encodeURIComponent(
          query
        )}&token=${ENV.AQICN_TOKEN}`
      );

      if (response.data.status === "ok") {
        return response.data.data.map((item: any) => ({
          uid: item.uid,
          name: item.station.name,
          url: item.station.url,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error while searching suggestions...", error);
      return [];
    }
  }
}

export const citySearchService = new CitySearchService();
