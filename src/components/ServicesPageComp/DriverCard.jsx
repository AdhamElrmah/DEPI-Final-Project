import React from "react";
import { motion } from "framer-motion";
const DriverCard = ({ name, carModel, image }) => {
  return (
    <>
      <motion.div
        className="flex flex-col group cursor-pointer relative mb-12"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="overflow-hidden rounded-xl mb-4">
          <motion.img
            src={image}
            alt="car image"
            className="w-full h-100 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bottom-4  bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-xl" />
        </div>

        <div className="absolute bottom-8 left-6 text-white">
          <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
          <p className="text-lg text-white opacity-90">drives {carModel}</p>
        </div>
      </motion.div>
    </>
  );
};

export default DriverCard;
