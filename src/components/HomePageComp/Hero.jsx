import { motion } from "framer-motion";
import React from "react";
import lamp from "../../assets/HomePage/HeroImages/HeroMainImage.avif";
import test from "../../assets/HomePage/HeroImages/SliderIcon1.svg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen flex flex-col justify-center text-white"
      style={{
        backgroundImage: `url(${lamp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* محتوى النص */}
      <div className="relative z-10 px-6 md:px-16 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
        >
          The largest luxury cars marketplace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-gray-300 text-base md:text-lg mb-6"
        >
          Our team offering you a wide selection of high-end cars for purchase,
          lease, or rent.
        </motion.p>

        <Button size="lg">Explore all cars</Button>
      </div>

      {/* Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-0 right-0 flex flex-wrap justify-center gap-6 md:gap-10 px-6"
      >
        {[
          "maserati.svg",
          "bugatti.svg",
          "porsche.svg",
          "bmw.svg",
          "ferrari.svg",
          "lexus.svg",
          "rolls.svg",
          "landrover.svg",
        ].map((logo, i) => (
          <img
            key={i}
            src={`${test}`}
            alt={logo}
            className="w-10 md:w-14 opacity-80 hover:opacity-100 transition"
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
