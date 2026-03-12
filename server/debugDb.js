import pool from "./src/config/db.js";

async function checkDb() {
  try {
    const [events] = await pool.query("SELECT id, title FROM event_types");
    console.log("EVENT TYPES:", events);

    const [bookings] = await pool.query("SELECT id, event_type_id, name FROM bookings");
    console.log("BOOKINGS:", bookings);

    const [joined] = await pool.query(`
      SELECT b.id, b.event_type_id, b.name, et.title
      FROM bookings b
      LEFT JOIN event_types et ON b.event_type_id = et.id
    `);
    console.log("JOINED DATA:", joined);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

checkDb();
