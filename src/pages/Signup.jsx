import React, { useState } from "react";
import API_BASE_URL from "../config";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    age: "",
    gender: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message
    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/patient/signup?` + new URLSearchParams(form),
        { method: "POST" }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.detail || "Signup failed"}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Patient Signup</h2>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            required
          />
        ))}
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Signup
        </button>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
