import express from "express";
import {
  createEventHandler,
  getAllEventsHandler,
  getEventBySlugHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/eventController.js";

const router = express.Router();

// POST /events
router.post("/events", createEventHandler);

// GET /events
router.get("/events", getAllEventsHandler);

// GET /events/slug/:slug
router.get("/events/slug/:slug", getEventBySlugHandler);

// PUT /events/:id
router.put("/events/:id", updateEventHandler);

// DELETE /events/:id
router.delete("/events/:id", deleteEventHandler);

export default router;
