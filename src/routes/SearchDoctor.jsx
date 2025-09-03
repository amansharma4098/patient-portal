import { useState, useEffect } from "react";
import { searchDoctors } from "../api/api";
import { Link } from "react-router-dom";

export default function SearchDoctor() {
  const [form, setForm] = useState({ city: "", specialization: "" });
  const [results, setResults] = useState([]);

  // ✅ Fetch all doctors on first load
  useEffect(() => {
    async function fetchAllDoctors() {
      const res = await searchDoctors("", ""); // empty filters → backend returns all
      setResults(res || []);
    }
    fetchAllDoctors();
  }, []);

  // ✅ Handle filtered search
  async function handleSearch(e) {
    e.preventDefault();
    const res = await searchDoctors(form.city, form.specialization);
    setResults(res || []);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Doctors</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="City"
          className="border p-2"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialization"
          className="border p-2"
          value={form.specialization}
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
          }
        />
        <button className="bg-blue-600 text-white p-2 rounded">Search</button>
      </form>

      <div className="space-y-3">
        {results.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          results.map((doc) => (
            <div key={doc.id} className="border p-3 rounded bg-white">
              <p className="font-bold">{doc.name}</p>
              <p>
                {doc.specialization} - {doc.city} - {doc.email}
              </p>
              <Link
                to={`/book/${doc.id}`}
                className="text-blue-600 underline text-sm"
              >
                Book Appointment
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
