import { CITY_LIST } from "../store/cities.js";

class CitySearchService {
  searchCities(query: string) {
    const q = query.toLowerCase();
    return CITY_LIST.filter((city) => city.toLowerCase().startsWith(q)).slice(
      0,
      10
    );
  }
}

export const citySearchService = new CitySearchService();
