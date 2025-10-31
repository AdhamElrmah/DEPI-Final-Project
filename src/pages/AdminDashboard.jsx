import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/UI/ConfirmDialog";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { getAllCars, createCar, updateCar, deleteCar } from "../lib/getData";
// import { Input } from "@/components/UI/input";

const defaultCar = {
  id: "2019-fiat-500",
  make: "Fiat",
  model: "500",
  logo: "https://framerusercontent.com/images/ELPJflVOVAUOOEqZmPzcyDYmo.png",
  year: 2019,
  overview:
    "A turbocharged 1.4-liter four-cylinder is now the sole engine available; the car isn't lightning-quick, but its 135 ponies scoot it around town just fine. The last time we tested a 500 with this engine was in 2013 and it delivered a zero-to-60-mph time of 8.1 seconds. A six-speed automatic is optional, but those who prefer to shift for themselves can stay with the standard five-speed manual.\n \nDespite Fiat's claim that the 500's suspension is sport tuned, there's not much athleticism in this chassis. But no one buys a Fiat 500 for the performance—well, maybe those interested in the hot Abarth model do—as the diminutive city car is more of a fashion accessory.",
  body_type: "Hatchback",
  seats: 2,
  fuel_consumption: "12-18 mpg",
  engine: {
    type: "4-Cylinder",
    displacement: "1.4L",
    configuration: "I4 8V GDI",
    power_hp: 135,
  },
  transmission: "Automatic",
  drivetrain: "FWD",
  fuel_type: "Gasoline",
  colors: {
    exterior: "#CFCFCF",
    interior: "#EBEBEB",
  },
  primary_features: [
    "17-inch aluminum wheels",
    "LED headlights",
    "Rain-sensing windshield wipers",
    "Push-button start",
    "Forward collision warning",
    "Lane departure warning",
    "Front and rear parking sensors",
  ],
  additional_features: [
    "Keyless access",
    "Power moonroof",
    "Heated front seats",
    "Heated steering wheel",
    "Wireless device charging",
    "Harman Kardon stereo",
  ],
  images: {
    main: "https://framerusercontent.com/images/piP6vECWdDgFFQpiFmHNyzvDO0g.jpg",
    sub1: "https://framerusercontent.com/images/HGsi7BjXwHAYVf11AvwOHYzJo8.jpeg",
    sub2: "https://framerusercontent.com/images/TqNxJmgl4C80Quso07lFuYMNss.jpeg",
    sub3: "https://framerusercontent.com/images/OC9tPNJKsDOrahAT6eBrLVwiQA.jpeg",
    sub4: "https://framerusercontent.com/images/VE6hCt4PNz94ntTDfTX3bPRU2s.jpeg",
  },
  price_per_day: 19,
  currency: "USD",
  rental_conditions:
    "Renting a sports car also allows you to explore Dubai in a way that you never thought was possible. You can take a leisurely drive along the stunning coastline of Dubai, take a scenic route through the desert or simply enjoy the breathtaking views of the city. No matter where you go, a sports car rental in Dubai will always make your journey a memorable one.",
  rental_class: "Economy",
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(defaultCar);
  const [msg, setMsg] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    // fetch all cars (only when user is present)
    const fetchItems = async () => {
      if (!user) return;
      try {
        const data = await getAllCars(undefined, user.token);
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setMsg({ type: "error", text: err.message });
      }
    };
    fetchItems();
  }, [user]);

  if (!user || user.role !== "admin") {
    navigate("/signin");
    return null;
  }

  const refreshItems = async () => {
    try {
      const data = await getAllCars(undefined, user.token);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      // required fields
      if (
        !car ||
        !car.id ||
        !car.make ||
        !car.model ||
        car.price_per_day === undefined ||
        car.price_per_day === null
      ) {
        throw new Error("Please provide id, make, model and price_per_day");
      }

      // Prepare payload: convert comma-separated features to arrays
      const payload = {
        ...car,
        primary_features:
          typeof car.primary_features === "string"
            ? car.primary_features
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : car.primary_features || [],
        additional_features:
          typeof car.additional_features === "string"
            ? car.additional_features
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : car.additional_features || [],
      };

      try {
        if (selectedId) {
          await updateCar(selectedId, payload, user.token);
        } else {
          await createCar(payload, user.token);
        }
      } catch (err) {
        // normalize axios error message if present
        const msgErr =
          err?.response?.data?.error || err?.message || "Failed to save car";
        throw new Error(msgErr);
      }

      setMsg({
        type: "success",
        text: selectedId ? "Car updated" : "Car added",
      });
      setSelectedId(null);
      setCar(defaultCar);
      await refreshItems();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
  };

  const handleSelect = (item) => {
    setSelectedId(item.id);
    setCar({
      ...item,
      primary_features: Array.isArray(item.primary_features)
        ? item.primary_features.join(", ")
        : item.primary_features || "",
      additional_features: Array.isArray(item.additional_features)
        ? item.additional_features.join(", ")
        : item.additional_features || "",
    });
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (itemId) => {
    setMsg(null);
    try {
      try {
        await deleteCar(itemId, user.token);
      } catch (err) {
        const msgErr =
          err?.response?.data?.error || err?.message || "Failed to delete car";
        throw new Error(msgErr);
      }
      setMsg({ type: "success", text: "Car deleted" });
      // clear selection if it was the deleted one
      if (selectedId === itemId) {
        setSelectedId(null);
        setCar(defaultCar);
      }
      await refreshItems();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        Admin Dashboard
      </h2>
      <p className="mb-3 sm:mb-4 text-sm sm:text-base">
        Signed in as <strong>{user.email}</strong>
      </p>

      {msg && (
        <div
          className={
            msg.type === "error"
              ? "text-red-600 mb-3 sm:mb-4"
              : "text-green-600 mb-3 sm:mb-4"
          }
        >
          {msg.text}
        </div>
      )}

      {/* Confirm delete dialog */}
      <ConfirmDialog
        open={confirmOpen}
        setOpen={(v) => {
          setConfirmOpen(v);
          if (!v) setPendingDeleteId(null);
        }}
        title={"Delete car"}
        description={
          items.find((i) => i.id === pendingDeleteId)
            ? `Are you sure you want to delete ${
                items.find((i) => i.id === pendingDeleteId).make
              } ${
                items.find((i) => i.id === pendingDeleteId).model
              }? This action cannot be undone.`
            : "Are you sure you want to delete this car? This action cannot be undone."
        }
        onConfirm={() => {
          if (pendingDeleteId) handleDelete(pendingDeleteId);
        }}
        confirmText={"Delete"}
        cancelText={"Cancel"}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* All cars (Delete - edit) */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="mb-2 font-medium text-sm sm:text-base">
            All Cars ({items.length})
          </div>
          <div className="space-y-2 max-h-[50vh] lg:max-h-[70vh] overflow-auto">
            {items.map((it) => (
              <div
                key={it.id}
                className="p-2 sm:p-3 border rounded flex items-center justify-between"
              >
                <div className="text-xs sm:text-sm">
                  <div className="font-semibold">
                    {it.make} {it.model}{" "}
                    <span className="text-xs text-gray-500">
                      ({it.year || "--"})
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">{it.id}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSelect(it)}
                    className="px-2 py-1 bg-yellow-400 text-xs rounded hover:bg-yellow-500 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setPendingDeleteId(it.id);
                      setConfirmOpen(true);
                    }}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                setSelectedId(null);
                setCar(defaultCar);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-3 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              New Car
            </button>
          </div>
        </div>

        {/* Form for (Add - update) Cars */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label
                    htmlFor="car-id"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    ID
                  </Label>
                  <Input
                    id="car-id"
                    value={car.id || ""}
                    onChange={(e) => setCar({ ...car, id: e.target.value })}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-make"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Make
                  </Label>
                  <Input
                    id="car-make"
                    value={car.make || ""}
                    onChange={(e) => setCar({ ...car, make: e.target.value })}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-model"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Model
                  </Label>
                  <Input
                    id="car-model"
                    value={car.model || ""}
                    onChange={(e) => setCar({ ...car, model: e.target.value })}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-logo"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Logo URL
                  </Label>
                  <Input
                    id="car-logo"
                    value={car.logo || ""}
                    onChange={(e) => setCar({ ...car, logo: e.target.value })}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-year"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Year
                  </Label>
                  <Input
                    id="car-year"
                    type="number"
                    value={car.year || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        year: e.target.value ? parseInt(e.target.value) : "",
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-bodytype"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Body type
                  </Label>
                  <Input
                    id="car-bodytype"
                    value={car.body_type || ""}
                    onChange={(e) =>
                      setCar({ ...car, body_type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-seats"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Seats
                  </Label>
                  <Input
                    id="car-seats"
                    type="number"
                    value={car.seats || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        seats: e.target.value ? parseInt(e.target.value) : "",
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-fuel"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Fuel consumption
                  </Label>
                  <Input
                    id="car-fuel"
                    value={car.fuel_consumption || ""}
                    onChange={(e) =>
                      setCar({ ...car, fuel_consumption: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-3">
                <Label
                  htmlFor="car-overview"
                  className="block text-sm sm:text-base font-semibold mb-1"
                >
                  Overview
                </Label>
                <Input
                  as="textarea"
                  id="car-overview"
                  value={car.overview || ""}
                  onChange={(e) => setCar({ ...car, overview: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Label
                    htmlFor="car-transmission"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Transmission
                  </Label>
                  <Input
                    id="car-transmission"
                    value={car.transmission || ""}
                    onChange={(e) =>
                      setCar({ ...car, transmission: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-drivetrain"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Drivetrain
                  </Label>
                  <Input
                    id="car-drivetrain"
                    value={car.drivetrain || ""}
                    onChange={(e) =>
                      setCar({ ...car, drivetrain: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-fueltype"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Fuel type
                  </Label>
                  <Input
                    id="car-fueltype"
                    value={car.fuel_type || ""}
                    onChange={(e) =>
                      setCar({ ...car, fuel_type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-price"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Price per day
                  </Label>
                  <Input
                    id="car-price"
                    type="number"
                    value={car.price_per_day || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        price_per_day: e.target.value
                          ? parseFloat(e.target.value)
                          : "",
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-currency"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Currency
                  </Label>
                  <Input
                    id="car-currency"
                    value={car.currency || ""}
                    onChange={(e) =>
                      setCar({ ...car, currency: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-rentalclass"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Rental class
                  </Label>
                  <Input
                    id="car-rentalclass"
                    value={car.rental_class || ""}
                    onChange={(e) =>
                      setCar({ ...car, rental_class: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="car-enginetype"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Engine type
                  </Label>
                  <Input
                    id="car-enginetype"
                    value={(car.engine && car.engine.type) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        engine: { ...(car.engine || {}), type: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-enginedisplacement"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Engine displacement
                  </Label>
                  <Input
                    id="car-enginedisplacement"
                    value={(car.engine && car.engine.displacement) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        engine: {
                          ...(car.engine || {}),
                          displacement: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-engineconfig"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Engine configuration
                  </Label>
                  <Input
                    id="car-engineconfig"
                    value={(car.engine && car.engine.configuration) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        engine: {
                          ...(car.engine || {}),
                          configuration: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-enginepower"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Engine power (hp)
                  </Label>
                  <Input
                    id="car-enginepower"
                    type="number"
                    value={(car.engine && car.engine.power_hp) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        engine: {
                          ...(car.engine || {}),
                          power_hp: e.target.value
                            ? parseInt(e.target.value)
                            : "",
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="car-colorexterior"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Color exterior (hex)
                  </Label>
                  <Input
                    id="car-colorexterior"
                    value={(car.colors && car.colors.exterior) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        colors: {
                          ...(car.colors || {}),
                          exterior: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-colorinterior"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Color interior (hex)
                  </Label>
                  <Input
                    id="car-colorinterior"
                    value={(car.colors && car.colors.interior) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        colors: {
                          ...(car.colors || {}),
                          interior: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="car-primaryfeatures"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Primary features (comma separated)
                  </Label>
                  <Input
                    id="car-primaryfeatures"
                    value={car.primary_features || ""}
                    onChange={(e) =>
                      setCar({ ...car, primary_features: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-additionalfeatures"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Additional features (comma separated)
                  </Label>
                  <Input
                    id="car-additionalfeatures"
                    value={car.additional_features || ""}
                    onChange={(e) =>
                      setCar({ ...car, additional_features: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="car-imgmain"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Image - main
                  </Label>
                  <Input
                    id="car-imgmain"
                    value={(car.images && car.images.main) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        images: { ...(car.images || {}), main: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-imgsub1"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Image - sub1
                  </Label>
                  <Input
                    id="car-imgsub1"
                    value={(car.images && car.images.sub1) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        images: { ...(car.images || {}), sub1: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-imgsub2"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Image - sub2
                  </Label>
                  <Input
                    id="car-imgsub2"
                    value={(car.images && car.images.sub2) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        images: { ...(car.images || {}), sub2: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-imgsub3"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Image - sub3
                  </Label>
                  <Input
                    id="car-imgsub3"
                    value={(car.images && car.images.sub3) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        images: { ...(car.images || {}), sub3: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="car-imgsub4"
                    className="block text-sm sm:text-base font-semibold mb-1"
                  >
                    Image - sub4
                  </Label>
                  <Input
                    id="car-imgsub4"
                    value={(car.images && car.images.sub4) || ""}
                    onChange={(e) =>
                      setCar({
                        ...car,
                        images: { ...(car.images || {}), sub4: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-3">
                <Label
                  htmlFor="car-rentalconditions"
                  className="block text-sm font-medium"
                >
                  Rental conditions
                </Label>
                <Input
                  as="textarea"
                  id="car-rentalconditions"
                  value={car.rental_conditions || ""}
                  onChange={(e) =>
                    setCar({ ...car, rental_conditions: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                {selectedId ? "Save Changes" : "Add Car"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setCar(defaultCar);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
              >
                Reset Form
              </button>
              {selectedId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null);
                    setCar(defaultCar);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors text-sm sm:text-base"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
