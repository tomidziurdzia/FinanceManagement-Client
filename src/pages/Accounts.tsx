import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAccounts } from "../store/account/accountActions";
import ModalAccountForm from "../components/ModalAccountForm";
import { Account } from "../interfaces/Account";
import AccountItem from "../components/AccountItem";

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);

  const [modalForm, setModalForm] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getAccounts());
  }, [accounts.length]);

  const handleClick = () => setModalForm(!modalForm);

  return (
    <>
      <div>
        <button
          onClick={handleClick}
          className="bg-primary p-4 w-10 h-10 flex justify-center items-center text-xl rounded-full mb-4 ml-2 hover:opacity-80 hover:transition-colors"
        >
          +
        </button>
        <ModalAccountForm modalForm={modalForm} setModalForm={setModalForm} />
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
