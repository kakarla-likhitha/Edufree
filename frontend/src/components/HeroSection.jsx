import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="bg-light py-5 text-center">
      <div className="container">
        <h1 className="display-4 fw-bold">
          Bringing Education to Every Village
        </h1>
        <p className="lead mb-4">
          EduFree connects volunteers with rural students to enable free quality
          education.
        </p>
        <Link to="/volunteer" className="btn btn-primary btn-lg me-2">
          Join as Volunteer
        </Link>
        <Link to="/gallery" className="btn btn-outline-secondary btn-lg">
          View Programs
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
