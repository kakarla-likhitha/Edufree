import React, { useState } from "react";

function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Later send this to backend
    alert("Thank you for registering!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      message: "",
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Volunteer Registration</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Your Skills / Subjects you can teach
          </label>
          <input
            type="text"
            name="skills"
            className="form-control"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Why do you want to volunteer?</label>
          <textarea
            name="message"
            className="form-control"
            rows="3"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VolunteerForm;
