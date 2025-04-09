const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data

// Test API
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from EduFree backend!" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
const fs = require("fs");
const path = require("path");

app.post("/api/volunteer", (req, res) => {
  const { name, email } = req.body;
  const newVolunteer = { name, email, timestamp: new Date() };

  const filePath = path.join(__dirname, "volunteers.json");

  // Step 1: Read current volunteers list
  fs.readFile(filePath, "utf8", (err, data) => {
    let volunteers = [];

    if (!err && data) {
      volunteers = JSON.parse(data); // Existing data
    }

    // Step 2: Add the new volunteer to the list
    volunteers.push(newVolunteer);

    // Step 3: Save it back to the file
    fs.writeFile(filePath, JSON.stringify(volunteers, null, 2), (err) => {
      if (err) {
        console.error("Error saving volunteer:", err);
        return res.status(500).json({ message: "Something went wrong." });
      }

      res.json({ message: `Thank you, ${name}, for volunteering!` });
    });
  });
});
