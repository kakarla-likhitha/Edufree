const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: String,
  message: String,
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
