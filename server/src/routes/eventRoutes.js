import express from "express";
import {
  createEventHandler,
  getAllEventsHandler,
  getEventBySlugHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/eventController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// POST /events
router.post("/events", asyncHandler(createEventHandler));

// GET /events
router.get("/events", asyncHandler(getAllEventsHandler));

// GET /events/slug/:slug
router.get("/events/slug/:slug", asyncHandler(getEventBySlugHandler));

// PUT /events/:id
router.put("/events/:id", asyncHandler(updateEventHandler));

// DELETE /events/:id
router.delete("/events/:id", asyncHandler(deleteEventHandler));

export default router;
