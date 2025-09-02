import React, { useState } from "react";
import API_BASE_URL from "../config";

function SearchDoctors() {
  const [filters, setFilters] = useState({ city: "", degree: "" });
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("patientToken");

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(filters);
    try {
      const res = await fetch(`${API_BASE_URL}/doctors?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Find Doctors</h2>
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          className="flex-1 border p-3 rounded"
          value={filters.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Enter Degree"
          className="flex-1 border p-3 rounded"
          value={filters.degree}
          onChange={handleChange}
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
              <th className="p-3 text-left">Degree</th>
              <th className="p-3 text-left">City</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id} className="border-b hover:bg-green-50">
                <td className="p-3">{d.name}</td>
                <td className="p-3">{d.specialization}</td>
                <td className="p-3">{d.degree}</td>
                <td className="p-3">{d.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchDoctors;
