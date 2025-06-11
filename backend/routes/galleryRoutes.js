const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage, getImages } = require("../controllers/galleryController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImages);

module.exports = router;
