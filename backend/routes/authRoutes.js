const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const bcrypt = require("bcryptjs");

// Volunteer Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if volunteer exists
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res
        .status(400)
        .json({ error: "No account found. Please register." });
    }

    // Check if password exists
    if (!volunteer.password) {
      return res
        .status(400)
        .json({ error: "Password not set for this account." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid credentials. Please try again." });
    }

    res.status(200).json({ message: "Login successful", volunteer });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
