import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/UI/input";
import { Label } from "../components/UI/label";
import { Button } from "../components/UI/button";
import { updateUser } from "../lib/getUsers";
import { getUserRentals, cancelRental } from "../lib/getRent";
import ConfirmDialog from "../components/UI/ConfirmDialog";
import LoaderSpinner from "../layouts/LoaderSpinner";

export default function ProfilePage() {
  const { user, updateUser: updateUserContext } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rentalsLoading, setRentalsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [rentals, setRentals] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingRentalId, setPendingRentalId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    // Load user rentals when rentals tab is active
    if (activeTab === "rentals") {
      fetchUserRentals();
    }
  }, [user, activeTab, navigate]);

  const fetchUserRentals = async () => {
    try {
      setRentalsLoading(true);
      const rentalsData = await getUserRentals(user.token);
      setRentals(rentalsData);
    } catch (err) {
      console.error("Failed to fetch rentals:", err);
      setMessage({ type: "error", text: "Failed to load rental history" });
    } finally {
      setRentalsLoading(false);
    }
  };

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
        phoneNumber: user.phoneNumber || "",
      });
      setErrors({});
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password if provided
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Validate phone number (Egyptian format) if provided
    if (formData.phoneNumber) {
      const phoneRegex = /^01[0125][0-9]{8}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid Egyptian phone number (e.g., 01012345678)";
      }
    }

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await updateUser(user.id, formData, user.token);

      // Update the auth context with new user data and token (if provided)
      updateUserContext({
        ...response,
        avatar:
          response.avatar ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${response.email}`,
        token: response.token || user.token,
      });

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      console.error("Profile update error:", err);
      const errorMessage =
        err?.response?.data?.error || "Failed to update profile";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRental = async (rentalId) => {
    try {
      await cancelRental(rentalId, user.token);
      setMessage({ type: "success", text: "Rental cancelled successfully!" });
      // Refresh rentals
      await fetchUserRentals();
    } catch (err) {
      console.error("Cancel rental error:", err);
      const errorMessage =
        err?.response?.data?.error || "Failed to cancel rental";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setConfirmOpen(false);
      setPendingRentalId(null);
    }
  };

  const openCancelConfirm = (rentalId) => {
    setPendingRentalId(rentalId);
    setConfirmOpen(true);
  };

  const canCancelRental = (rental) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(rental.startDate);
    return rental.status === "active" && startDate >= today;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "profile"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Profile Settings
        </button>
        <button
          onClick={() => setActiveTab("rentals")}
          className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
            activeTab === "rentals"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Rental History
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {user.role}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="01012345678"
              />
              {errors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">New Password (leave blank to keep current)</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {message && (
              <div
                className={`p-3 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>
      )}

      {/* Rentals Tab */}
      {activeTab === "rentals" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">My Rental History</h2>

          {rentalsLoading ? (
            <LoaderSpinner />
          ) : rentals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                You haven't rented any cars yet.
              </p>
              <Link to={"/cars"}>
                <Button className="inline-block mt-4 px-6 py-2  rounded-lg  ">
                  Browse Cars
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rentals.map((rental) => (
                <div
                  key={rental.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Car Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={
                          rental.car?.images?.main ||
                          rental.car?.logo ||
                          "/placeholder-car.jpg"
                        }
                        alt={`${rental.car?.make} ${rental.car?.model}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Rental Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {rental.car?.year} {rental.car?.make}{" "}
                            {rental.car?.model}
                          </h3>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">Pickup:</span>{" "}
                              {new Date(rental.startDate).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-medium">Return:</span>{" "}
                              {new Date(rental.endDate).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-medium">Duration:</span>{" "}
                              {rental.totalDays} day
                              {rental.totalDays !== 1 ? "s" : ""}
                            </p>
                            <p>
                              <span className="font-medium">Total:</span> $
                              {rental.totalPrice}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              rental.status
                            )}`}
                          >
                            {rental.status.charAt(0).toUpperCase() +
                              rental.status.slice(1)}
                          </span>

                          {canCancelRental(rental) && (
                            <button
                              onClick={() => openCancelConfirm(rental.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Cancel Rental
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        setOpen={(v) => {
          setConfirmOpen(v);
          if (!v) setPendingRentalId(null);
        }}
        title="Cancel Rental"
        description="Are you sure you want to cancel this rental? This action cannot be undone and you will not be charged."
        onConfirm={() => {
          if (pendingRentalId) handleCancelRental(pendingRentalId);
        }}
        confirmText="Cancel Rental"
        cancelText="Keep Rental"
      />
    </div>
  );
}
