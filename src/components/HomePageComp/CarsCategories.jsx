// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
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
    { image: Image4, name: "Luxury Cars", number: 24 },
    { image: Image3, name: "SUVs", number: 9 },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="py-12 px-6 md:py-21 md:px-8 max-w-[1500px] mx-auto"
    >
      <h2 className="text-3xl font-extrabold max-sm:text-xl max-md:text-2xl mb-4  text-black text-center md:text-left ">
        Check out car categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categories.map((category, i) => (
          <div
            key={i}
            className="rounded-xl hover:shadow-lg transition-shadow duration-500 overflow-hidden group bg-transparent"
          >
            <Link to="cars" className="block">
              <div className="xl:p-6 flex flex-row xl:flex-col  items-center gap-6 md:gap-0">
                <div className="w-45 h-32  lg:h-44 flex-shrink-0  flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-40 h-30 object-contain"
                  />
                </div>

                <div className="flex-1 md:w-full flex flex-col items-start md:items-center">
                  <h3 className="text-lg font-extrabold mb-3 md:mb-4 text-nowrap text-black text-left md:text-center">
                    {category.name}
                  </h3>

                  <span className="inline-block px-5 py-2 opacity-[0.8] rounded-full text-xs font-bold bg-gray-100 text-gray-800 group-hover:bg-black group-hover:text-white transition-all duration-300 text-nowrap">
                    {category.number} Cars
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default CarCategories;
