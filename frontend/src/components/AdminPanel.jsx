import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const fetchAllVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/all");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  const handleStatusUpdate = async (videoId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/videos/${videoId}/status`, {
        status: newStatus,
      });
      fetchAllVideos(); // refresh list
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel: Manage Videos</h2>
      {videos.length === 0 ? (
        <p>No videos available.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Volunteer ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>{video.status}</td>
                <td>{video.uploadedBy}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleStatusUpdate(video._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleStatusUpdate(video._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
