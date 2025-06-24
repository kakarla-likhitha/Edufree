import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoUpload from "./VideoUpload";

function VolunteerDashboard() {
  const [volunteer, setVolunteer] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const storedVolunteer = JSON.parse(localStorage.getItem("volunteer"));
    if (storedVolunteer) {
      setVolunteer(storedVolunteer);
      fetchVideos(storedVolunteer._id);
    }
  }, []);

  const fetchVideos = async (volunteerId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/videos/${volunteerId}`
      );
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  const handleUploadSuccess = () => {
    if (volunteer) fetchVideos(volunteer._id);
  };

  if (!volunteer)
    return (
      <p className="text-center mt-4">Please log in to view your dashboard.</p>
    );

  return (
    <div className="container mt-4">
      <div className="card p-3 mb-4">
        <h3>Welcome, {volunteer.name}</h3>
        <p>
          <strong>Email:</strong> {volunteer.email}
        </p>
        <p>
          <strong>Phone:</strong> {volunteer.phone}
        </p>
        <p>
          <strong>Skills:</strong> {volunteer.skills}
        </p>
      </div>

      <div className="card p-3 mb-4">
        <h4>Upload a New Video</h4>
        <VideoUpload
          volunteerId={volunteer._id}
          onUploadSuccess={handleUploadSuccess}
        />
      </div>

      <div className="card p-3">
        <h4>My Uploaded Videos</h4>
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td>{video.title}</td>
                  <td>{video.description}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        video.status === "Approved" ? "success" : "warning"
                      }`}
                    >
                      {video.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VolunteerDashboard;
