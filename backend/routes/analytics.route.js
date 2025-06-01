import express from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        const analytics = await getAnalytics();
        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const dailySalesDate = await getDailySalesDate(startDate, endDate);
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
