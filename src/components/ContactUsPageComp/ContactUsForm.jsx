import React from "react";
import { Label } from "@headlessui/react";
import { Input } from "@headlessui/react";
import { Button } from "@headlessui/react";

function ContactUsForm() {
  return (
    <div className="pb-10 pt-4 max-w-[1500px] mx-auto">
      <h2 className="px-8 text-[25px] font-extrabold text-gray-900 mb-8 xl:ml-80 l:ml-150 md:ml-4 wrap-anywhere">
        Send your message
      </h2>

      <div className="max-w-193 mx-auto p-8">
        <form className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm text-[#728189]">
              Full name
            </label>
            <Input
              required
              id="name"
              placeholder="Enter your name"
              className=" font-bold h-14 rounded-md border border-gray-300 bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189] focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className=" flex flex-col space-y-2">
            <label htmlFor="phone" className="text-sm text-[#728189]">
              Phone number
            </label>
            <Input
              required
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="font-bold h-14 rounded-md border-0 bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm text-[#728189]">
              Email address
            </label>
            <Input
              required
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="font-bold h-14 rounded-md border-0 bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="message" className="text-sm text-[#728189]">
              Message
            </label>
            <textarea
              required
              id="message"
              placeholder="Tell us more"
              rows="4"
              className="font-bold w-full resize-y rounded-md border-0 bg-[#f2f2f2] px-4 py-3 text-gray-800 placeholder:font-semibold placeholder:text-[#728189] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-black text-white font-semibold text-md rounded-md cursor-pointer hover:bg-[#262626] transition-all duration-300 ease-in-out"
          >
            Send Your Request
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsForm;
