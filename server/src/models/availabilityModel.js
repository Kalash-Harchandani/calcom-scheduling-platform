import pool from "../config/db.js";

// Create a new availability slot
export async function createAvailability({ day_of_week, start_time, end_time }) {
  const query = `
    INSERT INTO availability (day_of_week, start_time, end_time)
    VALUES (?, ?, ?)
  `;

  const [result] = await pool.query(query, [day_of_week, start_time, end_time]);
  return result.insertId;
}

// Get all availability slots
export async function getAllAvailability() {
  const query = `
    SELECT id, day_of_week, start_time, end_time, created_at
    FROM availability
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.query(query);
  return rows;
}

// Get availability slots for a specific day of week
export async function getAvailabilityByDay(day_of_week) {
  const query = `
    SELECT id, day_of_week, start_time, end_time, created_at
    FROM availability
    WHERE day_of_week = ?
    ORDER BY start_time ASC
  `;

  const [rows] = await pool.query(query, [day_of_week]);
  return rows;
}

// Check if a given time range overlaps with existing availability for a day
export async function checkOverlap(day_of_week, start_time, end_time) {
  const query = `
    SELECT * FROM availability
    WHERE day_of_week = ?
    AND start_time < ?
    AND end_time > ?
  `;

  const [rows] = await pool.query(query, [day_of_week, end_time, start_time]);

  return rows.length > 0;
}

// Update an availability slot by id
export async function updateAvailability(
  id,
  { day_of_week, start_time, end_time }
) {
  const query = `
    UPDATE availability
    SET day_of_week = ?, start_time = ?, end_time = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [
    day_of_week,
    start_time,
    end_time,
    id,
  ]);

  return result.affectedRows > 0;
}

// Delete an availability slot by id
export async function deleteAvailability(id) {
  const query = `
    DELETE FROM availability
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [id]);
  return result.affectedRows > 0;
}


