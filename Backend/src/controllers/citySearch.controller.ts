import type { Request, Response } from "express";
import { citySearchService } from "../services/citySearch.service.js";

export const getCitySuggestions = (req: Request, res: Response) => {
  const query = String(req.query.prefix || "").trim();

  if (!query) {
    return res.status(400).json({
      error: "Missing prefix parameter",
    });
  }

  const results = citySearchService.searchCities(query);
  res.json(results);
};
