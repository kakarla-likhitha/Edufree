// src/components/VideoUpload.jsx

import React, { useState } from "react";
import axios from "axios";

function VideoUpload({ volunteerId, onUploadSuccess }) {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video file");

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("uploadedBy", volunteerId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/videos",
        formData
      );
      alert("Video uploaded successfully and sent for admin approval.");
      setVideoFile(null);
      setTitle("");
      setDescription("");
      onUploadSuccess(); // reload videos
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleUpload} className="mt-4">
      <h4>Upload a Video</h4>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-control my-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="file"
        className="form-control my-2"
        accept="video/*"
        onChange={handleFileChange}
        required
      />
      <button className="btn btn-primary" type="submit">
        Upload
      </button>
    </form>
  );
}

export default VideoUpload;
