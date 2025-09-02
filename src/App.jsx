import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SearchDoctors from "./pages/SearchDoctors";
import BookAppointment from "./pages/BookAppointment";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("patientToken");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const handleLogout = () => {
    localStorage.removeItem("patientToken");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-xl">Raksha360 Patient Portal 🩺</h1>
        <div className="space-x-4">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/search-doctors">Find Doctors</Link>
          <Link to="/book-appointment">Book Appointment</Link>
          <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/search-doctors" element={<PrivateRoute><SearchDoctors /></PrivateRoute>} />
          <Route path="/book-appointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
