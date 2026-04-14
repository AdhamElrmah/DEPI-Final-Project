const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Car = require("../models/Car");
const Rental = require("../models/Rental");
const Review = require("../models/Review");

const seedUsers = async () => {
  const usersPath = path.join(__dirname, "..", "users.json");
  if (fs.existsSync(usersPath)) {
    const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    let seededUsers = 0;

    for (const user of users) {
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Parse name into firstName and lastName
          const nameParts = (user.name || "").trim().split(" ");
          const firstName = user.firstName || nameParts[0] || "User";
          const lastName =
            user.lastName || nameParts.slice(1).join(" ") || "Account";
          const username =
            user.username ||
            (user.name
              ? user.name.replace(/\s+/g, "").toLowerCase()
              : user.email.split("@")[0]);

          const userData = {
            id: user.id, // Preserve old ID
            firstName,
            lastName,
            username,
            name: user.name, // Keep for backward compatibility
            email: user.email,
            phoneNumber: user.phoneNumber,
            passwordHash: user.passwordHash,
            role: user.role,
          };
          await User.create(userData);
          seededUsers++;
        }
      } catch (error) {
        console.error("Error seeding user:", user.email, error.message);
      }
    }

    // Generate additional users if we have less than 20
    const currentUserCount = await User.countDocuments();
    if (currentUserCount < 20) {
      const additionalUsersNeeded = 20 - currentUserCount;
      console.log(`👥 Generating ${additionalUsersNeeded} additional users...`);

      const firstNames = [
        "John",
        "Jane",
        "Mike",
        "Sarah",
        "David",
        "Emma",
        "Chris",
        "Lisa",
        "Tom",
        "Anna",
      ];
      const lastNames = [
        "Smith",
        "Johnson",
        "Brown",
        "Williams",
        "Jones",
        "Garcia",
        "Miller",
        "Davis",
        "Rodriguez",
        "Martinez",
      ];

      for (let i = 0; i < additionalUsersNeeded; i++) {
        try {
          const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName =
            lastNames[Math.floor(Math.random() * lastNames.length)];
          const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`;
          const email = `${username}@example.com`;

          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            const userData = {
              firstName,
              lastName,
              username,
              name: `${firstName} ${lastName}`,
              email,
              passwordHash:
                "$2a$10$BxZKuxSSkRXGUmJk2t2IrOhAgHdKRBYwfA7vElT24L2JFIXWyQZDy", // Same as test user
              role: "user",
            };
            await User.create(userData);
            seededUsers++;
          }
        } catch (error) {
          console.error("Error generating user:", error.message);
        }
      }
    }

    console.log(`👥 Total users in database: ${await User.countDocuments()}`);
    return seededUsers;
  }
  return 0;
};

const seedReviews = async () => {
  const reviewComments = [
    "Amazing car! Had a great experience.",
    "Very comfortable and well-maintained.",
    "Excellent service, highly recommend!",
    "Good car, but could be cleaner.",
    "Perfect for my trip, will rent again.",
    "The car exceeded my expectations!",
    "Nice ride, smooth and reliable.",
    "Great value for money.",
    "Had some minor issues but overall good.",
    "Absolutely loved this car!",
    "Smooth driving experience.",
    "The car was in excellent condition.",
    "Would definitely recommend to friends.",
    "A bit pricey but worth it.",
    "Fantastic car for a road trip!",
    "Very spacious and comfortable.",
    "Clean and modern vehicle.",
    "Had a wonderful experience.",
    "The car performed brilliantly.",
    "Great customer service too!",
  ];

  const allCars = await Car.find();
  const allUsers = await User.find({ role: "user" }).limit(20);

  if (allCars.length > 0 && allUsers.length > 0) {
    let seededReviews = 0;

    for (const car of allCars) {
      // Create 3-5 reviews per car
      const numReviews = Math.floor(Math.random() * 3) + 3; // 3-5 reviews

      for (let i = 0; i < numReviews && i < allUsers.length; i++) {
        try {
          const user = allUsers[i];
          const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars (good reviews only)
          const comment =
            reviewComments[Math.floor(Math.random() * reviewComments.length)];

          // Random date within the last 6 months
          const daysAgo = Math.floor(Math.random() * 180);
          const createdAt = new Date();
          createdAt.setDate(createdAt.getDate() - daysAgo);

          const existingReview = await Review.findOne({
            carId: car.id,
            userId: user._id,
          });

          if (!existingReview) {
            await Review.create({
              carId: car.id, // Use car.id instead of car._id for compatibility
              userId: user._id,
              rentalId: `seed-rental-${car.id}-${user._id}-${i}`, // Dummy rental ID for seeded reviews
              username: user.username,
              rating,
              comment,
              createdAt,
            });
            seededReviews++;
          }
        } catch (error) {
          console.error("Error seeding review:", error.message);
        }
      }
    }

    console.log(`⭐ Seeded ${seededReviews} reviews`);
  } else {
    console.log("⚠️  No cars or users found to seed reviews");
  }
};

const seedDatabase = async () => {
  try {
    console.log("🌱 Checking database status...");

    // Check if data already exists
    const userCount = await User.countDocuments();
    const carCount = await Car.countDocuments();
    const reviewCount = await Review.countDocuments();

    console.log(
      `📊 Found: ${userCount} users, ${carCount} cars, ${reviewCount} reviews`,
    );

    // Always seed users first to ensure we have enough for reviews
    if (userCount < 20) {
      console.log("👥 Seeding users...");
      await seedUsers();
    }

    // Always seed reviews if cars exist
    if (carCount > 0) {
      console.log("⭐ Seeding reviews for existing cars...");
      await seedReviews();
      return;
    }

    console.log("🚀 Seeding database with initial data...");

    // Seed cars
    const carsPath = path.join(__dirname, "..", "cars_updated.json");
    if (fs.existsSync(carsPath)) {
      const cars = JSON.parse(fs.readFileSync(carsPath, "utf8"));
      for (const car of cars) {
        try {
          // Check if car already exists by id
          const existingCar = await Car.findOne({ id: car.id });
          if (!existingCar) {
            // Keep the id field as it's required
            await Car.create(car);
          }
        } catch (error) {
          console.error(
            "Error seeding car:",
            car.make,
            car.model,
            error.message,
          );
        }
      }
      console.log(`🚗 Seeded ${cars.length} cars`);
    }

    // Seed reviews for newly seeded cars
    await seedReviews();

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
  }
};

module.exports = seedDatabase;
