import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const router = express.Router();

router.get("/signup", signup);
router.get("/longin", login);
router.get("/logout", logout);
