import pool from "../config/db.js";

// Create a new event type
export async function createEvent({ title, description, slug, duration }) {
  const query = `
    INSERT INTO event_types (title, description, slug, duration)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.query(query, [
    title,
    description ?? null,
    slug,
    duration,
  ]);

  return result.insertId;
}

// Get all event types
export async function getAllEvents() {
  const query = `
    SELECT id, title, description, slug, duration, created_at
    FROM event_types
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.query(query);
  return rows;
}

// Get a single event type by its slug
export async function getEventBySlug(slug) {
  const query = `
    SELECT id, title, description, slug, duration, created_at
    FROM event_types
    WHERE slug = ?
    LIMIT 1
  `;

  const [rows] = await pool.query(query, [slug]);
  return rows[0] ?? null;
}

// Update an event type by id
export async function updateEvent(
  id,
  { title, description, slug, duration }
) {
  const query = `
    UPDATE event_types
    SET title = ?, description = ?, slug = ?, duration = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [
    title,
    description ?? null,
    slug,
    duration,
    id,
  ]);

  return result.affectedRows > 0;
}

// Delete an event type by id
export async function deleteEvent(id) {
  const query = `
    DELETE FROM event_types
    WHERE id = ?
  `;

  const [result] = await pool.query(query, [id]);
  return result.affectedRows > 0;
}
