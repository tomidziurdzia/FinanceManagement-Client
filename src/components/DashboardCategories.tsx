import React from "react";
import { MdFastfood, MdDirectionsCar } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getCategories } from "../store/category/categoryActions";
import { formatAmount } from "../helpers/formatAmount";

const DashboardCategories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="w-full ">
      <div className="mb-5">
        <p className="text-xl text-terciary">Categories</p>
      </div>
      <div className="flex items-center justify-between flex-col text-lg">
        {categories &&
          categories.map((category) => (
            <div key={category._id} className="flex w-full items-center">
              <MdFastfood className="w-1/12" />
              <p className="w-6/12">{category.name}</p>
              <p className="w-5/12 text-right pr-4">
                {formatAmount(
                  category.transactions
                    ?.map((category) => category.amount)
                    .reduce((tot: number, next) => next! + tot, 0)
                )}
              </p>
            </div>
          ))}
        {/* <MdFastfood className="w-1/12 flex" />
        <p className="w-6/12">Groceries</p>
        <p className="w-5/12">$ 2020.02</p> */}
      </div>
    </div>
  );
};

export default DashboardCategories;
