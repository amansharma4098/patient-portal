import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const email = localStorage.getItem("patient");

  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        const res = await fetch(`${API_BASE_URL}/prescriptions?patient_email=${email}`);
        const data = await res.json();
        setPrescriptions(data);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    if (email) fetchPrescriptions();
  }, [email]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-700">My Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions yet.</p>
      ) : (
        <ul className="bg-white p-6 rounded-lg shadow-md">
          {prescriptions.map((p) => (
            <li key={p.id} className="border-b py-2">
              <strong>{p.medicine}</strong> - Prescribed by {p.doctor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Prescriptions;