import React from "react";
import WalletIcon from "../assets/WalletIcon";

const CategoryItem = () => {
  return (
    <div className="flex justify-center items-center text-lg px-4 py-2 border-b-2 border-gray-50">
      <div className="w-1/12 flex justify-center">
        <WalletIcon />
      </div>
      <div className="w-2/12 flex justify-start">
        <p className="text-start pl-20">Groceries</p>
      </div>
      <p className="w-2/12 text-center">Income</p>
      <p className="w-2/12 text-center">$ 2.000</p>
      <div className="w-5/12 flex flex-col lg:flex-row justify-center gap-10">
        <button className="bg-terciary px-6 py-2 shawod rounded-md text-white hover:cursor-pointer hover:opacity-80 hover:transition-colors">
          View
        </button>
        <button className="bg-primary px-6 py-2 shawod rounded-md text-terciary hover:cursor-pointer hover:opacity-80 hover:transition-colors">
          Edit
        </button>
        <button className="bg-red-200 px-6 py-2 shawod rounded-md text-terciary hover:cursor-pointer hover:opacity-80 hover:transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
