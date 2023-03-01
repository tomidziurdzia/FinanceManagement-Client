import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getTransactions } from "../store/transaction/transactionActions";
import ModalTransactionForm from "../components/ModalTransactionForm";
import TransactionItem from "../components/TransactionItem";
import { Transaction } from "../interfaces/Transaction";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transaction);

  const [modalForm, setModalForm] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [transactions.length]);

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
        <ModalTransactionForm
          modalForm={modalForm}
          setModalForm={setModalForm}
        />
      </div>
      <div className="bg-gray-100 shadow-sm rounded-md">
        <div className="flex w-full justify-center text-center p-4 border-b-2 text-xl">
          <p className="w-1/12">Date</p>
          <p className="w-2/12">Description</p>
          <p className="w-2/12">Category</p>
          <p className="w-2/12">Account</p>
          <p className="w-1/12">Type</p>
          <p className="w-1/12">Amount</p>
          <p className="w-3/12">Actions</p>
        </div>
        <div>
          {transactions.length ? (
            transactions.map((transaction: Transaction) => (
              <TransactionItem
                transaction={transaction}
                key={transaction._id}
                modalForm={modalForm}
                setModalForm={setModalForm}
              />
            ))
          ) : (
            <div className="text-center py-5 text-lg font-bold">
              Add a new transaction
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
