import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "3000",
  AQICN_TOKEN: process.env.AQICN_TOKEN!,
  CACHE_TTL: Number(process.env.CACHE_TTL) || 600,
};
