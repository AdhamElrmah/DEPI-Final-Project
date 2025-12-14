import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/UI/input";
import { Label } from "../components/UI/label";
import { Button } from "../components/UI/button";
import { Textarea } from "../components/UI/textarea";
import { getCarById } from "../lib/getData";
import { checkCarAvailability as carAvailability } from "../lib/getRent";
import DateRangePicker from "@/components/Checkout/DateRangePicker";
import LoaderSpinner from "../layouts/LoaderSpinner";

export default function CheckoutPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carLoading, setCarLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  // Get rental dates from location state (passed from car details page)
  const rentalDates = location.state?.rentalDates || {};

  const [formData, setFormData] = useState({
    startDate: rentalDates.startDate || "",
    endDate: rentalDates.endDate || "",
    pickupLocation: "",
    dropoffLocation: "",
    specialRequests: "",
  });

  useEffect(() => {
    if (!user) {
      // Redirect to signin with return URL so user comes back here after login
      navigate(`/signin?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    const fetchCar = async () => {
      try {
        const carData = await getCarById(carId);
        setCar(carData);
      } catch (err) {
        console.error("Failed to fetch car:", err);
        setMessage({ type: "error", text: "Failed to load car details" });
      } finally {
        setCarLoading(false);
      }
    };

    fetchCar();
  }, [carId, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    if (!car || !formData.startDate || !formData.endDate) return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    return days > 0 ? days * car.price_per_day : 0;
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const checkCarAvailability = async (startDate, endDate) => {
    try {
      setAvailabilityLoading(true);

      const response = await carAvailability(carId, startDate, endDate);

      return {
        available: response.available,
        error: response.available
          ? null
          : "Car is already rented for the selected dates",
      };
    } catch (err) {
      console.error("Availability check error:", err);
      // If API call fails, assume car is available to not block users unnecessarily
      return { available: true };
    } finally {
      setAvailabilityLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!formData.startDate || !formData.endDate) {
      setMessage({ type: "error", text: "Please select rental dates" });
      setLoading(false);
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setMessage({ type: "error", text: "Start date cannot be in the past" });
      setLoading(false);
      return;
    }

    if (end <= start) {
      setMessage({ type: "error", text: "End date must be after start date" });
      setLoading(false);
      return;
    }

    // Check car availability before proceeding to payment
    const availabilityCheck = await checkCarAvailability(
      formData.startDate,
      formData.endDate
    );

    if (!availabilityCheck.available) {
      setMessage({ type: "error", text: availabilityCheck.error });
      setLoading(false);
      return;
    }

    // Navigate to payment page with rental data
    navigate(`/cars/${carId}/payment`, {
      state: {
        rentalData: {
          startDate: formData.startDate,
          endDate: formData.endDate,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          specialRequests: formData.specialRequests,
          totalPrice: calculateTotal(),
          totalDays: calculateDays(),
        },
        car: car,
      },
    });
  };

  if (carLoading) {
    return <LoaderSpinner />;
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Car Not Found
          </h2>
          <p className="text-gray-600">
            The car you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const totalPrice = calculateTotal();
  const totalDays = calculateDays();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Complete Your Rental</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Rental Details</h2>

          <div className="flex gap-4 mb-6">
            <img
              src={car.images?.main || car.logo}
              alt={`${car.make} ${car.model}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-gray-600">{car.body_type}</p>
              <p className="text-gray-600">
                {car.seats} seats • {car.transmission}
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${car.price_per_day}/day
              </p>
            </div>
          </div>

          {totalDays > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Duration:</span>
                <span>
                  {totalDays} day{totalDays !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Price per day:</span>
                <span>${car.price_per_day}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Booking Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <Label>Choose Rental Dates *</Label>
                <DateRangePicker
                  carId={carId}
                  value={{
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                  }}
                  onChange={(dates) =>
                    setFormData((prev) => ({ ...prev, ...dates }))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                name="pickupLocation"
                placeholder="Enter pickup location"
                value={formData.pickupLocation}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="dropoffLocation">Return Location</Label>
              <Input
                id="dropoffLocation"
                name="dropoffLocation"
                placeholder="Enter return location"
                value={formData.dropoffLocation}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="Any special requests or notes..."
                value={formData.specialRequests}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {message && message.type === "error" && (
              <div className="p-3 rounded bg-red-100 text-red-800">
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || availabilityLoading || totalDays <= 0}
              className="w-full text-lg py-3"
            >
              {loading || availabilityLoading
                ? "Checking Availability..."
                : `Continue to Payment - $${totalPrice}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
