const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "88888888", // sawiro araa rom daculi ikos
  database: "TABLE_CAROUSEL",
  connectionLimit: 5,
});


app.get("/users", async (req, res) => {
  let conn;
  
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT id, name, email, role, phone, age, country
      FROM users
      ORDER BY id ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release();
  }
});


app.listen(3000, () => {
  console.log("API: http://localhost:3000/users");
});







