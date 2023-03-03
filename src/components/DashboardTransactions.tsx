import React from "react";
import { useAppSelector } from "../store/store";
import { formatDate } from "../helpers/formatDate";
import { formatAmount } from "../helpers/formatAmount";
import { Link } from "react-router-dom";

const DashboardTransactions = () => {
  const { transactions } = useAppSelector((state) => state.transaction);
  return (
    <div className="flex flex-col">
      <div className="hidden lg:flex w-full justify-start text-center p-4 border-b-2 text-xl">
        <p className="w-2/12">Date</p>
        <p className="w-2/12">Description</p>
        <p className="w-2/12">Category</p>
        <p className="w-2/12">Account</p>
        <p className="w-2/12">Type</p>
        <p className="w-2/12">Amount</p>
      </div>
      <div>
        {transactions.length <= 9 &&
          transactions.slice(0, 8).map((transaction) => (
            <div
              key={transaction._id}
              className="lg:flex grid grid-cols-3 gap-4 justify-start items-center lg:text-lg px-4 py-2 border-b-2 border-gray-50"
            >
              <p className="w-2/12 text-center">
                {formatDate(transaction.date as any)}
              </p>

              <div className="w-2/12 flex justify-start lg:pl-10">
                <p className="text-start">{transaction.description}</p>
              </div>
              <p className="w-2/12 text-center">{transaction.category.name}</p>
              <p className="w-2/12 text-center">{transaction.account.name}</p>
              <p className="w-2/12 text-center">{transaction.type}</p>
              <p className="w-2/12 text-center">
                {formatAmount(transaction.amount as any)}
              </p>
            </div>
          ))}
        {transactions.length > 8 && (
          <div className="flex justify-end items-center  shadow-sm">
            <Link
              to="/transactions"
              className=" p-3 rounded-xl bg-primary w-40 my-3 text-center hover:cursor-pointer hover:opacity-80"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTransactions;
