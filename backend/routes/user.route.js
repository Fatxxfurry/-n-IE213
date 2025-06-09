import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/:id", protectRoute, updateUser);

export default router;
