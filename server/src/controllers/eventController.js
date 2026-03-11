import {
  createEvent,
  getAllEvents,
  getEventBySlug,
  updateEvent,
  deleteEvent,
} from "../models/evetModel.js";

// POST /events
export async function createEventHandler(req, res) {
  const { title, description, slug, duration } = req.body;

  if (!title || !slug || !duration) {
    const error = new Error("title, slug and duration are required");
    error.status = 400;
    throw error;
  }

  const id = await createEvent({ title, description, slug, duration });

  return res.status(201).json({
    success: true,
    data: { id, title, description, slug, duration },
  });
}

// GET /events
export async function getAllEventsHandler(_req, res) {
  const events = await getAllEvents();
  return res.status(200).json({
    success: true,
    data: events,
  });
}

// GET /events/slug/:slug
export async function getEventBySlugHandler(req, res) {
  const { slug } = req.params;
  const event = await getEventBySlug(slug);

  if (!event) {
    const error = new Error("Event type not found");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    data: event,
  });
}

// PUT /events/:id
export async function updateEventHandler(req, res) {
  const { id } = req.params;
  const { title, description, slug, duration } = req.body;

  if (!title || !slug || !duration) {
    const error = new Error("title, slug and duration are required");
    error.status = 400;
    throw error;
  }

  const updated = await updateEvent(id, {
    title,
    description,
    slug,
    duration,
  });

  if (!updated) {
    const error = new Error("Event type not found");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    data: { id, title, description, slug, duration },
  });
}

// DELETE /events/:id
export async function deleteEventHandler(req, res) {
  const { id } = req.params;
  const deleted = await deleteEvent(id);

  if (!deleted) {
    const error = new Error("Event type not found");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Event type deleted successfully",
  });
}
