import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories1.avif";
import Image2 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories2.avif";
import Image3 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories3.avif";
import Image4 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories4.avif";

function CarCategories() {
  const categories = [
    { image: Image1, name: "Exotic Cars", number: 8 },
    { image: Image2, name: "Sport Cars", number: 16 },
    { image: Image3, name: "SUV", number: 9 },
    { image: Image4, name: "Luxury Cars", number: 24 },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black">
        Check out car categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categories.map((category, i) => (
          <div
            key={i}
            className="rounded-xl hover:shadow-xl transition-shadow duration-500 overflow-hidden group bg-transparent"
          >
            <Link to="cars" className="block">
              <div className="p-6 flex flex-row lg:flex-col items-center gap-6 md:gap-0">
                <div className="w-45 h-32 lg:w-full lg:h-44 flex-shrink-0 md:mb-6 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-60 h-50 object-contain"
                  />
                </div>

                <div className="flex-1 md:w-full flex flex-col items-start md:items-center">
                  <h3 className="text-2xl font-bold mb-3 md:mb-4 text-black text-left md:text-center">
                    {category.name}
                  </h3>

                  <span className="inline-block px-5 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    {category.number} Cars
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarCategories;
