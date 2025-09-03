import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          "https://raksha360-backend.onrender.com"
        }/appointments?doctor_id=${Number(doctorId)}&date=${date}&time=${time}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-6">
          📅 Book Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]} // disable past dates
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Time
            </label>
            <input
              type="time"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
