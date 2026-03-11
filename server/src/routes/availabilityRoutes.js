import express from "express";
import {
  createAvailabilityHandler,
  getAllAvailabilityHandler,
  updateAvailabilityHandler,
  deleteAvailabilityHandler,
} from "../controllers/availabilityController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// POST /availability
router.post("/availability", asyncHandler(createAvailabilityHandler));

// GET /availability
router.get("/availability", asyncHandler(getAllAvailabilityHandler));

// PUT /availability/:id
router.put("/availability/:id", asyncHandler(updateAvailabilityHandler));

// DELETE /availability/:id
router.delete("/availability/:id", asyncHandler(deleteAvailabilityHandler));

export default router;
