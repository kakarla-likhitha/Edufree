import React, { useEffect, useState } from "react";
import axios from "axios";

function HeroSection() {
  const [approvedVideos, setApprovedVideos] = useState([]);

  useEffect(() => {
    fetchApprovedVideos();
  }, []);

  const fetchApprovedVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/approved");
      setApprovedVideos(res.data);
    } catch (err) {
      console.error("Error fetching approved videos:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Welcome to EduFree</h1>
      <p>Learn and grow with the help of passionate volunteers!</p>

      <h3 className="mt-5">Approved Educational Videos</h3>
      {approvedVideos.length === 0 ? (
        <p>No approved videos available yet.</p>
      ) : (
        <div className="row">
          {approvedVideos.map((video) => (
            <div key={video._id} className="col-md-4 mb-4">
              <div className="card">
                <video
                  controls
                  width="100%"
                  height="200"
                  src={`http://localhost:5000/uploads/${video.videoUrl}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HeroSection;
