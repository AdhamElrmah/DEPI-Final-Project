import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function FAQHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="pt-16 text-center bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
          FAQ
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Popular Questions
        </h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about renting a car with ByDrive
        </p>
      </div>
    </motion.section>
  );
}
