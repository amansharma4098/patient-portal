import { useEffect, useState } from "react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem("token");

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    "https://raksha360-backend.onrender.com";

  async function fetchAppointments() {
    try {
      const res = await fetch(`${baseUrl}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        const now = new Date();
        const upcoming = data.filter((appt) => new Date(appt.date) > now);

        // ✅ Fetch doctor name for each appointment
        const withDoctorNames = await Promise.all(
          upcoming.map(async (appt) => {
            try {
              const docRes = await fetch(`${baseUrl}/doctors/${appt.doctor_id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const doctor = await docRes.json();
              return {
                ...appt,
                doctorName: doctor?.name || `Doctor #${appt.doctor_id}`,
              };
            } catch {
              return { ...appt, doctorName: `Doctor #${appt.doctor_id}` };
            }
          })
        );

        setAppointments(withDoctorNames);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }

  async function cancelAppointment(id) {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;
    setLoadingId(id);

    try {
      const res = await fetch(`${baseUrl}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("✅ Appointment cancelled");
        fetchAppointments();
      } else {
        const err = await res.json();
        alert(`❌ Failed: ${err.detail || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    } finally {
      setLoadingId(null);
    }
  }

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-center text-indigo-700">
          🩺 My Upcoming Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
            <p>No upcoming appointments.</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b hover:bg-indigo-50 transition-colors"
                    >
                      <td className="p-4 font-medium">{a.doctorName}</td>
                      <td className="p-4">
                        {new Date(a.date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            a.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : a.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          disabled={loadingId === a.id}
                          onClick={() => cancelAppointment(a.id)}
                          className={`px-4 py-2 rounded-full text-white font-medium shadow-md transition ${
                            loadingId === a.id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {loadingId === a.id ? "Cancelling..." : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {appointments.map((a) => (
                <div
                  key={a.id}
                  className="border rounded-lg shadow-sm p-4 bg-white"
                >
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-semibold mb-2">{a.doctorName}</p>

                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="mb-2">
                    {new Date(a.date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  <p className="text-sm text-gray-500">Status</p>
                  <p className="mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        a.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : a.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </p>

                  <button
                    disabled={loadingId === a.id}
                    onClick={() => cancelAppointment(a.id)}
                    className={`w-full py-2 rounded-lg text-white font-medium shadow-md transition ${
                      loadingId === a.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {loadingId === a.id ? "Cancelling..." : "Cancel"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
