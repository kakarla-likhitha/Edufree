// src/components/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ needed for redirect

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      alert(`Welcome back, ${res.data.volunteer.name}!`);
      localStorage.setItem("volunteer", JSON.stringify(res.data.volunteer));
      navigate("/dashboard"); // ✅ go to dashboard after login
    } catch (err) {
      console.error(err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Volunteer Login</h2>
      <input
        className="form-control my-2"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className="form-control my-2"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button className="btn btn-success" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
