import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prescriptions from "./pages/Prescriptions";
import SearchDoctors from "./pages/SearchDoctors";
import BookAppointment from "./pages/BookAppointment";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-xl">Raksha360 Patient Portal 🩺</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Login</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/prescriptions" className="hover:underline">Prescriptions</Link>
          <Link to="/search-doctors" className="hover:underline">Find Doctors</Link>
          <Link to="/book-appointment" className="hover:underline">Book Appointment</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/search-doctors" element={<SearchDoctors />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;