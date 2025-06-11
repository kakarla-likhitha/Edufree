import React, { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Program Gallery</h2>
      <div className="row">
        {images.map((img, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={`http://localhost:5000${img.imageUrl}`}
                className="card-img-top"
                alt={`Event ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
