import React from "react";
import { useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const { pathname } = useLocation();
  const headerName =
    pathname.substring(1).charAt(0).toUpperCase() +
    pathname.substring(1).slice(1);

  return (
    <>
      <header className="md:flex hidden items-center justify-between my-6">
        <p className="text-2xl">{headerName}</p>
        <div className="flex w-80 rounded-full justify-between bg-gray-50 border-1 shadow-sm items-center">
          <p className="p-4 bg-white rounded-full m-1 text-xl">TD</p>
          <p className="text-lg">Tomas Dziurdzia</p>
          <p className="mr-4 text-2xl">{">"}</p>
        </div>
      </header>
      <div className="flex md:hidden justify-between my-4">
        <p className="text-2xl">{headerName}</p>
        <DropdownMenu />
      </div>
    </>
  );
};

export default Header;
