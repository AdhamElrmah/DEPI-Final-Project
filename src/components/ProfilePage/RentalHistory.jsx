import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../UI/button";
import { getUserRentals, cancelRental } from "../../lib/getRent";
import { getUserReviews } from "../../lib/getReviews";
import ConfirmDialog from "../UI/ConfirmDialog";
import LoaderSpinner from "../../layouts/LoaderSpinner";
import StarRating from "../UI/StarRating";

export default function RentalHistory() {
  const { user } = useAuth();
  const [rentalsLoading, setRentalsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingRentalId, setPendingRentalId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setRentalsLoading(true);
      const [rentalsData, reviewsData] = await Promise.all([
        getUserRentals(user.token),
        getUserReviews(user.token),
      ]);
      setRentals(rentalsData);
      setReviews(reviewsData.reviews || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setMessage({ type: "error", text: "Failed to load rental history" });
    } finally {
      setRentalsLoading(false);
    }
  };

  const handleCancelRental = async (rentalId) => {
    try {
      await cancelRental(rentalId, user.token);
      setMessage({ type: "success", text: "Rental cancelled successfully!" });
      // Refresh rentals
      await fetchData();
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

  const getReviewForCar = (carId) => {
    return reviews.find((r) => r.carId === carId || r.carId?._id === carId);
  };

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

      {rentalsLoading ? (
        <LoaderSpinner />
      ) : rentals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't rented any cars yet.
          </p>
          <Link to={"/cars"}>
            <Button className="inline-block mt-4 px-6 py-2 rounded-lg">
              Browse Cars
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-lg shadow-md p-6">
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

                      {/* Review Section for Completed Rentals */}
                      {rental.status === "completed" && (
                        <div className="mt-1">
                          {getReviewForCar(rental.car?.id || rental.carId) ? (
                            <div className="flex flex-col items-end">
                              <StarRating
                                rating={
                                  getReviewForCar(
                                    rental.car?.id || rental.carId
                                  ).rating
                                }
                                readonly
                                size="w-4 h-4"
                              />
                            </div>
                          ) : (
                            <Link
                              to={`/cars/${
                                rental.car?.id || rental.carId
                              }#reviews`}
                              className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                            >
                              Review the car
                            </Link>
                          )}
                        </div>
                      )}

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
