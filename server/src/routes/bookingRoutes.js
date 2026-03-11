import express from "express";
import {
  createBookingHandler,
  getUpcomingBookingsHandler,
  getPastBookingsHandler,
  cancelBookingHandler,
} from "../controllers/bookingController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// POST /bookings
router.post("/bookings", asyncHandler(createBookingHandler));

// GET /bookings/upcoming
router.get("/bookings/upcoming", asyncHandler(getUpcomingBookingsHandler));

// GET /bookings/past
router.get("/bookings/past", asyncHandler(getPastBookingsHandler));

// DELETE /bookings/:id
router.delete("/bookings/:id", asyncHandler(cancelBookingHandler));

export default router;
