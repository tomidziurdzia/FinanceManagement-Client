import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAccounts } from "../store/account/accountActions";
import ModalAccountForm from "../components/ModalAccountForm";
import { Account } from "../interfaces/Account";
import AccountItem from "../components/AccountItem";
import ModalBetweenAccounts from "../components/ModalBetweenAccounts";
import ModalTransactionForm from "../components/ModalTransactionForm";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);

  const [modalForm, setModalForm] = React.useState<boolean>(false);
  const [modalFormBetween, setModalFormBetween] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [accounts]);

  const handleClick = () => setModalForm(!modalForm);

  const handleClickBetween = () => setModalFormBetween(!modalFormBetween);

  return (
    <>
      <div className="flex">
        <button
          onClick={handleClick}
          className="bg-primary mr-4 p-4 w-10 h-10 flex justify-center items-center text-xl rounded-full mb-4 ml-2 hover:opacity-80 hover:transition-colors"
        >
          +
        </button>{" "}
        <button
          onClick={handleClickBetween}
          className="bg-secondary p-3 w-10 h-10 flex justify-center items-center text-xl rounded-full mb-4 ml-2 hover:opacity-80 hover:transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrows-left-right"
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
            <line x1="21" y1="17" x2="3" y2="17" />
            <path d="M6 10l-3 -3l3 -3" />
            <line x1="3" y1="7" x2="21" y2="7" />
            <path d="M18 20l3 -3l-3 -3" />
          </svg>
        </button>
        <ModalAccountForm modalForm={modalForm} setModalForm={setModalForm} />
        <ModalBetweenAccounts
          modalFormBetween={modalFormBetween}
          setModalFormBetween={setModalFormBetween}
        />
      </div>
      <div className="bg-gray-100 shadow-sm rounded-md">
        <div className="flex w-full justify-center text-center p-4 border-b-2 text-xl">
          <p className="w-1/12">Icon</p>
          <p className="w-3/12">Name</p>
          <p className="w-3/12">Amount</p>
          <p className="w-5/12">Actions</p>
        </div>
        <div>
          {accounts.length ? (
            accounts.map((account: Account) => (
              <AccountItem
                account={account}
                key={account._id}
                modalForm={modalForm}
                setModalForm={setModalForm}
              />
            ))
          ) : (
            <div className="text-center py-5 text-lg font-bold">
              Add a new account
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accounts;
