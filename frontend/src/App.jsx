import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import VolunteerForm from "./components/VolunteerForm"; // Register
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import Login from "./components/Login";
import VolunteerDashboard from "./components/VolunteerDashboard";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/volunteer" element={<VolunteerForm />} />{" "}
          {/* Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<VolunteerDashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
