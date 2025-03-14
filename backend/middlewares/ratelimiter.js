import rateLimit from "express-rate-limit";

// Create a rate limiter middleware
export const generalLimiter = rateLimit({
  windowMs: 1*60*1000,// 1 minute
  max: 35, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

export const authLimiter = rateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});



