// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React, { useState } from "react";
import { Label } from "../UI/label";
import { Input } from "../UI/input";
import { Button } from "../UI/button";
import { Textarea } from "../UI/textarea";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../UI/SuccessDialog";

function ContactUsForm() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const message = formData.get("message");

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!egyptianPhoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid Egyptian phone number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setOpen(true);
  };

  const handleDialogClose = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="pb-10 pt-4 max-w-[1500px] mx-auto"
    >
      <h2 className="px-8 text-[25px] font-extrabold text-gray-900  xl:ml-80 l:ml-150 md:ml-4 wrap-anywhere">
        Send your message
      </h2>

      <div className="max-w-193 mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className="text-sm ">
              Full name
            </Label>
            <Input
              required
              name="name"
              placeholder="Enter your name"
              className={`font-bold h-14 rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189] focus:border-black focus:ring-1 focus:ring-black`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className=" flex flex-col space-y-2">
            <Label htmlFor="phone" className="text-sm text-[#728189]">
              Phone number
            </Label>
            <Input
              required
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              className={`font-bold h-14 rounded-md border ${
                errors.phone ? "border-red-500" : "border-0"
              } bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189]`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-sm text-[#728189]">
              Email address
            </Label>
            <Input
              required
              name="email"
              type="email"
              placeholder="Enter your email address"
              className={`font-bold h-14 rounded-md border ${
                errors.email ? "border-red-500" : "border-0"
              } bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="message" className="text-sm text-[#728189]">
              Message
            </Label>
            <Textarea
              required
              name="message"
              placeholder="Tell us more"
              rows={4}
              className={`m-h-[150px] font-bold w-full resize-y rounded-md border ${
                errors.message ? "border-red-500" : "border-0"
              } bg-[#f2f2f2] px-4 py-3 text-gray-800 placeholder:font-semibold placeholder:text-[#728189] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-black text-white font-semibold text-md rounded-md cursor-pointer hover:bg-[#262626] transition-all duration-300 ease-in-out"
          >
            Send Your Request
          </Button>
        </form>
      </div>

      {/* Success dialog */}
      <SuccessDialog
        open={open}
        setOpen={setOpen}
        title="Message sent"
        message="Thank you — your message has been sent successfully."
        buttonText="Go to home"
        onButtonClick={handleDialogClose}
      />
    </motion.div>
  );
}

export default ContactUsForm;
