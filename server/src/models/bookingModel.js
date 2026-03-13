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
      b.id,
      b.event_type_id,
      b.name,
      b.email,
      b.booking_date,
      b.start_time,
      b.end_time,
      b.status,
      b.created_at,
      et.title AS eventTitle
    FROM bookings b
    LEFT JOIN event_types et ON b.event_type_id = et.id
    WHERE (b.booking_date > CURDATE() OR (b.booking_date = CURDATE() AND b.end_time >= CURTIME()))
      AND b.status = 'scheduled'
    ORDER BY b.booking_date ASC, b.start_time ASC
  `;

  const [rows] = await pool.query(query);
  return rows;
}

// Get past bookings (booking_date before today)
export async function getPastBookings() {
  const query = `
    SELECT
      b.id,
      b.event_type_id,
      b.name,
      b.email,
      b.booking_date,
      b.start_time,
      b.end_time,
      b.status,
      b.created_at,
      et.title AS eventTitle
    FROM bookings b
    LEFT JOIN event_types et ON b.event_type_id = et.id
    WHERE (
      b.booking_date < CONVERT_TZ(CURDATE(), '+00:00', '+05:30')
      OR (
        b.booking_date = CONVERT_TZ(CURDATE(), '+00:00', '+05:30')
        AND b.end_time < CONVERT_TZ(CURTIME(), '+00:00', '+05:30')
      )
    )
    ORDER BY b.booking_date DESC, b.start_time DESC
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
