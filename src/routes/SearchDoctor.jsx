import { useState, useEffect } from "react";
import { searchDoctors } from "../api/api";
import { Link } from "react-router-dom";

export default function SearchDoctor() {
  const [form, setForm] = useState({ city: "", specialization: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all doctors on first load
  useEffect(() => {
    async function fetchAllDoctors() {
      setLoading(true);
      const res = await searchDoctors("", ""); // no filters → get all
      setResults(res || []);
      setLoading(false);
    }
    fetchAllDoctors();
  }, []);

  // ✅ Handle filtered search
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    const res = await searchDoctors(form.city, form.specialization);
    setResults(res || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-center text-indigo-700">
          👨‍⚕️ Find a Doctor
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-md mb-6"
        >
          <input
            type="text"
            placeholder="City"
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Specialization"
            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={form.specialization}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Results */}
        {loading ? (
          <p className="text-center text-gray-600">🔍 Searching doctors...</p>
        ) : results.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
            <p>No doctors found.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div>
                  <p className="text-lg font-bold text-indigo-700 mb-1">
                    {doc.name}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {doc.specialization} • {doc.city}
                  </p>
                  <p className="text-sm text-gray-500">{doc.email}</p>
                </div>

                <Link
                  to={`/book/${doc.id}`}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium shadow-md"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
