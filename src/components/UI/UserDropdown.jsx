import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function UserDropdown({
  avatar,
  name,
  email,
  onDropdownToggle,
  onSignOut,
  onClose,
}) {
  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
          <MenuButton
            className="focus:outline-none flex"
            onClick={() => onDropdownToggle && onDropdownToggle(!open)}
          >
            <img
              src={avatar}
              alt={name}
              className="w-7 h-7 rounded-full cursor-pointer"
            />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200">
                Signed in as <br />
                <span className="font-medium text-gray-900">{email}</span>
              </div>

              <MenuItem>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  onClick={onClose}
                >
                  Profile
                </Link>
              </MenuItem>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSignOut();
                }}
              >
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
