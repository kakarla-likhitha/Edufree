const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ 1. Connect to MySQL Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if needed
  password: "", // Your MySQL password (default is empty in XAMPP)
  database: "volunteering_club",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// ✅ 2. API to Store Volunteer Data
app.post("/register", (req, res) => {
  const { name, email, phone, address } = req.body;
  const sql =
    "INSERT INTO volunteers (name, email, phone, address) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, address], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "✅ Volunteer Registered Successfully!" });
  });
});

// ✅ 3. API to Retrieve All Volunteers (Optional)
app.get("/volunteers", (req, res) => {
  const sql = "SELECT * FROM volunteers";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ 4. Start the Server
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
