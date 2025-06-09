import express from "express";
import {
  getUserOrders,
  getAllOrders,
  updateOrder,
} from "../controllers/order.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllOrders);
router.get("/user", protectRoute, getUserOrders);
router.patch("/:id", protectRoute, updateOrder);

export default router;
