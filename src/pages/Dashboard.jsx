import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const email = localStorage.getItem("patient");

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch(`${API_BASE_URL}/appointments?patient_email=${email}`);
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    if (email) fetchAppointments();
  }, [email]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-700">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-green-50">
                <td className="p-3">{a.doctor?.name || a.doctor_id}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;