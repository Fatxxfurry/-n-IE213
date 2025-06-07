import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, updatedProduct, toggleFeaturedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.patch("/:id/update", protectRoute, adminRoute, updatedProduct);

export default router;