const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

router.post("/", async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (err) {
    console.error("Error saving volunteer:", err);
    res.status(500).json({ message: "Error registering volunteer" });
  }
});

module.exports = router;
