import React from "react";
import ArrowDown from "../assets/ArrowDown";
import ArrowUp from "../assets/ArrowUp";
import WalletIcon from "../assets/WalletIcon";
import { formatAmount } from "../helpers/formatAmount";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getTransactions } from "../store/transaction/transactionActions";

const DashboardBalance = () => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getTransactions());
  }, []);

  console.log(transactions);

  const income = transactions
    ?.filter((inc) => inc.type === "Income")
    .filter((tra) => tra.category.name !== "Transfer")
    .map((inc) => inc.amount)
    .reduce((tot: number, next) => next! + tot, 0);
  const expense = transactions
    ?.filter((exp) => exp.type === "Expense")
    .filter((tra) => tra.category.name !== "Transfer")
    .map((exp) => exp.amount)
    .reduce((tot: number, next) => next! + tot, 0);

  const total = income! - expense!;

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="bg-terciary flex m-auto md:m-0 md:w-1/3 gap-6 justify-center items-center rounded-xl h-20 md:h-28 shadow-sm p-4 md:p-0">
        <div className="bg-white rounded-full p-2">
          <WalletIcon />
        </div>
        <div className="flex flex-col">
          <p className="text-white text-lg mb-2 m-auto">Total balance</p>
          <p className="text-white text-2xl m-auto">{formatAmount(total)}</p>
        </div>
      </div>
      <div className="flex w-full md:w-2/3 justify-evenly mt-5 md:mt-0">
        <div className="bg-gray-50 flex m-auto md:m-0 md:w-96 gap-6 justify-center items-center rounded-xl h-12 md:h-28 shadow-sm p-4 md:p-0">
          <div className="bg-green-300 rounded-full md:p-2 p-1">
            <ArrowUp />
          </div>
          <div className="flex flex-col">
            <p className="text-terciary text-lg md:text-2xl mb-2 m-auto hidden md:block">
              Total incoming
            </p>
            <p className="text-terciary text-lg md:text-2xl m-auto">
              {formatAmount(income)}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 flex m-auto md:m-0 md:w-96 gap-6 justify-center items-center rounded-xl h-12 md:h-28 shadow-sm p-4 md:p-0">
          <div className="bg-red-300 rounded-full p-1 md:p-2">
            <ArrowDown />
          </div>
          <div className="flex flex-col">
            <p className="text-terciary text-lg md:text-2xl mb-2 m-auto hidden md:block">
              Total spending
            </p>
            <p className="text-terciary text-lg md:text-2xl  m-auto">
              {formatAmount(expense)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBalance;
