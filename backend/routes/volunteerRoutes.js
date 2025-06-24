const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const bcrypt = require("bcryptjs");

// Register new volunteer
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, skills, password, message } = req.body;

    // Check if email already exists
    const existing = await Volunteer.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ error: "Volunteer already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const volunteer = new Volunteer({
      name,
      email,
      phone,
      skills,
      password: hashedPassword,
      message,
    });

    await volunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
