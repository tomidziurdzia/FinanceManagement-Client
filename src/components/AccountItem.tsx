import React, { Dispatch, SetStateAction } from "react";
import { Account } from "../interfaces/Account";
import { useAppDispatch } from "../store/store";
import { getAccount } from "../store/account/accountActions";
import ModalDelete from "./ModalDelete";
import WalletIcon from "../assets/WalletIcon";
import { formatAmount } from "../helpers/formatAmount";

interface AccountProps {
  account: Account;
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const AccountItem: React.FC<AccountProps> = ({
  account,
  modalForm,
  setModalForm,
}) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    await dispatch(getAccount(account._id as string));
    setModalForm(!modalForm);
  };

  const income = account.transactions
    ?.filter((inc) => inc.type === "Income")
    .map((inc) => inc.amount)
    .reduce((tot: number, next) => next! + tot, 0);
  const expense = account.transactions
    ?.filter((exp) => exp.type === "Expense")
    .map((exp) => exp.amount)
    .reduce((tot: number, next) => next! + tot, 0);

  const total = income! - expense!;

  const [modalDelete, setModalDelete] = React.useState(false);

  const handleDelete = async () => {
    setModalDelete(!modalDelete);
  };
  return (
    <>
      <div className="flex justify-center items-center text-lg px-4 py-2 border-b-2 border-gray-50">
        <div className="w-1/12 flex justify-center">
          <div
            style={{ backgroundColor: account.color }}
            className="rounded-full p-2 opacity-80"
          >
            <WalletIcon />
          </div>
        </div>
        <div className="w-3/12 flex justify-center">
          <p className="text-start">{account.name}</p>
        </div>
        <p className="w-3/12 text-center">{formatAmount(total)}</p>
        <div className="w-5/12 flex flex-col lg:flex-row justify-center gap-10">
          <button className="bg-terciary px-6 py-2 shadow rounded-md text-white hover:cursor-pointer hover:opacity-80 hover:transition-colors">
            View
          </button>
          <button
            onClick={handleClick}
            className="bg-primary px-6 py-2 shadow rounded-md text-terciary hover:cursor-pointer hover:opacity-80 hover:transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-200 px-6 py-2 shadow rounded-md text-terciary hover:cursor-pointer hover:opacity-80 hover:transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <ModalDelete
        modalDelete={modalDelete}
        setModalDelete={setModalDelete}
        account={account}
      />
    </>
  );
};

export default AccountItem;
