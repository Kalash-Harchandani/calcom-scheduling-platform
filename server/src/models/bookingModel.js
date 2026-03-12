import pool from "../config/db.js";

// Create a new booking
export async function createBooking({
  event_type_id,
  name,
  email,
  booking_date,
  start_time,
  end_time,
}) {
  const query = `
    INSERT INTO bookings (
      event_type_id,
      name,
      email,
      booking_date,
      start_time,
      end_time,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, 'scheduled')
  `;

  const [result] = await pool.query(query, [
    event_type_id,
    name,
    email,
    booking_date,
    start_time,
    end_time,
  ]);

  return result.insertId;
}

// Get upcoming bookings (booking_date today or later, and status scheduled)
export async function getUpcomingBookings() {
  const query = `
    SELECT
      id,
      event_type_id,
      name,
      email,
      booking_date,
      start_time,
      end_time,
      status,
      created_at
    FROM bookings
    WHERE booking_date >= CURDATE()
      AND status = 'scheduled'
    ORDER BY booking_date ASC, start_time ASC
  `;

  const [rows] = await pool.query(query);
  return rows;
}

// Get past bookings (booking_date before today)
export async function getPastBookings() {
  const query = `
    SELECT
      id,
      event_type_id,
      name,
      email,
      booking_date,
      start_time,
      end_time,
      status,
      created_at
    FROM bookings
    WHERE booking_date < CURDATE()
    ORDER BY booking_date DESC, start_time DESC
  `;

  const [rows] = await pool.query(query);
  return rows;
}

// Cancel a booking by id (set status to cancelled)
export async function cancelBooking(id) {
  const query = `
    UPDATE bookings
    SET status = 'cancelled'
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [id]);
  return result.affectedRows > 0;
}

// Get ALL bookings for a specific date (across all event types)
export async function getBookingsForDate(booking_date) {
  const query = `
    SELECT
      id,
      event_type_id,
      name,
      email,
      booking_date,
      start_time,
      end_time,
      status,
      created_at
    FROM bookings
    WHERE booking_date = ?
    ORDER BY start_time ASC
  `;

  const [rows] = await pool.query(query, [booking_date]);
  return rows;
}
