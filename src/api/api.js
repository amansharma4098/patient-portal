const BASE_URL = "https://raksha360-backend.onrender.com";

// Helper to get Authorization header
function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function signup(data) {
  const res = await fetch(`${BASE_URL}/patients/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${BASE_URL}/patients/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function searchDoctors(city, specialization) {
  const res = await fetch(
    `${BASE_URL}/doctors/?city=${city}&specialization=${specialization}`
  );
  return res.json();
}

export async function bookAppointment(data) {
  const res = await fetch(`${BASE_URL}/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// New function to get patient appointments with auth header
export async function getAppointments() {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "GET",
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) {
    // You can customize error handling here
    throw new Error("Unauthorized or failed to fetch appointments");
  }

  return res.json();
}
