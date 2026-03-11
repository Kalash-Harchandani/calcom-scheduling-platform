import pool from "../config/db.js";

async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

testDB();