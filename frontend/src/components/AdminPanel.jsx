import React, { useState } from "react";

function AdminPanel() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Image to upload:", image); // Connect to backend
    alert("Image uploaded!");
    setImage(null);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Admin Panel</h2>

      <form onSubmit={handleUpload} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Upload Program Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Upload
        </button>
      </form>

      <h4>Registered Volunteers</h4>
      {/* Later: Map volunteers from backend */}
      <ul className="list-group">
        <li className="list-group-item">Volunteer 1</li>
        <li className="list-group-item">Volunteer 2</li>
        <li className="list-group-item">Volunteer 3</li>
      </ul>
    </div>
  );
}

export default AdminPanel;
