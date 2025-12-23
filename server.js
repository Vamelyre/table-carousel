const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");

const app = express();
app.use(express.static("frontend"));

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
    const {
      search = "",  
      role,          
      country,       
      minAge,
      maxAge
    } = req.query;

    const where = [];
    const params = [];

    if (search.trim()) {
      where.push("(name LIKE ? OR email LIKE ? OR phone LIKE ?)");
      const s = `%${search.trim()}%`;
      params.push(s, s, s);
    }

    if (role) {
      where.push("role = ?");
      params.push(role);
    }

    if (country) {
      where.push("country = ?");
      params.push(country);
    }

    if (minAge !== undefined && minAge !== "") {
      where.push("age >= ?");
      params.push(Number(minAge));
    }

    if (maxAge !== undefined && maxAge !== "") {
      where.push("age <= ?");
      params.push(Number(maxAge));
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT id, name, email, role, phone, age, country
       FROM users
       ${whereSql}
       ORDER BY id ASC`,
      params
    );

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







