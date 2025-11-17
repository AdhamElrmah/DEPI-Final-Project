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

const router = express.Router();

// Public routes
router.get("/allItems", listAllItems);
router.get("/:id", getItemById);
router.post("/:id/availability", checkCarAvailability);

// Protected routes (require authentication)
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.post("/:id/rent", rentItem);
router.get("/rentals/user", getUserRentals);
router.delete("/rentals/:id", cancelRental);

// Admin routes (require admin authentication)
router.get("/rentals/all", getAllRentals);
router.put("/rentals/:id", updateRental);

module.exports = router;
