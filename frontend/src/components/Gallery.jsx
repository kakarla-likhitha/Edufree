import React from "react";

const images = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
];

function Gallery() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Program Gallery</h2>
      <div className="row">
        {images.map((src, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={src}
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
