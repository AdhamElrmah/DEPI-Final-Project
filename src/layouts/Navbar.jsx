import { useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import React from "react";
import SearchOverlay from "./SearchOverlay";
import { useAuth } from "../contexts/AuthContext";
import UserDropdown from "../components/UI/UserDropdown";

export default function Navbar({ allCars }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Cars", path: "/cars" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Services", path: "/Services" },
  ];

  const displayLinks = [...navLinks];
  if (user && user.role === "admin")
    displayLinks.push({ name: "Admin", path: "/admin" });

  return (
    <>
      {searchOpen && (
        <SearchOverlay allCars={allCars} setSearchOpen={setSearchOpen} />
      )}
      <div className=" shadow-sm relative bg-white  z-10">
        <nav className="w-full relative flex items-center justify-between px-8 py-4 h-16 max-w-[1500px] mx-auto">
          <div className="flex items-center gap-2 cursor-pointer">
            <Link to={"/"} className="font-semibold text-xl">
              <img
                src="https://framerusercontent.com/images/Stt1PRb0lYWewDn53cHjNxvC9Q.png"
                alt="Logo"
                className="h-7 w-auto object-contain" // Tailwind styling for navbar fit
              />
            </Link>
          </div>

          {/* Desktop Links (centered) */}
          <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {displayLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-bold transition ${
                      isActive
                        ? "bg-[#f5f5f5] text-gray-900 rounded-full px-3 py-1 shadow-sm"
                        : "text-gray-700 hover:text-gray-900 hover:bg-[#f5f5f5] px-3 py-1 rounded-full"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Search
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                if (menuOpen) setMenuOpen(!open);
                setSearchOpen(!searchOpen);
              }}
            />
            {user ? (
              <div className="flex items-center gap-3 relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title="Click to sign out"
                />
                <UserDropdown
                  user={user}
                  isOpen={dropdownOpen}
                  onClose={() => setDropdownOpen(false)}
                  onSignOut={() => {
                    signout();
                    setDropdownOpen(false);
                  }}
                />
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden lg:flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                <User className="w-5 h-5" />
                Sign In
              </Link>
            )}
            <Menu
              className="w-6 h-6 lg:hidden cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-t shadow-md lg:hidden z-50">
              <ul className="flex flex-col items-start gap-4 p-4">
                {displayLinks.map((link, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block text-sm font-bold transition ${
                          isActive
                            ? "bg-[#f5f5f5] text-gray-900 rounded-full px-3 py-1"
                            : "text-gray-700 hover:text-gray-900 hover:bg-[#f5f5f5] px-3 py-1 rounded-full"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {!user && (
                  <li>
                    <Link
                      to="/signin"
                      className="block text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-[#f5f5f5] px-3 py-1 rounded-full"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
