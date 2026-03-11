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
