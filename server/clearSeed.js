import pool from "./src/config/db.js";

async function clearSeedData() {
  try {
    // Delete the seeded bookings (the ones using @example.com)
    const [bookingRes] = await pool.query(`DELETE FROM bookings WHERE email LIKE '%@example.com%'`);
    console.log(`Deleted ${bookingRes.affectedRows} mock bookings.`);

    // Delete the seeded event types
    const eventSlugs = ['intro-call', 'deep-dive', 'weekly-sync', 'coffee-chat'];
    const placeholders = eventSlugs.map(() => '?').join(',');
    const [eventRes] = await pool.query(`DELETE FROM event_types WHERE slug IN (${placeholders})`, eventSlugs);
    console.log(`Deleted ${eventRes.affectedRows} mock event types.`);

    console.log("Seed data cleared successfully.");
  } catch (err) {
    console.error("Error clearing seed data:", err);
  } finally {
    process.exit(0);
  }
}

clearSeedData();
