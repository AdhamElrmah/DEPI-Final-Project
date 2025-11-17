const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Car = require("../models/Car");
const Rental = require("../models/Rental");

const seedDatabase = async () => {
  try {
    console.log("🌱 Checking if database needs seeding...");

    // Check if data already exists
    const userCount = await User.countDocuments();
    const carCount = await Car.countDocuments();

    if (userCount > 0 || carCount > 0) {
      console.log("✅ Database already has data, skipping seed");
      return;
    }

    console.log("🚀 Seeding database with initial data...");

    // Seed users
    const usersPath = path.join(__dirname, "..", "users.json");
    if (fs.existsSync(usersPath)) {
      const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
      for (const user of users) {
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            // Keep the old id field for backward compatibility
            const userData = {
              id: user.id, // Preserve old ID
              name: user.name,
              email: user.email,
              passwordHash: user.passwordHash,
              role: user.role,
            };
            await User.create(userData);
          }
        } catch (error) {
          console.error("Error seeding user:", user.email, error.message);
        }
      }
      console.log(`👥 Seeded ${users.length} users`);
    }

    // Seed cars
    const carsPath = path.join(__dirname, "..", "cars.json");
    if (fs.existsSync(carsPath)) {
      const cars = JSON.parse(fs.readFileSync(carsPath, "utf8"));
      for (const car of cars) {
        try {
          // Check if car already exists by make/model/year
          const existingCar = await Car.findOne({
            make: car.make,
            model: car.model,
            year: car.year,
          });
          if (!existingCar) {
            const { id, ...carData } = car; // Remove old id field
            await Car.create(carData);
          }
        } catch (error) {
          console.error(
            "Error seeding car:",
            car.make,
            car.model,
            error.message
          );
        }
      }
      console.log(`🚗 Seeded ${cars.length} cars`);
    }

    // Seed rentals (optional - usually rentals are created by users)
    const rentalsPath = path.join(__dirname, "..", "rentItem.json");
    if (fs.existsSync(rentalsPath)) {
      const rentals = JSON.parse(fs.readFileSync(rentalsPath, "utf8"));
      let seededRentals = 0;

      for (const rental of rentals) {
        try {
          // Find corresponding car and user
          const car = await Car.findOne({ id: rental.carId });
          const user = await User.findOne({ email: rental.userEmail });

          if (car && user) {
            const existingRental = await Rental.findOne({
              carId: car._id,
              userId: user._id,
              startDate: rental.startDate,
              endDate: rental.endDate,
            });

            if (!existingRental) {
              await Rental.create({
                carId: car._id,
                userId: user._id,
                userEmail: rental.userEmail,
                userName: rental.userName,
                startDate: rental.startDate,
                endDate: rental.endDate,
                pickupLocation: rental.pickupLocation || "Default Location",
                dropoffLocation: rental.dropoffLocation || "Default Location",
                specialRequests: rental.specialRequests || "",
                totalDays: rental.totalDays,
                pricePerDay: rental.pricePerDay || car.price_per_day,
                totalPrice: rental.totalPrice,
                status: rental.status || "active",
                paymentInfo: rental.paymentInfo || {},
              });
              seededRentals++;
            }
          }
        } catch (error) {
          console.error("Error seeding rental:", error.message);
        }
      }
      console.log(`📅 Seeded ${seededRentals} rentals`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  }
};

module.exports = seedDatabase;
