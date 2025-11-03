// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React from "react";

function ContactUsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="md:text-6xl xl:text-6xl text-[35px] font-extrabold text-gray-900 text-center mt-20 max-w-[1500px] mx-auto">
        Contact Us
      </h1>
      <p className="text-center mt-3 mb-20 mx-10">
        Our customer services team is always happy to answer any questions
      </p>
    </motion.div>
  );
}

export default ContactUsHeader;
