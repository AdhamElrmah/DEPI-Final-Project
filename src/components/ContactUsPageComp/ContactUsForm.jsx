import React, { Fragment, useState } from "react";
import { Label } from "../UI/label";
import { Input } from "../UI/input";
import { Button } from "../UI/button";
import { Textarea } from "../UI/textarea";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ContactUsForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="pb-10 pt-4 max-w-[1500px] mx-auto">
      <h2 className="px-8 text-[25px] font-extrabold text-gray-900 mb-8 xl:ml-80 l:ml-150 md:ml-4 wrap-anywhere">
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
              id="name"
              placeholder="Enter your name"
              className=" font-bold h-14 rounded-md border border-gray-300 bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189] focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div className=" flex flex-col space-y-2">
            <Label htmlFor="phone" className="text-sm text-[#728189]">
              Phone number
            </Label>
            <Input
              required
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="font-bold h-14 rounded-md border-0 bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-sm text-[#728189]">
              Email address
            </Label>
            <Input
              required
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="font-bold h-14 rounded-md border-0 bg-[#f2f2f2] px-4 text-gray-800 placeholder:font-semibold placeholder:text-[#728189]"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="message" className="text-sm text-[#728189]">
              Message
            </Label>
            <Textarea
              required
              id="message"
              placeholder="Tell us more"
              rows={4}
              className="m-h-[150px] font-bold w-full resize-y rounded-md border-0 bg-[#f2f2f2] px-4 py-3 text-gray-800 placeholder:font-semibold placeholder:text-[#728189] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
      {/* Success dialog shown after submit */}
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpen(false);
            navigate("/");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Message sent
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Thank you — your message has been sent successfully.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => {
                        setOpen(false);
                        navigate("/");
                      }}
                    >
                      Go to home
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ContactUsForm;
