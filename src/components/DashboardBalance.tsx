import React from "react";
import ArrowDown from "../assets/ArrowDown";
import ArrowUp from "../assets/ArrowUp";
import WalletIcon from "../assets/WalletIcon";

const DashboardBalance = () => {
  return (
    <div className="flex gap-6 justify-evenly">
      <div className="bg-terciary w-96 flex gap-6 justify-center items-center rounded-xl h-28 shadow-sm">
        <div className="bg-white rounded-full p-2">
          <WalletIcon />
        </div>
        <div className="flex flex-col">
          <p className="text-white text-lg mb-2 m-auto">Total balance</p>
          <p className="text-white text-2xl m-auto">$ 5240,20</p>
        </div>
      </div>
      <div className="bg-gray-50 w-96 flex gap-6 justify-center items-center rounded-xl h-28 shadow-sm">
        <div className="bg-gray-100 rounded-full p-2">
          <ArrowUp />
        </div>
        <div className="flex flex-col">
          <p className="text-terciary text-lg mb-2 m-auto">Total incoming</p>
          <p className="text-terciary text-2xl m-auto">$ 540,20</p>
        </div>
      </div>
      <div className="bg-gray-50 w-96 flex gap-6 justify-center items-center rounded-xl h-28 shadow-sm">
        <div className="bg-gray-100 rounded-full p-2">
          <ArrowDown />
        </div>
        <div className="flex flex-col">
          <p className="text-terciary text-lg mb-2 m-auto">Total spending</p>
          <p className="text-terciary text-2xl m-auto">$ 240,20</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardBalance;
