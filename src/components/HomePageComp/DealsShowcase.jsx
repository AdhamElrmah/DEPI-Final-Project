// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import Image1 from "../../assets/HomePage/DealsShowcaseImages/DealsShowcase1.avif";
import Image2 from "../../assets/HomePage/DealsShowcaseImages/DealsShowcase2.avif";

function DealsShowcase() {
  const deals = [
    {
      image: Image1,
      title: "Feel the best experience with rental deals",
      description:
        "The 2023 Volkswagen Jetta is an affordable European sedan that offers a spacious interior, unique styling, and engaging driving manners. It comes equipped with an efficient.",
    },
    {
      image: Image2,
      title: "Deal ratings on all listings near you",
      description:
        "Standard features include Volkswagen’s Digital Cockpit, Apple CarPlay/Android Auto, forward collision warning with automatic emergency braking, blind-spot monitoring.",
    },
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
      className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 md:px-8 py-12 max-w-[1500px] mx-auto"
    >
      {deals.map((deal, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-2xl group shadow-lg max-sm:h-[340px] max-md:h-[448px] md:h-[556px] max-w-4xl"
        >
          <img
            src={deal.image}
            alt={deal.title}
            className={` ${
              deal.image === Image1 ? "object-bottom" : " "
            } w-full h-full  object-cover transition-transform duration-700 group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Overlay box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`${
              deal.image === Image1 ? "top-6" : "bottom-6 "
            } absolute  left-1/2 -translate-x-1/2 bg-slate-700/80 text-white backdrop-blur-sm p-7 rounded-lg w-[90%] text-center`}
          >
            <h3 className="text-xl max-md:text-sm  font-extrabold mb-2">
              {deal.title}
            </h3>
            <p className="text-xs font-normal text-gray-200 leading-relaxed">
              {deal.description}
            </p>
          </motion.div>
        </div>
      ))}
    </motion.section>
  );
}

export default DealsShowcase;
