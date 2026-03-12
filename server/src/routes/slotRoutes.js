import express from "express";
import { getAvailableSlotsHandler } from "../controllers/slotController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// GET /api/slots
router.get("/slots", asyncHandler(getAvailableSlotsHandler));

export default router;
