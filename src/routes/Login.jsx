import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(form);
    if (res?.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      alert("Login failed!");
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6">
      
      {/* Image & Welcome Section */}
      <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center mb-8 md:mb-0">
        {/* Company Name */}
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 select-none">
          Raksha360
        </h1>

        <img
          src="https://images.unsplash.com/photo-1588776814546-0e899bb42b54?auto=format&fit=crop&w=600&q=80"
          alt="Doctor and patient"
          className="rounded-xl mb-6 w-full max-w-md object-cover shadow-md"
        />
        <h2 className="text-3xl font-bold mb-2 text-blue-700">
          Welcome Back!
        </h2>
        <p className="text-gray-600 max-w-sm">
          Securely login to book your appointments with trusted doctors.
        </p>
      </div>

      {/* Login Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 font-bold text-gray-800">Patient Login</h2>

        <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-3 w-full rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 w-full rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          New user?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
