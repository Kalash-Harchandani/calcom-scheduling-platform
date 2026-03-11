import {
  createEvent,
  getAllEvents,
  getEventBySlug,
  updateEvent,
  deleteEvent,
} from "../models/evetModel.js";

// POST /api/event-types
export async function createEventHandler(req, res) {
  try {
    const { title, description, slug, duration } = req.body;

    if (!title || !slug || !duration) {
      return res.status(400).json({
        success: false,
        message: "title, slug and duration are required",
      });
    }

    const id = await createEvent({ title, description, slug, duration });

    return res.status(201).json({
      success: true,
      data: { id, title, description, slug, duration },
    });
  } catch (error) {
    console.error("createEventHandler error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event type",
    });
  }
}

// GET /api/event-types
export async function getAllEventsHandler(_req, res) {
  try {
    const events = await getAllEvents();
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("getAllEventsHandler error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event types",
    });
  }
}

// GET /api/event-types/:slug
export async function getEventBySlugHandler(req, res) {
  try {
    const { slug } = req.params;
    const event = await getEventBySlug(slug);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event type not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("getEventBySlugHandler error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event type",
    });
  }
}

// PUT /api/event-types/:id
export async function updateEventHandler(req, res) {
  try {
    const { id } = req.params;
    const { title, description, slug, duration } = req.body;

    if (!title || !slug || !duration) {
      return res.status(400).json({
        success: false,
        message: "title, slug and duration are required",
      });
    }

    const updated = await updateEvent(id, {
      title,
      description,
      slug,
      duration,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Event type not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { id, title, description, slug, duration },
    });
  } catch (error) {
    console.error("updateEventHandler error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event type",
    });
  }
}

// DELETE /api/event-types/:id
export async function deleteEventHandler(req, res) {
  try {
    const { id } = req.params;
    const deleted = await deleteEvent(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Event type not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event type deleted successfully",
    });
  } catch (error) {
    console.error("deleteEventHandler error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete event type",
    });
  }
}
