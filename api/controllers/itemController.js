/* eslint-env node */
/* global require, exports, __dirname */

// In-memory database
// Cars DB file helper — use api/cars.json as the persistent database
const fs = require("fs");
const path = require("path");
const { Buffer } = require("buffer");
const carsPath = path.join(__dirname, "..", "cars.json");

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
 * Search for items based on name or pricePerDay range.
 * This API helps users find items available for rent.
 * @param {Request} req
 * @param {Response} res
 */
exports.searchItems = (req, res) => {
  const { name, minPrice, maxPrice } = req.query;

  const items = readCars();

  // Only return items that are available (if availability property exists), otherwise return all
  let filteredItems = items.filter((item) =>
    typeof item.availability === "boolean" ? item.availability : true
  );

  // Filter items by name (search make + model + overview)
  if (name) {
    const q = name.toLowerCase();
    filteredItems = filteredItems.filter((item) => {
      const title = `${item.make || ""} ${item.model || ""}`.toLowerCase();
      const overview = (item.overview || "").toLowerCase();
      return title.includes(q) || overview.includes(q);
    });
  }

  // Filter by price (cars.json uses price_per_day)
  if (minPrice) {
    filteredItems = filteredItems.filter(
      (item) =>
        (item.price_per_day || item.price_per_day === 0
          ? item.price_per_day
          : Infinity) >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredItems = filteredItems.filter(
      (item) =>
        (item.price_per_day || item.price_per_day === 0
          ? item.price_per_day
          : 0) <= parseFloat(maxPrice)
    );
  }

  res.status(200).json(filteredItems);
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

/**
 * Search for items based on name or pricePerDay range.
 * This API helps users find items available for rent.
 * @param {Request} req
 * @param {Response} res
 */
exports.listAllItems = (req, res) => {
  res.status(200).json(readCars());
};

/**
 * Rent an item for a specific date range.
 * This API allows users to rent an item if it is available and no date conflict exists.
 * @param {Request} req
 * @param {Response} res
 */
exports.rentItem = (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }

  const items = readCars();
  const item = items.find((item) => item.id === id || item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  // ensure rentals array and availability flag exist
  if (!Array.isArray(item.rentals)) item.rentals = [];
  if (typeof item.availability !== "boolean") item.availability = true;

  if (!item.availability) {
    return res.status(400).json({ error: "Item is currently unavailable" });
  }

  // Check for overlapping rental dates
  const isOverlapping = item.rentals.some(
    (rental) => startDate <= rental.endDate && endDate >= rental.startDate
  );

  if (isOverlapping) {
    return res
      .status(400)
      .json({ error: "Item is already rented for the selected dates" });
  }

  // Add the rental and mark the item as unavailable
  item.rentals.push({ startDate, endDate });
  item.availability = false;

  // persist
  if (!writeCars(items)) {
    console.warn("Could not persist rental change to cars.json");
  }

  res.status(200).json({ message: "Item rented successfully", item });
};

/**
 * Return an item and mark it as available again.
 * This API allows users to return an item after use.
 * @param {Request} req
 * @param {Response} res
 */
exports.returnItem = (req, res) => {
  const { id } = req.params;

  const items = readCars();
  const item = items.find((item) => item.id === id || item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (typeof item.availability !== "boolean") item.availability = true;

  if (item.availability) {
    return res.status(400).json({ error: "Item is already available" });
  }

  // Mark the item as available
  item.availability = true;

  // persist
  if (!writeCars(items)) {
    console.warn("Could not persist return change to cars.json");
  }

  res.status(200).json({ message: "Item returned successfully", item });
};

/**
 * View the rental history of an item.
 * This API shows the rental dates for a specific item.
 * @param {Request} req
 * @param {Response} res
 */
exports.viewRentalHistory = (req, res) => {
  const { id } = req.params;

  const items = readCars();
  const item = items.find((item) => item.id === id || item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.status(200).json({ rentals: item.rentals || [] });
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
