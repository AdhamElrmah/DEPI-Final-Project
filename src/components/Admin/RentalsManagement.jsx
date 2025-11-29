import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getAllRentals, updateRental, cancelRental } from "../../lib/getRent";
import ConfirmDialog from "../UI/ConfirmDialog";
import { Input } from "../UI/input";
import { Label } from "../UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/select";
import { Button } from "../UI/button";
import LoaderSpinner from "../../layouts/LoaderSpinner";

export default function RentalsManagement() {
  const { user } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingRental, setEditingRental] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const [editForm, setEditForm] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchRentals = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllRentals(user.token);
      setRentals(data);
      setFilteredRentals(data);
    } catch (err) {
      console.error("Failed to fetch rentals:", err);
      setMessage({ type: "error", text: "Failed to load rentals" });
    } finally {
      setLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRentals(rentals);
    } else {
      setFilteredRentals(
        rentals.filter((rental) => rental.status === statusFilter)
      );
    }
  }, [rentals, statusFilter]);

  const handleEditRental = (rental) => {
    setEditingRental(rental.id);
    setEditForm({
      startDate: rental.startDate,
      endDate: rental.endDate,
    });
  };

  const handleSaveEdit = async () => {
    // Validate dates
    const start = new Date(editForm.startDate);
    const end = new Date(editForm.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if start date is in the past
    if (start < today) {
      setMessage({ type: "error", text: "Start date cannot be in the past" });
      return;
    }

    // Check if end date is after start date
    if (end <= start) {
      setMessage({ type: "error", text: "End date must be after start date" });
      return;
    }

    // Calculate new total price and days
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const rental = rentals.find((r) => r.id === editingRental);
    const newTotalPrice = days * rental.pricePerDay;

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await updateRental(
        editingRental,
        {
          ...editForm,
          totalDays: days,
          totalPrice: newTotalPrice,
        },
        user.token
      );
      setMessage({ type: "success", text: "Rental updated successfully!" });
      setEditingRental(null);
      await fetchRentals();
    } catch (err) {
      console.error("Failed to update rental:", err);
      const errorMessage =
        err?.response?.data?.error || "Failed to update rental";
      setMessage({ type: "error", text: errorMessage });
    }
  };
  const handleCancelEdit = () => {
    setEditingRental(null);
    setEditForm({ startDate: "", endDate: "" });
  };

  const handleCancelRental = async (rentalId) => {
    try {
      await cancelRental(rentalId, user.token);
      setMessage({ type: "success", text: "Rental cancelled successfully!" });
      await fetchRentals();
    } catch (err) {
      console.error("Failed to cancel rental:", err);
      const errorMessage =
        err?.response?.data?.error || "Failed to cancel rental";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setConfirmOpen(false);
      setPendingAction(null);
    }
  };

  const openCancelConfirm = (rentalId) => {
    setPendingAction({ type: "cancel", rentalId });
    setConfirmOpen(true);
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

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Filters */}
      <div className="mb-6">
        <Label htmlFor="status-filter">Filter by Status</Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rentals</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rentals Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRentals.map((rental) => (
                <tr key={rental.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={
                            rental.car?.images?.main ||
                            rental.car?.logo ||
                            "/placeholder-car.jpg" // Add a fallback image
                          }
                          alt={`${rental.car?.make || "Unknown"} ${
                            rental.car?.model || "Car"
                          }`}
                        />{" "}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {rental.car?.year} {rental.car?.make}{" "}
                          {rental.car?.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${rental.pricePerDay}/day
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {rental.user?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {rental.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingRental === rental.id ? (
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="edit-start-date" className="text-xs">
                            Start Date
                          </Label>
                          <Input
                            id="edit-start-date"
                            type="date"
                            value={editForm.startDate}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                startDate: e.target.value,
                              })
                            }
                            className="text-xs"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-end-date" className="text-xs">
                            End Date
                          </Label>
                          <Input
                            id="edit-end-date"
                            type="date"
                            value={editForm.endDate}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                endDate: e.target.value,
                              })
                            }
                            className="text-xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          {new Date(rental.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-gray-400">to</div>
                        <div>
                          {new Date(rental.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${rental.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        rental.status
                      )}`}
                    >
                      {rental.status.charAt(0).toUpperCase() +
                        rental.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {editingRental === rental.id ? (
                      <div className="space-x-1">
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="space-x-1">
                        {rental.status === "active" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditRental(rental)}
                              className="text-xs"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openCancelConfirm(rental.id)}
                              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        setOpen={(v) => {
          setConfirmOpen(v);
          if (!v) setPendingAction(null);
        }}
        title="Cancel Rental"
        description="Are you sure you want to cancel this rental? This action cannot be undone."
        onConfirm={() => {
          if (pendingAction?.type === "cancel") {
            handleCancelRental(pendingAction.rentalId);
          }
        }}
        confirmText="Cancel Rental"
        cancelText="Keep Rental"
      />
    </div>
  );
}
