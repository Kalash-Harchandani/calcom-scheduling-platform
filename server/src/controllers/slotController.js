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

  // Filter out past time slots if the requested date is today
  const today = new Date();
  const isToday =
    dateObj.getUTCFullYear() === today.getFullYear() &&
    dateObj.getUTCMonth() === today.getMonth() &&
    dateObj.getUTCDate() === today.getDate();

  if (isToday) {
    const currentMinutes = today.getHours() * 60 + today.getMinutes();
    const bufferMinutes = 15; // Don't allow bookings less than 15 mins from now
    
    slots = slots.filter(slot => {
      const [h, m] = slot.start_time.split(":").map(Number);
      const slotMinutes = h * 60 + m;
      return slotMinutes >= (currentMinutes + bufferMinutes);
    });
  }

  return res.status(200).json({
    success: true,
    slots,
  });
}
