import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendMessage, setBackendMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "" });
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/message")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResponseMsg(data.message);
    setForm({ name: "", email: "" });
  };

  return (
    <div className="App">
      <header className="hero">
        <h1>EduFree</h1>
        <p>{backendMessage || "Loading message from backend..."}</p>
      </header>

      <main>
        <section>
          <h2>Become a Volunteer</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
          {responseMsg && <p style={{ marginTop: "1rem" }}>{responseMsg}</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
