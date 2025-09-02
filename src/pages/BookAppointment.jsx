import React, { useState } from "react";
import API_BASE_URL from "../config";

function BookAppointment() {
  const [form, setForm] = useState({ doctor_id: "", date: "" });
  const token = localStorage.getItem("patientToken");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          patient_id: 1, // ⚠️ replace with actual logged-in patient ID
          doctor_id: parseInt(form.doctor_id),
          date: form.date,
        }),
      });
      const data = await res.json();
      alert("✅ Appointment booked: " + JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Book Appointment</h2>
      <form onSubmit={handleBook} className="bg-white p-6 rounded shadow-md max-w-lg">
        <input
          type="number"
          name="doctor_id"
          placeholder="Doctor ID"
          className="w-full border p-3 rounded mb-4"
          value={form.doctor_id}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="date"
          className="w-full border p-3 rounded mb-4"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Book
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
