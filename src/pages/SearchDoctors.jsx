import React, { useState } from "react";
import API_BASE_URL from "../config";

function SearchDoctors() {
  const [city, setCity] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    try {
      const res = await fetch(`${API_BASE_URL}/doctors?city=${city}`);
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Find Doctors</h2>
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter City"
          className="flex-1 border p-3 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bg-green-600 text-white px-6 rounded hover:bg-green-700">
          Search
        </button>
      </form>
      {doctors.length > 0 && (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-b hover:bg-green-50">
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.specialization}</td>
                <td className="p-3">{d.city}</td>
                <td className="p-3">{d.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchDoctors;