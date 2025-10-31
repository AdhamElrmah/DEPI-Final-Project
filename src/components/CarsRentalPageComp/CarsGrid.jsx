import React, { useState } from "react";
import CarCard from "../../layouts/CarCard";
import CarCategoriesTabs from "@/components/CarsRentalPageComp/CarCategoriesTabs";

function CarsGrid({ allCars }) {
  const [selectedCategory, setSelectedCategory] = useState("Economy Cars");
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  const selectedCar = selectedCategory.split(" ")[0];

  // Filter cars by selected category
  const filteredCars = allCars.filter(
    (car) => car.rental_class === selectedCar
  );

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  // Reset to first page when category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <CarCategoriesTabs onSelect={setSelectedCategory} />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-9 pb-8 max-w-[1280px] mx-auto">
        {currentCars.map((car) => (
          <CarCard car={car} key={car.id} selectedCategory={selectedCategory} />
        ))}
      </ul>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pb-12 px-9 max-w-[1280px] mx-auto">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-black hover:text-white transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:bg-white disabled:hover:text-gray-700"
          >
            Previous
          </button>

          <span className="mx-4 text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-black hover:text-white transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:bg-white disabled:hover:text-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CarsGrid;
