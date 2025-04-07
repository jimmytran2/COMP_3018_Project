import { rateLimit } from "express-rate-limit";

export const expressRateLimiter = rateLimit({
  // windows: time window
  // max: max number of requests
  // message: message to display when limit is hit
});
