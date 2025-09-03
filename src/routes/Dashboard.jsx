import { useEffect, useState } from "react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  async function fetchAppointments() {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          "https://raksha360-backend.onrender.com"
        }/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        const now = new Date();
        const upcoming = data.filter((appt) => {
          const apptDate = new Date(appt.date);
          return apptDate > now;
        });
        setAppointments(upcoming);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }

  async function cancelAppointment(id) {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          "https://raksha360-backend.onrender.com"
        }/appointments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("✅ Appointment cancelled");
        fetchAppointments(); // reload list
      } else {
        const err = await res.json();
        alert(`❌ Failed: ${err.detail || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  }

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">My Upcoming Appointments</h2>

      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Doctor Name</th>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-blue-50">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => cancelAppointment(a.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
