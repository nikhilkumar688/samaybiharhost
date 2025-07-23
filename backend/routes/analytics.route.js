import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getAnalyticsSummary } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/summary", verifyToken, getAnalyticsSummary);

export default router;
