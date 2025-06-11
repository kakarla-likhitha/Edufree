import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import VolunteerForm from "./components/VolunteerForm";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 container my-4">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
