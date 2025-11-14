/* eslint-env node */
/* global require, exports, __dirname */

// In-memory database
// Cars DB file helper — use api/cars.json as the persistent database
const fs = require("fs");
const path = require("path");
const { Buffer } = require("buffer");
const carsPath = path.join(__dirname, "..", "cars.json");
const rentalsPath = path.join(__dirname, "..", "rentItem.json");

function readCars() {
  try {
    if (!fs.existsSync(carsPath)) return [];
    const raw = fs.readFileSync(carsPath, "utf8") || "[]";
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read cars.json:", e.message);
    return [];
  }
}

function writeCars(data) {
  try {
    fs.writeFileSync(carsPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("Failed to write cars.json:", e.message);
    return false;
  }
}

function readRentals() {
  try {
    if (!fs.existsSync(rentalsPath)) return [];
    const raw = fs.readFileSync(rentalsPath, "utf8") || "[]";
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read rentItem.json:", e.message);
    return [];
  }
}

function writeRentals(data) {
  try {
    fs.writeFileSync(rentalsPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("Failed to write rentItem.json:", e.message);
    return false;
  }
}
/**
 * Add an item to the database.
 * This API allows users to add a new item available for rent.
 * @param {Request} req
 * @param {Response} res
 */
exports.addItem = (req, res) => {
  // Simple admin check using Authorization header: 'Bearer <token>' where token is base64(email)
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const email = Buffer.from(token, "base64").toString("utf8");
    const usersPath = require("path").join(__dirname, "..", "users.json");
    let users = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }

    const requestingUser = users.find((u) => u.email === email);
    if (!requestingUser || requestingUser.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: admin only" });
    }

    const newCar = req.body;
    if (!newCar || !newCar.id) {
      return res.status(400).json({ error: "Missing car data or id" });
    }

    // read current cars from file
    const items = readCars();

    // Basic duplicate check
    const exists = items.find((i) => i.id === newCar.id);
    if (exists) {
      return res
        .status(409)
        .json({ error: "Item with this id already exists" });
    }

    items.push(newCar);

    // write back to cars.json
    if (!writeCars(items)) {
      console.warn("Could not persist new car to cars.json");
    }

    res.status(201).json(newCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get a single item by ID.
 * Returns the item if found, otherwise 404.
 * @param {Request} req
 * @param {Response} res
 */
exports.getItemById = (req, res) => {
  const { id } = req.params;

  const items = readCars();
  // Support both string IDs (e.g. "2023-mercedes-benz-c300") and numeric IDs
  const item = items.find((item) => item.id === id || item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.status(200).json(item);
};

exports.listAllItems = (req, res) => {
  res.status(200).json(readCars());
};

/**
 * Update an existing item by id.
 * Replaces/merges fields from the request body into the existing car and persists.
 */
exports.updateItem = (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const items = readCars();
    const idx = items.findIndex((it) => it.id === id || it.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ error: "Item not found" });

    // If the client attempts to change the id, ensure no duplicate
    if (updatedFields.id && updatedFields.id !== items[idx].id) {
      const dup = items.find((it) => it.id === updatedFields.id);
      if (dup)
        return res
          .status(409)
          .json({ error: "Another item with this id already exists" });
    }

    // Merge properties (shallow merge). For deep merges, frontend should send the full nested object.
    items[idx] = { ...items[idx], ...updatedFields };

    if (!writeCars(items)) {
      console.warn("Could not persist update to cars.json");
    }

    return res.status(200).json(items[idx]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Delete an item from the database.
 * This API allows users to remove an item from the list permanently.
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  const items = readCars();
  const itemIndex = items.findIndex(
    (item) => item.id === id || item.id === parseInt(id)
  );

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items.splice(itemIndex, 1); // Remove the item from the database
  if (!writeCars(items)) {
    console.warn("Could not persist delete to cars.json");
  }
  res.status(200).json({ message: "Item deleted successfully" });
};

/**
 * Rent an item for a specific date range.
 * This API allows users to rent an item if it is available and no date conflict exists.
 * @param {Request} req
 * @param {Response} res
 */
exports.rentItem = (req, res) => {
  try {
    // Get current user from token
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    const usersPath = path.join(__dirname, "..", "users.json");
    let users = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }
    const currentUser = users.find((u) => u.email === currentUserEmail);
    if (!currentUser) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const {
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      specialRequests,
    } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required" });
    }

    const items = readCars();
    const item = items.find(
      (item) => item.id === id || item.id === parseInt(id)
    );

    if (!item) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Calculate rental duration and total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * item.price_per_day;

    // Check for overlapping rental dates
    const rentals = readRentals();
    const isOverlapping = rentals.some(
      (rental) =>
        rental.carId === item.id &&
        rental.status === "active" &&
        startDate <= rental.endDate &&
        endDate >= rental.startDate
    );

    if (isOverlapping) {
      return res
        .status(400)
        .json({ error: "Car is already rented for the selected dates" });
    }

    // Create rental record
    const rentalId = Date.now().toString();
    const rentalData = {
      id: rentalId,
      carId: item.id,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      startDate,
      endDate,
      pickupLocation: pickupLocation || "Default Location",
      dropoffLocation: dropoffLocation || "Default Location",
      specialRequests: specialRequests || "",
      totalDays: days,
      pricePerDay: item.price_per_day,
      totalPrice,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    rentals.push(rentalData);

    // Save rental data
    if (!writeRentals(rentals)) {
      console.warn("Could not persist rental to rentItem.json");
      return res.status(500).json({ error: "Failed to save rental" });
    }

    res.status(200).json({
      message: "Car rented successfully",
      rental: rentalData,
      car: item,
    });
  } catch (err) {
    console.error("Rental error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Check car availability for given dates
exports.checkCarAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required" });
    }

    const items = readCars();
    const item = items.find(
      (item) => item.id === id || item.id === parseInt(id)
    );

    if (!item) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Check for overlapping rental dates
    const rentals = readRentals();
    const isOverlapping = rentals.some(
      (rental) =>
        rental.carId === item.id &&
        rental.status === "active" &&
        startDate <= rental.endDate &&
        endDate >= rental.startDate
    );

    res.status(200).json({
      available: !isOverlapping,
      car: {
        id: item.id,
        make: item.make,
        model: item.model,
        year: item.year,
      },
    });
  } catch (err) {
    console.error("Availability check error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserRentals = (req, res) => {
  try {
    // Get current user from token
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    const usersPath = path.join(__dirname, "..", "users.json");
    let users = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }
    const currentUser = users.find((u) => u.email === currentUserEmail);
    if (!currentUser) return res.status(401).json({ error: "Unauthorized" });

    const rentals = readRentals();
    const userRentals = rentals.filter(
      (rental) => rental.userId === currentUser.id
    );

    // Get car details for each rental
    const cars = readCars();
    const rentalsWithCarDetails = userRentals.map((rental) => {
      const car = cars.find((c) => c.id === rental.carId);
      return {
        ...rental,
        car: car
          ? {
              id: car.id,
              make: car.make,
              model: car.model,
              year: car.year,
              images: car.images,
              price_per_day: car.price_per_day,
            }
          : null,
      };
    });

    res.status(200).json(rentalsWithCarDetails);
  } catch (err) {
    console.error("Get user rentals error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.cancelRental = (req, res) => {
  try {
    const { id } = req.params;

    // Get current user from token
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    const usersPath = path.join(__dirname, "..", "users.json");
    let users = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }
    const currentUser = users.find((u) => u.email === currentUserEmail);
    if (!currentUser) return res.status(401).json({ error: "Unauthorized" });

    const rentals = readRentals();
    const rentalIndex = rentals.findIndex((r) => r.id === id);

    if (rentalIndex === -1) {
      return res.status(404).json({ error: "Rental not found" });
    }

    // Check permissions: user can cancel their own rentals, admin can cancel any
    const rental = rentals[rentalIndex];
    const isOwner = rental.userId === currentUser.id;
    const isAdmin = currentUser.role === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ error: "You can only cancel your own rentals" });
    }

    // Check if rental can be cancelled (not in the past)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(rental.startDate);

    if (startDate < today && !isAdmin) {
      return res.status(400).json({ error: "Cannot cancel past rentals" });
    }

    // Update rental status
    rentals[rentalIndex].status = "cancelled";
    rentals[rentalIndex].cancelledAt = new Date().toISOString();

    if (!writeRentals(rentals)) {
      console.warn("Could not persist rental cancellation to rentItem.json");
      return res.status(500).json({ error: "Failed to cancel rental" });
    }

    res.status(200).json({
      message: "Rental cancelled successfully",
      rental: rentals[rentalIndex],
    });
  } catch (err) {
    console.error("Cancel rental error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllRentals = (req, res) => {
  try {
    // Admin only
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    const usersPath = path.join(__dirname, "..", "users.json");
    let users = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }
    const currentUser = users.find((u) => u.email === currentUserEmail);
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const rentals = readRentals();
    const cars = readCars();

    // Add car details to each rental
    const rentalsWithDetails = rentals.map((rental) => {
      const car = cars.find((c) => c.id === rental.carId);
      const user = users.find((u) => u.id === rental.userId);

      return {
        ...rental,
        car: car
          ? {
              id: car.id,
              make: car.make,
              model: car.model,
              year: car.year,
              images: car.images,
              price_per_day: car.price_per_day,
            }
          : null,
        user: user
          ? {
              id: user.id,
              name: user.name,
              email: user.email,
            }
          : null,
      };
    });

    res.status(200).json(rentalsWithDetails);
  } catch (err) {
    console.error("Get all rentals error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateRental = (req, res) => {
  try {
    // Admin only
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const currentUserEmail = Buffer.from(token, "base64").toString("utf8");
    const usersPath = path.join(__dirname, "..", "users.json");
    let users = [];
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
    }
    const currentUser = users.find((u) => u.email === currentUserEmail);
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const { id } = req.params;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required" });
    }

    const rentals = readRentals();
    const rentalIndex = rentals.findIndex((r) => r.id === id);

    if (rentalIndex === -1) {
      return res.status(404).json({ error: "Rental not found" });
    }

    const rental = rentals[rentalIndex];

    // Check for overlapping dates with other rentals of the same car
    const isOverlapping = rentals.some(
      (r) =>
        r.id !== rental.id &&
        r.carId === rental.carId &&
        r.status === "active" &&
        startDate <= r.endDate &&
        endDate >= r.startDate
    );

    if (isOverlapping) {
      return res
        .status(400)
        .json({ error: "Car is already rented for the selected dates" });
    }

    // Update rental dates
    rentals[rentalIndex].startDate = startDate;
    rentals[rentalIndex].endDate = endDate;

    // Recalculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    rentals[rentalIndex].totalDays = days;
    rentals[rentalIndex].totalPrice = days * rental.pricePerDay;

    if (!writeRentals(rentals)) {
      console.warn("Could not persist rental update to rentItem.json");
      return res.status(500).json({ error: "Failed to update rental" });
    }

    res.status(200).json({
      message: "Rental updated successfully",
      rental: rentals[rentalIndex],
    });
  } catch (err) {
    console.error("Update rental error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
