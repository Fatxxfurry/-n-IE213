import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { fetchAnalyticsData } from "../helper/fetchfetchAnalyticsData.js";
import { getDailySalesData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
  try {
    const analytics = await fetchAnalyticsData();
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dailySalesDate = await getDailySalesData(startDate, endDate);
    res.json({
      analytics,
      dailySalesDate,
    });
  } catch (error) {
    console.log("Error in getAnalytics controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
