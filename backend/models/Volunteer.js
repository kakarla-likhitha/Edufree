const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: String,
  message: String,
  password: { type: String, required: true },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
