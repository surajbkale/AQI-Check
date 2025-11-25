import { Router } from "express";
import { getCitySuggestions } from "../controllers/citySearch.controller.js";

const router = Router();

router.get("/", getCitySuggestions);

export default router;
