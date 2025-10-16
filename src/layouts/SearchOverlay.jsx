import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SearchOverlay({ allCars, setSearchOpen }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);
  setSearchOpen(open);
  const navigate = useNavigate();

  const filteredCar =
    query === ""
      ? []
      : allCars.filter((car) => {
          return (car.make + " " + car.model)
            .split("-")
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <Transition show={open} afterLeave={() => setQuery("")} appear>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80  transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(car) => {
                  navigate(`/cars/${car.id}`);
                  setOpen(false);
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <ComboboxInput
                    autoFocus
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm z-50"
                    placeholder="Type car brand or model"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery("")}
                  />
                </div>

                {filteredCar.length > 0 && (
                  <ComboboxOptions
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {filteredCar.map((car) => (
                      <ComboboxOption
                        key={car.id}
                        value={car}
                        className={({ focus }) =>
                          classNames(
                            "cursor-default select-none px-4 py-2",
                            focus && "bg-indigo-600 text-white"
                          )
                        }
                      >
                        {car.make} {car.model}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}

                {query !== "" && filteredCar.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No people found.</p>
                )}
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
export default SearchOverlay;
