const express = require("express");
const router = express.Router();
const multer = require("multer");
const Video = require("../models/Video");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("video"), async (req, res) => {
  try {
    const { title, description, uploadedBy } = req.body;

    const video = new Video({
      title,
      description,
      videoUrl: req.file.filename,
      status: "Pending",
      uploadedBy,
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    console.error("Video upload error:", err);
    res.status(500).json({ message: "Failed to upload video" });
  }
});

// ✅ GET approved videos for homepage
router.get("/approved", async (req, res) => {
  try {
    const videos = await Video.find({ status: "Approved" }).sort({
      createdAt: -1,
    });
    res.json(videos);
  } catch (err) {
    console.error("Approved fetch error:", err);
    res.status(500).json({ message: "Failed to fetch approved videos" });
  }
});

// Get all videos uploaded by a specific volunteer
router.get("/:volunteerId", async (req, res) => {
  try {
    const videos = await Video.find({ uploadedBy: req.params.volunteerId });
    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

// Update video status
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedVideo);
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// Admin: get all videos
router.get("/all", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("Admin fetch error:", err);
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

module.exports = router;
