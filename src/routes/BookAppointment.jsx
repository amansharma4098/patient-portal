import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          "https://raksha360-backend.onrender.com"
        }/appointments?doctor_id=${Number(doctorId)}&date=${date}&time=${time}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data?.appointment_id) {
        alert("✅ Appointment booked successfully!");
        navigate("/dashboard");
      } else {
        alert(`❌ Failed to book appointment. ${data?.detail || ""}`);
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      alert("🚨 Something went wrong while booking.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Book Appointment</h2>

        <input
          type="date"
          className="border p-2 w-full mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="border p-2 w-full mb-3"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white p-2 w-full rounded">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
