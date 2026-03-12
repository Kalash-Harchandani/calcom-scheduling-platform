import {
  createAvailability,
  getAllAvailability,
  updateAvailability,
  deleteAvailability,
  checkOverlap,
} from "../models/availabilityModel.js";

// POST /availability
export async function createAvailabilityHandler(req, res) {
  const { day_of_week, start_time, end_time } = req.body;

  if (!day_of_week || !start_time || !end_time) {
    const error = new Error("day_of_week, start_time and end_time are required");
    error.status = 400;
    throw error;
  }

  const overlap = await checkOverlap(day_of_week, start_time, end_time);

  if (overlap) {
    return res.status(400).json({
      success: false,
      message: "Availability range overlaps with existing schedule",
    });
  }

  const id = await createAvailability({ day_of_week, start_time, end_time });

  return res.status(201).json({
    success: true,
    data: { id, day_of_week, start_time, end_time },
  });
}

// GET /availability
export async function getAllAvailabilityHandler(_req, res) {
  const availability = await getAllAvailability();

  return res.status(200).json({
    success: true,
    data: availability,
  });
}

// PUT /availability/:id
export async function updateAvailabilityHandler(req, res) {
  const { id } = req.params;
  const { day_of_week, start_time, end_time } = req.body;

  if (!day_of_week || !start_time || !end_time) {
    const error = new Error("day_of_week, start_time and end_time are required");
    error.status = 400;
    throw error;
  }

  const updated = await updateAvailability(id, {
    day_of_week,
    start_time,
    end_time,
  });

  if (!updated) {
    const error = new Error("Availability slot not found");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    data: { id, day_of_week, start_time, end_time },
  });
}

// DELETE /availability/:id
export async function deleteAvailabilityHandler(req, res) {
  const { id } = req.params;
  const deleted = await deleteAvailability(id);

  if (!deleted) {
    const error = new Error("Availability slot not found");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Availability slot deleted successfully",
  });
}
