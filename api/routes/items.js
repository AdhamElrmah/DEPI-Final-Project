/* eslint-env node */
/* global require, module */

const express = require("express");
const {
  addItem,
  listAllItems,
  getItemById,
  rentItem,
  getUserRentals,
  cancelRental,
  getAllRentals,
  updateRental,
  updateItem,
  deleteItem,
  checkCarAvailability,
} = require("../controllers/itemController");

// Define routes
const router = express.Router();

// Add a new item
router.post("/", addItem);

// List all items in the database
router.get("/allItems", listAllItems);

// Get a single item by ID
router.get("/:id", getItemById);

router.put("/:id", updateItem);

// Delete an item by ID
router.delete("/:id", deleteItem);

// Get user rentals
router.get("/rentals/user", getUserRentals);

// Get all rentals (admin only)
router.get("/rentals/all", getAllRentals);

// Cancel a rental
router.delete("/rentals/:id", cancelRental);

// Update rental dates (admin only)
router.put("/rentals/:id", updateRental);

// Rent an item by ID
router.post("/:id/rent", rentItem);

// Check car availability for dates
router.post("/:id/availability", checkCarAvailability);

module.exports = router;
