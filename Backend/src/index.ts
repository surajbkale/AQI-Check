import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import airQualityRouter from "./routes/airQuality.route.js";
import citySearchRouter from "./routes/citySearch.route.js";
import rateLimit from "express-rate-limit";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.set("trust proxy", 1);
const PORT = process.env.PORT;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins window,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: "Too many requests, please try again later",
  },
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("AQICheck Backend is running!");
});

app.use("/api/air-quality", airQualityRouter);

app.use("/api/cities", citySearchRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
