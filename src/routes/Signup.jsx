import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    age: "",
    gender: ""
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup(form);
    if (res?.patient_id) {
      alert("Signup successful! Please login.");
      navigate("/");
    } else {
      alert(res?.detail || "Signup failed!");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Patient Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="City"
          className="border p-2 w-full mb-3"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Age"
          className="border p-2 w-full mb-3"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        <select
          className="border p-2 w-full mb-3"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button className="bg-green-600 text-white p-2 w-full rounded">
          Signup
        </button>

        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
