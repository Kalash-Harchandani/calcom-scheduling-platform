import { getEventBySlug } from "../models/evetModel.js";
import { getAvailabilityByDay } from "../models/availabilityModel.js";
import { getBookingsForDate } from "../models/bookingModel.js";
import { generateSlots } from "../services/slotService.js";

// GET /api/slots
export async function getAvailableSlotsHandler(req, res) {
  const { slug, date } = req.query;

  if (!slug || !date) {
    const error = new Error("slug and date query parameters are required");
    error.status = 400;
    throw error;
  }

  const event = await getEventBySlug(slug);
  if (!event) {
    const error = new Error("Event type not found");
    error.status = 404;
    throw error;
  }

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateObj = new Date(date);
  if (Number.isNaN(dateObj.getTime())) {
    const error = new Error("Invalid date format");
    error.status = 400;
    throw error;
  }

  const day_of_week = dayNames[dateObj.getUTCDay()];

  const availabilityRanges = await getAvailabilityByDay(day_of_week);
  const bookings = await getBookingsForDate(date);

  let slots = generateSlots(availabilityRanges, event.duration, bookings);

  // Filter out any time slots that are in the past or within the 15-minute buffer
  const now = new Date();
  const bufferMs = 15 * 60 * 1000;
  const minAllowedTime = new Date(now.getTime() + bufferMs);

  slots = slots.filter((slot) => {
    // Construct local datetime for the slot based on requested date and slot time
    // format: "YYYY-MM-DDTHH:mm:ss" parses into server's local time
    const slotDateTime = new Date(`${date}T${slot.start_time}`);
    
    // Check if the slot date is valid and is >= our minimum allowed time
    if (!Number.isNaN(slotDateTime.getTime())) {
      return slotDateTime >= minAllowedTime;
    }
    return true; // fallback if parsing failed for some reason
  });

  return res.status(200).json({
    success: true,
    slots,
  });
}
