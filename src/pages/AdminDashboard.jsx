import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Outlet, NavLink } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
    return null;
  }

  if (user.role !== "admin") {
    navigate("/404");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        Admin Dashboard
      </h2>
      <p className="mb-3 sm:mb-4 text-sm sm:text-base">
        Signed in as <strong>{user.email}</strong>
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <NavLink
          to="/admin/cars"
          className={({ isActive }) =>
            `px-4 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Edit Cars
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `px-4 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Edit Users
        </NavLink>
        <NavLink
          to="/admin/rentals"
          className={({ isActive }) =>
            `px-4 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Manage Rentals
        </NavLink>
        <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            `px-4 py-2 font-semibold border-b-2 transition-colors ${
              isActive
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Manage Reviews
        </NavLink>
      </div>

      {/* Tab Content */}
      <Outlet />
    </div>
  );
}
