import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Raksha360 Patient</h1>
        
        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links - hidden on small screens unless menu is open */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0`}
        >
          <Link to="/dashboard" className="block md:inline hover:underline">
            Dashboard
          </Link>
          <Link to="/search" className="block md:inline hover:underline">
            Search Doctors
          </Link>
          <Link to="/" className="block md:inline hover:underline">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
