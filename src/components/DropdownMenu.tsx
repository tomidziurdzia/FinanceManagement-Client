import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { NavLink, useHref } from "react-router-dom";

const DropdownMenu = () => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const activeStyle = {
    backgroundColor: "#C8EE44",
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/dashboard"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Dashboard
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/transactions"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Transactions
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/accounts"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Accounts
                </NavLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to="/settings"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Settings
                </NavLink>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Logout
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
