import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VolunteerForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    password: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.skills.trim()) newErrors.skills = "Please list your skills";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/volunteers", formData);
      setSuccessMsg("Registration successful! Redirecting to login...");

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        password: "",
        message: "",
      });

      // Redirect after 2.5 seconds
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      alert("Error registering. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Volunteer Registration</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <input
        className="form-control my-2"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <div className="text-danger">{errors.name}</div>}

      <input
        className="form-control my-2"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <div className="text-danger">{errors.email}</div>}

      <input
        className="form-control my-2"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      {errors.phone && <div className="text-danger">{errors.phone}</div>}

      <input
        className="form-control my-2"
        name="skills"
        placeholder="Your Skills"
        value={formData.skills}
        onChange={handleChange}
      />
      {errors.skills && <div className="text-danger">{errors.skills}</div>}

      <input
        className="form-control my-2"
        type="password"
        name="password"
        placeholder="Password (min 6 characters)"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <div className="text-danger">{errors.password}</div>}

      <textarea
        className="form-control my-2"
        name="message"
        placeholder="Why do you want to volunteer?"
        value={formData.message}
        onChange={handleChange}
      />

      <button className="btn btn-primary mt-2" type="submit">
        Register
      </button>
    </form>
  );
}

export default VolunteerForm;
