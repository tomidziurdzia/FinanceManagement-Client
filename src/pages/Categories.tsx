import React from "react";
import WalletIcon from "../assets/WalletIcon";
import CategoryItem from "../components/CategoryItem";

const Categories = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex w-full justify-center text-center p-4 border-b-2 text-xl">
        <p className="w-1/12">Icon</p>
        <p className="w-2/12">Name</p>
        <p className="w-2/12">Type</p>

        <p className="w-2/12">Amount</p>
        <p className="w-5/12">Actions</p>
      </div>
      <div>
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </div>
  );
};

export default Categories;
