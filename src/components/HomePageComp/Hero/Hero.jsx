// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import HeroImage from "../../../assets/HomePage/HeroImages/HeroMainImage.avif";
import { Button } from "@/components/ui/button";
import LogosSlider from "./LogosSlider";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative w-full flex flex-col justify-center text-white h-[calc(100vh-15rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-4.5rem)]"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* محتوى النص */}
      <div className="max-md:flex max-md:flex-col max-md:items-center  relative  px-6 md:px-10 lg:mb-24 mb-20 text-center md:text-left heroContent">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:max-w-3xl max-w-xl "
        >
          The largest luxury cars marketplace
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-base text-[rgba(255,255,255,0.6)] md:text-lg mb-10 font-normal max-w-xl"
        >
          Our team offering you a wide selection of high-end cars for purchase,
          lease, or rent.
        </motion.p>

        <Button
          size="lg"
          className="bg-black text-white cursor-pointer font-bold text-sm "
        >
          <Link to="/cars">Explore all cars</Link>
        </Button>
      </div>
      <LogosSlider />
    </section>
  );
};

export default Hero;
