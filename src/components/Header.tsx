import React from "react";
import { useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { useAppSelector } from "../store/store";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  let headerName;

  if (
    pathname === "/" ||
    pathname === "/auth/signin" ||
    pathname === "/auth/signup"
  ) {
    headerName = "Dashboard";
  } else {
    headerName =
      pathname.substring(1).charAt(0).toUpperCase() +
      pathname.substring(1).slice(1);
  }
  const userIcon = (
    <div className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-user"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#363A3F"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </div>
  );

  return (
    <>
      <header className="md:flex hidden items-center justify-between my-6">
        <p className="text-2xl">{headerName}</p>
        <div className="flex w-72 rounded-full justify-between bg-gray-50 border-1 shadow-sm items-center">
          {user?.picture === "" || user?.picture === undefined ? (
            <div className="p-4 bg-white rounded-full m-1 text-xl w-1/4">
              {userIcon}
            </div>
          ) : (
            <div className="m-1 w-1/4">
              <img
                src={user?.picture}
                alt=""
                width={50}
                className="rounded-full"
              />
            </div>
          )}
          <p className="text-lg w-3/4 text-center">
            {user?.name} {user?.surname}
          </p>
        </div>
      </header>
      <div className="flex lg:hidden justify-between my-4">
        <p className="text-2xl">{headerName}</p>
        <DropdownMenu />
      </div>
    </>
  );
};

export default Header;
