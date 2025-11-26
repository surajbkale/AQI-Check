import type { Request, Response } from "express";
import { citySearchService } from "../services/citySearch.service.js";

export const getCitySuggestions = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.prefix || "").trim();

    if (!query) {
      return res.status(400).json({
        error: "Missing prefix parameter",
      });
    }

    const results = await citySearchService.searchCiteis(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch suggestions",
    });
  }
};
