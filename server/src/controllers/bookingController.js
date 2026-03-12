import {
  createBooking,
  getUpcomingBookings,
  getPastBookings,
  cancelBooking,
} from "../models/bookingModel.js";
import { sendBookingEmail } from "../utils/sendEmail.js";

// POST /bookings
export async function createBookingHandler(req, res) {
  const {
    event_type_id,
    name,
    email,
    booking_date,
    start_time,
    end_time,
  } = req.body;

  if (
    !event_type_id ||
    !name ||
    !email ||
    !booking_date ||
    !start_time ||
    !end_time
  ) {
    const error = new Error(
      "event_type_id, name, email, booking_date, start_time and end_time are required"
    );
    error.status = 400;
    throw error;
  }

  const id = await createBooking({
    event_type_id,
    name,
    email,
    booking_date,
    start_time,
    end_time,
  });

  // Send confirmation email
  await sendBookingEmail(email, {
    name,
    date: booking_date,
    startTime: start_time,
    endTime: end_time,
  });

  return res.status(201).json({
    success: true,
    data: {
      id,
      event_type_id,
      name,
      email,
      booking_date,
      start_time,
      end_time,
      status: "scheduled",
    },
  });
}

// GET /bookings/upcoming
export async function getUpcomingBookingsHandler(_req, res) {
  const bookings = await getUpcomingBookings();

  return res.status(200).json({
    success: true,
    data: bookings,
  });
}

// GET /bookings/past
export async function getPastBookingsHandler(_req, res) {
  const bookings = await getPastBookings();

  return res.status(200).json({
    success: true,
    data: bookings,
  });
}

// DELETE /bookings/:id
export async function cancelBookingHandler(req, res) {
  const { id } = req.params;
  const cancelled = await cancelBooking(id);

  if (!cancelled) {
    const error = new Error("Booking not found");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Booking cancelled successfully",
  });
}
