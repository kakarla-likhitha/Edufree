const Gallery = require("../models/Gallery");

exports.uploadImage = async (req, res) => {
  try {
    const image = new Gallery({
      imageUrl: `/uploads/${req.file.filename}`,
    });
    await image.save();
    res.status(201).json({ message: "Image uploaded!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
