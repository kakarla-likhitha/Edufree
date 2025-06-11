const Volunteer = require("../models/Volunteer");

exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: "Volunteer registered!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
