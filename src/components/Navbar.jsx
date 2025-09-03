import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold">Raksha360 Patient</h1>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/search">Search Doctors</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}