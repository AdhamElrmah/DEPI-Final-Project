import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Car", path: "/cars" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Services", path: "/Services" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-2 cursor-pointer">
        <Link to={"/"} className="font-semibold text-xl">
          <img
            src="https://framerusercontent.com/images/Stt1PRb0lYWewDn53cHjNxvC9Q.png"
            alt="Logo"
            className="h-10 w-auto object-contain" // Tailwind styling for navbar fit
          />
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.path}
              className={`text-sm font-semibold hover:text-gray-700 transition ${
                link.name === "All Cars"
                  ? "bg-gray-100 px-3 py-1 rounded-lg"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 cursor-pointer" />
        <Menu
          className="w-6 h-6 md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md md:hidden">
          <ul className="flex flex-col items-start gap-4 p-4">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="block text-sm font-medium hover:text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
