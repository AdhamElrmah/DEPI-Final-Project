/* eslint-env node */
/* global require, module */

const express = require("express");
const {
  addItem,
  searchItems,
  listAllItems,
  getItemById,
  rentItem,
  returnItem,
  viewRentalHistory,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// Define routes
const router = express.Router();

// Add a new item
router.post("/", addItem);

// Search for items by name or price range
router.get("/", searchItems);

// List all items in the database
router.get("/allItems", listAllItems);

// Get a single item by ID
router.get("/:id", getItemById);

// View rental history of a specific item by ID
router.get("/:id/rentals", viewRentalHistory);

// Rent an item by ID
router.post("/:id/rent", rentItem);

// Return a rented item by ID
router.post("/:id/return", returnItem);

router.put("/:id", updateItem);
// Delete an item by ID
router.delete("/:id", deleteItem);

module.exports = router;
