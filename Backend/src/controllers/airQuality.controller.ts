import type { Request, Response } from "express";
import { airQualityService } from "../services/airQuality.service.js";
import { classifyAQI } from "../utils/aqiClassifier.js";

export const getAirQuality = async (req: Request, res: Response) => {
  try {
    const city = String(req.query.city || "").trim();
    if (!city) {
      return res.status(400).json({
        error: "Missing city parameter",
      });
    }

    const data = await airQualityService.getCityAQI(city);
    const category = classifyAQI(data.aqi);

    res.json({
      ...data,
      category,
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};
