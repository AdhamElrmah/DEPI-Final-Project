// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { getAllCars } from "../../lib/getData";
import CarCard from "../../layouts/CarCard";
import { generateRandomNumber } from "../../utils/generateNumber";

function ExploreSimilarCars({ currentCar }) {
  const [similarCars, setSimilarCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarCars = async () => {
      try {
        setLoading(true);
        // Get all cars
        const allCars = await getAllCars();

        const randomNum = generateRandomNumber(0, 5);

        // Filter cars by same rental class, excluding current car
        const filteredCars = allCars
          .filter(
            (car) =>
              car.rental_class === currentCar.rental_class &&
              car.id !== currentCar.id
          )
          .slice(randomNum, randomNum + 3); // Get only first 3 cars
        setSimilarCars(filteredCars);
      } catch (error) {
        console.error("Failed to fetch similar cars:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentCar) {
      fetchSimilarCars();
    }
  }, [currentCar]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (similarCars.length === 0) {
    return null; // Don't show section if no similar cars found
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="pt-12 px-6 md:pt-16 md:px-8 bg-[#f2f2f2]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 ">
        {/* Section Header */}
        <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 text-center">
          Explore Similar Cars
        </h2>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
          {similarCars.map((car, i) => (
            <div key={car.id} className={`${i === 1 ? "max-xl:hidden" : " "}`}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default ExploreSimilarCars;
