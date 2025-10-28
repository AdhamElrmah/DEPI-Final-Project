// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../UI/button";
import CarCard from "@/layouts/CarCard";

export default function ExploreCars({ allCars }) {
  const exploreCars = allCars.slice(26, 32);

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="py-12 px-6 md:pb-21 md:px-8 max-w-[1500px] mx-auto flex flex-col gap-8 md:gap-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between  mx-5 max-md:flex-col max-md:gap-3">
        <h2 className="text-3xl font-extrabold max-sm:text-xl max-md:text-2xl">
          Explore our fleet
        </h2>
        <Button
          size="lg"
          className=" text-sm font-bold py-2.5 px-5 rounded-lg hover:opacity-80 transition"
        >
          <Link to="/cars">See All Cars</Link>
        </Button>
      </div>

      {/* Cars Grid */}
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {exploreCars.map((car) => (
          <CarCard car={car} key={car.id} />
        ))}
      </div>
    </motion.section>
  );
}
