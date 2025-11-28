import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <NavLink
          to="/profile/settings"
          className={({ isActive }) =>
            `px-4 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Profile Settings
        </NavLink>
        <NavLink
          to="/profile/rentals"
          className={({ isActive }) =>
            `px-4 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Rental History
        </NavLink>
      </div>

      {/* Tab Content */}
      <Outlet />
    </div>
  );
}
