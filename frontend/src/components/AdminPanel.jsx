import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [volunteers, setVolunteers] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/volunteers")
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded!");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <h3>Registered Volunteers</h3>
      <ul className="list-group">
        {volunteers.map((v, index) => (
          <li className="list-group-item" key={index}>
            {v.name} – {v.email} – {v.skills}
          </li>
        ))}
      </ul>

      <h3 className="mt-5">Upload Event Image</h3>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className="btn btn-primary mt-2" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;
