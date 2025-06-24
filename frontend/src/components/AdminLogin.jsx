import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", formData);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      alert("Admin login successful");
      navigate("/admin-panel");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Admin Login</h2>
      <input
        className="form-control my-2"
        name="username"
        placeholder="Username"
        value={formData.username}
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
      <button className="btn btn-dark" type="submit">
        Login
      </button>
    </form>
  );
}

export default AdminLogin;
