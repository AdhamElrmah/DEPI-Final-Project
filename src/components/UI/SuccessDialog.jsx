import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function SuccessDialog({
  open,
  setOpen,
  title = "Success",
  message = "Operation completed successfully.",
  buttonText = "Continue",
  onButtonClick,
  onClose,
}) {
  const handleClose = () => {
    if (onButtonClick) {
      onButtonClick();
    }

    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={handleButtonClick}
              >
                {buttonText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
