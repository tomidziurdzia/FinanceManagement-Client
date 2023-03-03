import React from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import WalletIcon from "../assets/WalletIcon";
import { getAccounts } from "../store/account/accountActions";
import { formatAmount } from "../helpers/formatAmount";

const DashboardAccount = () => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);
  React.useEffect(() => {
    dispatch(getAccounts());
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-center lg:justify-start text-center p-4 border-b-2 lg:text-xl">
        <p className="w-1/12">Icon</p>
        <p className="w-6/12">Account</p>
        <p className="w-5/12">Amount</p>
      </div>
      <div className="text-sm lg:text-lg">
        {accounts.map((account) => (
          <div
            key={account._id}
            className="flex justify-center items-center px-4 py-2 border-b-2 border-gray-50"
          >
            <div
              style={{ backgroundColor: account.color }}
              className="w-1/12 flex justify-center"
            >
              <div className="w-6">
                <WalletIcon />
              </div>
            </div>
            <p className="w-6/12 flex justify-start pl-2">{account.name}</p>
            <p className="w-5/12 flex justify-center">
              {formatAmount(
                account
                  .transactions!?.filter((inc) => inc.type === "Income")
                  .map((inc) => inc.amount)
                  .reduce((tot: number, next) => next! + tot, 0) -
                  account
                    .transactions!?.filter((inc) => inc.type === "Expense")
                    .map((inc) => inc.amount)
                    .reduce((tot: number, next) => next! + tot, 0)
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAccount;
