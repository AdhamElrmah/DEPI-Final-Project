import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { rentCar } from "../lib/getRent";
import SuccessDialog from "../components/UI/SuccessDialog";
import { Input } from "../components/UI/input";
import { Label } from "../components/UI/label";
import { Button } from "../components/UI/button";
import { Field, FieldLabel, FieldDescription } from "../components/UI/field";
import LoaderSpinner from "../layouts/LoaderSpinner";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PaymentPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  // Get data from location state (passed from checkout page)
  const rentalData = location.state?.rentalData;
  const car = location.state?.car;

  const [driverDays, setDriverDays] = useState(rentalData?.totalDays || 1);

  const deliveryMethods = [
    {
      id: 1,
      title: "Standard",
      turnaround: "Self-drive",
      price: "$0.00",
      value: 0,
    },
    {
      id: 2,
      title: "Private Driver",
      turnaround: "Chauffeur service",
      price: `$${(10 * (driverDays || 0)).toFixed(2)}`,
      value: 10 * (driverDays || 0),
    },
  ];

  const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState(
    deliveryMethods[0].id
  );

  const selectedDeliveryMethod = deliveryMethods.find(
    (m) => m.id === selectedDeliveryMethodId
  );

  const [paymentData, setPaymentData] = useState({
    email: user?.email || "",
    cardNumber: "",
    cardName: "",
    expirationDate: "",
    cvc: "",
    paymentMethod: "credit-card",
  });

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    // Redirect if no rental data
    if (!rentalData || !car) {
      navigate(`/cars/${carId}/checkout`);
      return;
    }
  }, [user, rentalData, car, carId, navigate]);

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePaymentData = () => {
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentData.cardNumber.replace(/\s/g, ""))) {
      setMessage({ type: "error", text: "Card number must be 16 digits" });
      return false;
    }
    if (!paymentData.cardName.trim()) {
      setMessage({ type: "error", text: "Name on card is required" });
      return false;
    }
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expirationDateRegex.test(paymentData.expirationDate)) {
      setMessage({ type: "error", text: "Invalid expiration date (MM/YY)" });
      return false;
    }
    const cvcRegex = /^\d{3,4}$/;
    if (!cvcRegex.test(paymentData.cvc)) {
      setMessage({ type: "error", text: "CVC must be 3 or 4 digits" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!validatePaymentData()) {
      setLoading(false);
      return;
    }

    try {
      // Process the rental with payment data
      const completeRentalData = {
        startDate: rentalData.startDate,
        endDate: rentalData.endDate,
        pickupLocation: rentalData.pickupLocation,
        dropoffLocation: rentalData.dropoffLocation,
        specialRequests: rentalData.specialRequests,
        paymentInfo: {
          method: paymentData.paymentMethod,
          cardNumber: paymentData.cardNumber,
          cardName: paymentData.cardName,
          expirationDate: paymentData.expirationDate,
          cvc: paymentData.cvc,
        },
      };

      // eslint-disable-next-line no-unused-vars
      const response = await rentCar(carId, completeRentalData, user.token);

      // Show success dialog
      setSuccessDialogOpen(true);
    } catch (err) {
      console.error("Payment error:", err);
      const errorMessage =
        err?.response?.data?.error || "Payment failed. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!rentalData || !car) {
    return <LoaderSpinner />;
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Payment</h2>

        <form
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          onSubmit={handleSubmit}
        >
          <div>
            {/* Contact Information - Email is pre-filled */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <Field className="mt-4">
                <FieldLabel htmlFor="email-address">Email address</FieldLabel>
                <Input
                  type="email"
                  id="email-address"
                  name="email"
                  value={paymentData.email}
                  onChange={handlePaymentChange}
                  readOnly
                />
                <FieldDescription>
                  Email is pre-filled from your account
                </FieldDescription>
              </Field>
            </div>

            {/* Payment Section */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                <Field className="col-span-4">
                  <FieldLabel htmlFor="card-number">Card number</FieldLabel>
                  <Input
                    type="text"
                    id="card-number"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </Field>

                <Field className="col-span-4">
                  <FieldLabel htmlFor="card-name">Name on card</FieldLabel>
                  <Input
                    type="text"
                    id="card-name"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentChange}
                    placeholder="John Doe"
                    required
                  />
                </Field>

                <Field className="col-span-3">
                  <FieldLabel htmlFor="expiration-date">
                    Expiration date (MM/YY)
                  </FieldLabel>
                  <Input
                    type="text"
                    id="expiration-date"
                    name="expirationDate"
                    value={paymentData.expirationDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="cvc">CVC</FieldLabel>
                  <Input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={paymentData.cvc}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    required
                  />
                </Field>
              </div>
            </div>

            {/* Delivery method */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900">
                  Delivery method
                </legend>
                <RadioGroup
                  value={selectedDeliveryMethodId}
                  onChange={setSelectedDeliveryMethodId}
                  className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                >
                  {deliveryMethods.map((deliveryMethod) => (
                    <Radio
                      key={deliveryMethod.id}
                      value={deliveryMethod.id}
                      aria-label={deliveryMethod.title}
                      aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                      className={({ checked, focus }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          focus ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, focus }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col w-full">
                              <span className="block text-sm font-medium text-gray-900">
                                {deliveryMethod.title}
                              </span>
                              <span className="mt-1 flex items-center text-sm text-gray-500">
                                {deliveryMethod.turnaround}
                              </span>
                              <span className="mt-6 text-sm font-medium text-gray-900">
                                {deliveryMethod.price}
                              </span>
                              {deliveryMethod.id === 2 && checked && (
                                <div className="mt-4">
                                  <label
                                    htmlFor="driver-days"
                                    className="block text-xs font-medium text-gray-700"
                                  >
                                    Driver Days (Max {rentalData?.totalDays})
                                  </label>
                                  <div className="mt-1 flex items-center gap-2">
                                    <input
                                      type="number"
                                      id="driver-days"
                                      min="1"
                                      max={rentalData?.totalDays}
                                      value={driverDays}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === "") {
                                          setDriverDays("");
                                          return;
                                        }
                                        const numVal = parseInt(val);
                                        if (
                                          !isNaN(numVal) &&
                                          numVal >= 1 &&
                                          numVal <= (rentalData?.totalDays || 1)
                                        ) {
                                          setDriverDays(numVal);
                                        }
                                      }}
                                      onBlur={() => {
                                        if (
                                          driverDays === "" ||
                                          driverDays < 1
                                        ) {
                                          setDriverDays(1);
                                        }
                                      }}
                                      className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                      onClick={(e) => e.stopPropagation()}
                                      onMouseDown={(e) => e.stopPropagation()}
                                      onTouchStart={(e) => e.stopPropagation()}
                                    />
                                    <span className="text-xs text-gray-500">
                                      days
                                    </span>
                                  </div>
                                </div>
                              )}
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              focus ? "border" : "border-2",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                <li className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={car.images?.main || car.logo}
                      alt={`${car.make} ${car.model}`}
                      className="w-20 rounded-md"
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <span className="font-medium text-gray-700">
                            {car.year} {car.make} {car.model}
                          </span>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {car.body_type}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {rentalData.totalDays} days • {car.transmission}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 items-end justify-between pt-2">
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${car.price_per_day}/day × {rentalData.totalDays} days
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${Number(rentalData.totalPrice).toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {selectedDeliveryMethod.price}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${(
                      Number(rentalData.totalPrice) +
                      Number(selectedDeliveryMethod.value)
                    ).toFixed(2)}
                  </dd>
                </div>
              </dl>

              {message && message.type === "error" && (
                <div className="px-4 py-6 sm:px-6">
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-800">{message.text}</div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? "Processing Payment..." : "Confirm Payment"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <SuccessDialog
        open={successDialogOpen}
        setOpen={setSuccessDialogOpen}
        title="Payment Successful!"
        message="Your payment has been processed successfully. Your car rental is now confirmed!"
        buttonText="Back to Home"
        onButtonClick={() => navigate("/")}
        onClose={() => navigate("/")}
      />
    </div>
  );
}
