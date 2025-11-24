import NodeCache from "node-cache";
import { ENV } from "../config/env.js";

export const cache = new NodeCache({
  stdTTL: ENV.CACHE_TTL,
  checkperiod: ENV.CACHE_TTL / 2,
});
