import rateLimit from "express-rate-limit";
import { RateLimitError } from "../errors/error";

const windowMs: number = 1 * 60 * 1000; // 1 minute window to make requests

const apiLimiter = rateLimit({
  windowMs,
  max: 2, // Limit each to 2 requests
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disables older X-RateLimit headers
  handler: (req, res, next) => {
    // Call next(), errorhandler using custom error type
    const timeInMinutes: number = windowMs / 60000;
    next(
      new RateLimitError(
        `Too many requests, please wait ${timeInMinutes} minute(s) before trying again`
      )
    );
  },
});

export default apiLimiter;
