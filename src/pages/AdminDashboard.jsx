import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CarsManagement from "../components/Admin/CarsManagement";
import UsersManagement from "../components/Admin/UsersManagement";
import RentalsManagement from "../components/Admin/RentalsManagement";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cars");

  if (!user || user.role !== "admin") {
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
        <button
          onClick={() => setActiveTab("cars")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "cars"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Edit Cars
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "users"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Edit Users
        </button>
        <button
          onClick={() => setActiveTab("rentals")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "rentals"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Manage Rentals
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "cars" && <CarsManagement user={user} />}
      {activeTab === "users" && <UsersManagement user={user} />}
      {activeTab === "rentals" && <RentalsManagement user={user} />}
    </div>
  );
}
