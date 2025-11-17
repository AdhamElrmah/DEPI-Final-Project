/* eslint-env node */
/* global require, module */

const fs = require("fs");
const path = require("path");
const { Buffer } = require("buffer");

const Car =
  process.env.USE_MONGODB === "true" ? require("../models/Car") : null;
const Rental =
  process.env.USE_MONGODB === "true" ? require("../models/Rental") : null;
const User =
  process.env.USE_MONGODB === "true" ? require("../models/User") : null;

// Helper functions for JSON fallback
const carsPath = path.join(__dirname, "..", "cars.json");
const rentalsPath = path.join(__dirname, "..", "rentItem.json");
const usersPath = path.join(__dirname, "..", "users.json");

const readCars = () => {
  if (!fs.existsSync(carsPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(carsPath, "utf8") || "[]");
  } catch {
    return [];
  }
};

const readRentals = () => {
  if (!fs.existsSync(rentalsPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(rentalsPath, "utf8") || "[]");
  } catch {
    return [];
  }
};

const readUsers = () => {
  if (!fs.existsSync(usersPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
  } catch {
    return [];
  }
};

const writeRentals = (rentals) => {
  fs.writeFileSync(rentalsPath, JSON.stringify(rentals, null, 2), "utf8");
};

const writeCars = (cars) => {
  fs.writeFileSync(carsPath, JSON.stringify(cars, null, 2), "utf8");
};

const addItem = async (req, res) => {
  try {
    const carData = req.body;

    if (process.env.USE_MONGODB === "true" && Car) {
      // Only check ID duplicates, allow multiple cars with same specs
      if (carData.id) {
        const existingCar = await Car.findOne({ id: carData.id });
        if (existingCar) {
          return res.status(409).json({
            error: `Car with ID "${carData.id}" already exists. Please use a different ID.`,
          });
        }
      }

      /*
      // Check if car with same make/model/year already exists
      const existingCar = await Car.findOne({
        make: carData.make,
        model: carData.model,
        year: carData.year,
      });
      if (existingCar) {
        return res.status(409).json({
          error: `Car "${carData.year} ${carData.make} ${carData.model}" already exists.`,
        });
      }
      */

      const car = await Car.create(carData);
      res.status(201).json(car);
    } else {
      // JSON fallback
      const cars = readCars();

      // Check for duplicate id
      if (carData.id && cars.find((c) => c.id === carData.id)) {
        return res.status(409).json({
          error: `Car with ID "${carData.id}" already exists. Please use a different ID.`,
        });
      }

      const newCar = {
        id: carData.id || (cars.length ? cars[cars.length - 1].id + 1 : 1),
        ...carData,
      };
      cars.push(newCar);
      writeCars(cars);
      res.status(201).json(newCar);
    }
  } catch (error) {
    console.error("Add item error:", error);

    // Handle MongoDB duplicate key error gracefully
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const value = error.keyValue[field];
      return res.status(409).json({
        error: `Car with ${field} "${value}" already exists. Please use a different value.`,
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        error: `Validation Error: ${messages.join(", ")}`,
      });
    }

    res.status(500).json({ error: "Server error" });
  }
};

