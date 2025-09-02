import React, { useState } from "react";
import API_BASE_URL from "../config";

function BookAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const email = localStorage.getItem("patient");

  const handleBook = async (e) => {
    e.preventDefault();
    if (!doctorId || !date) return alert("Fill all fields");
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: email,
          patient_email: email,
          doctor_id: parseInt(doctorId),
          date,
        }),
      });
      const data = await res.json();
      alert("✅ Appointment booked: " + JSON.stringify(data));
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Book Appointment</h2>
      <form onSubmit={handleBook} className="bg-white p-6 rounded shadow-md max-w-lg">
        <input
          type="number"
          placeholder="Doctor ID"
          className="w-full border p-3 rounded mb-4"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-full border p-3 rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Book
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;