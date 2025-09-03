const BASE_URL = "https://raksha360-backend.onrender.com";

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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}