const listAllItems = async (req, res) => {
  try {
    if (process.env.USE_MONGODB === "true" && Car) {
      const cars = await Car.find();
      res.status(200).json(cars);
    } else {
      const cars = readCars();
      res.status(200).json(cars);
    }
  } catch (error) {
    console.error("List items error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getItemById = async (req, res) => {
  try {
    if (process.env.USE_MONGODB === "true" && Car) {
      // Find by the custom id field, not MongoDB _id
      const car = await Car.findOne({ id: req.params.id });
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.status(200).json(car);
    } else {
      const cars = readCars();
      const car = cars.find((c) => c.id == req.params.id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.status(200).json(car);
    }
  } catch (error) {
    console.error("Get item error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateItem = async (req, res) => {
  try {
    if (process.env.USE_MONGODB === "true" && Car) {
      // Find by custom id field
      const car = await Car.findOneAndUpdate({ id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.status(200).json(car);
    } else {
      const cars = readCars();
      const carIndex = cars.findIndex((c) => c.id == req.params.id);
      if (carIndex === -1) {
        return res.status(404).json({ error: "Car not found" });
      }
      cars[carIndex] = { ...cars[carIndex], ...req.body };
      writeCars(cars);
      res.status(200).json(cars[carIndex]);
    }
  } catch (error) {
    console.error("Update item error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    if (process.env.USE_MONGODB === "true" && Car) {
      // Find by custom id field
      const car = await Car.findOneAndDelete({ id: req.params.id });
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.status(200).json({ message: "Car deleted successfully" });
    } else {
      const cars = readCars();
      const carIndex = cars.findIndex((c) => c.id == req.params.id);
      if (carIndex === -1) {
        return res.status(404).json({ error: "Car not found" });
      }
      cars.splice(carIndex, 1);
      writeCars(cars);
      res.status(200).json({ message: "Car deleted successfully" });
    }
  } catch (error) {
    console.error("Delete item error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const checkCarAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required" });
    }

    if (process.env.USE_MONGODB === "true" && Rental) {
      const isOverlapping = await Rental.findOne({
        carId: id,
        status: "active",
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      });

      res.status(200).json({
        available: !isOverlapping,
        car: { id },
      });
    } else {
      const rentals = readRentals();
      const isOverlapping = rentals.some(
        (rental) =>
          rental.carId == id &&
          rental.status === "active" &&
          rental.startDate <= endDate &&
          rental.endDate >= startDate
      );

      res.status(200).json({
        available: !isOverlapping,
        car: { id },
      });
    }
  } catch (err) {
    console.error("Availability check error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const rentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      specialRequests,
      paymentInfo,
    } = req.body;

    // Get current user from token
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    let currentUser;

    if (process.env.USE_MONGODB === "true" && User) {
      currentUser = await User.findOne({ email: currentUserEmail });
    } else {
      const users = readUsers();
      currentUser = users.find((u) => u.email === currentUserEmail);
    }

    if (!currentUser) return res.status(401).json({ error: "Unauthorized" });

    let car;
    if (process.env.USE_MONGODB === "true" && Car) {
      car = await Car.findById(id);
    } else {
      const cars = readCars();
      car = cars.find((c) => c.id == id);
    }

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Check availability
    let isOverlapping;
    if (process.env.USE_MONGODB === "true" && Rental) {
      isOverlapping = await Rental.findOne({
        carId: process.env.USE_MONGODB === "true" ? car._id : id,
        status: "active",
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      });
    } else {
      const rentals = readRentals();
      isOverlapping = rentals.some(
        (rental) =>
          rental.carId == id &&
          rental.status === "active" &&
          rental.startDate <= endDate &&
          rental.endDate >= startDate
      );
    }

    if (isOverlapping) {
      return res
        .status(400)
        .json({ error: "Car is already rented for the selected dates" });
    }

    // Calculate pricing
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * (car.price_per_day || car.pricePerDay);

    if (process.env.USE_MONGODB === "true" && Rental) {
      const rental = new Rental({
        carId: car._id,
        userId: currentUser._id,
        userEmail: currentUser.email || currentUserEmail,
        userName: currentUser.name,
        startDate,
        endDate,
        pickupLocation: pickupLocation || "Default Location",
        dropoffLocation: dropoffLocation || "Default Location",
        specialRequests: specialRequests || "",
        totalDays: days,
        pricePerDay: car.price_per_day,
        totalPrice,
        paymentInfo,
        status: "active",
      });

      await rental.save();

      res.status(200).json({
        message: "Car rented successfully",
        rental: {
          ...rental.toObject(),
          car: car,
        },
      });
    } else {
      const rentals = readRentals();
      const rentalId = Date.now().toString();
      const rentalData = {
        id: rentalId,
        carId: car.id,
        userId: currentUser.id,
        userEmail: currentUserEmail,
        userName: currentUser.name,
        startDate,
        endDate,
        pickupLocation: pickupLocation || "Default Location",
        dropoffLocation: dropoffLocation || "Default Location",
        specialRequests: specialRequests || "",
        totalDays: days,
        pricePerDay: car.price_per_day,
        totalPrice,
        status: "active",
        paymentInfo,
        createdAt: new Date().toISOString(),
      };

      rentals.push(rentalData);
      writeRentals(rentals);

      res.status(200).json({
        message: "Car rented successfully",
        rental: {
          ...rentalData,
          car: car,
        },
      });
    }
  } catch (err) {
    console.error("Rental error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserRentals = async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");

    if (process.env.USE_MONGODB === "true" && Rental && User) {
      const user = await User.findOne({ email: currentUserEmail });
      if (!user) return res.status(401).json({ error: "Unauthorized" });

      const rentals = await Rental.find({ userId: user._id }).populate("carId");
      res.status(200).json(rentals);
    } else {
      const rentals = readRentals();
      const userRentals = rentals.filter(
        (r) => r.userEmail === currentUserEmail
      );
      res.status(200).json(userRentals);
    }
  } catch (error) {
    console.error("Get user rentals error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const cancelRental = async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");

    if (process.env.USE_MONGODB === "true" && Rental && User) {
      const user = await User.findOne({ email: currentUserEmail });
      if (!user) return res.status(401).json({ error: "Unauthorized" });

      const rental = await Rental.findById(req.params.id);
      if (!rental) {
        return res.status(404).json({ error: "Rental not found" });
      }

      if (rental.userId.toString() !== user._id.toString()) {
        return res
          .status(403)
          .json({ error: "Not authorized to cancel this rental" });
      }

      rental.status = "cancelled";
      await rental.save();

      res.status(200).json({ message: "Rental cancelled successfully" });
    } else {
      const rentals = readRentals();
      const rentalIndex = rentals.findIndex((r) => r.id == req.params.id);

      if (rentalIndex === -1) {
        return res.status(404).json({ error: "Rental not found" });
      }

      if (rentals[rentalIndex].userEmail !== currentUserEmail) {
        return res
          .status(403)
          .json({ error: "Not authorized to cancel this rental" });
      }

      rentals[rentalIndex].status = "cancelled";
      writeRentals(rentals);

      res.status(200).json({ message: "Rental cancelled successfully" });
    }
  } catch (error) {
    console.error("Cancel rental error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllRentals = async (req, res) => {
  try {
    if (process.env.USE_MONGODB === "true" && Rental) {
      const rentals = await Rental.find().populate("carId").populate("userId");
      res.status(200).json(rentals);
    } else {
      const rentals = readRentals();
      res.status(200).json(rentals);
    }
  } catch (error) {
    console.error("Get all rentals error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateRental = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.body;

    if (process.env.USE_MONGODB === "true" && Rental && Car) {
      const rental = await Rental.findById(req.params.id);
      if (!rental) {
        return res.status(404).json({ error: "Rental not found" });
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const car = await Car.findById(rental.carId);

        rental.startDate = startDate;
        rental.endDate = endDate;
        rental.totalDays = days;
        rental.totalPrice = days * car.price_per_day;
      }

      if (status) {
        rental.status = status;
      }

      await rental.save();
      await rental.populate("carId");

      res.status(200).json(rental);
    } else {
      const rentals = readRentals();
      const rentalIndex = rentals.findIndex((r) => r.id == req.params.id);

      if (rentalIndex === -1) {
        return res.status(404).json({ error: "Rental not found" });
      }

      const rental = rentals[rentalIndex];

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        rental.startDate = startDate;
        rental.endDate = endDate;
        rental.totalDays = days;
        rental.totalPrice = days * rental.pricePerDay;
      }

      if (status) {
        rental.status = status;
      }

      writeRentals(rentals);
      res.status(200).json(rental);
    }
  } catch (error) {
    console.error("Update rental error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addItem,
  listAllItems,
  getItemById,
  updateItem,
  deleteItem,
  checkCarAvailability,
  rentItem,
  getUserRentals,
  cancelRental,
  getAllRentals,
  updateRental,
};
