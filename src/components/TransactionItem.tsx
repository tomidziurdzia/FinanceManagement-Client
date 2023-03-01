import React, { Dispatch, SetStateAction } from "react";
import { Transaction } from "../interfaces/Transaction";
import { useAppDispatch } from "../store/store";
import { getTransaction } from "../store/transaction/transactionActions";
import { formatAmount } from "../helpers/formatAmount";
import { formatDate } from "../helpers/formatDate";
import ModalDelete from "./ModalDelete";

interface TransactionProps {
  transaction: Transaction;
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const TransactionItem: React.FC<TransactionProps> = ({
  transaction,
  modalForm,
  setModalForm,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    await dispatch(getTransaction(transaction._id as string));
    setModalForm(!modalForm);
  };

  const [modalDelete, setModalDelete] = React.useState(false);

  const handleDelete = async () => {
    setModalDelete(!modalDelete);
  };

  return (
    <>
      <div className="flex justify-center items-center text-lg px-4 py-2 border-b-2 border-gray-50">
        <p className="w-1/12 text-center">
          {formatDate(transaction.date as any)}
        </p>

        <div className="w-2/12 flex justify-start pl-10">
          <p className="text-start">{transaction.description}</p>
        </div>
        <p className="w-2/12 text-center">{transaction.category.name}</p>
        <p className="w-2/12 text-center">{transaction.account.name}</p>
        <p className="w-1/12 text-center">{transaction.type}</p>
        <p className="w-1/12 text-center">
          {formatAmount(transaction.amount as any)}
        </p>
        <div className="w-3/12 flex flex-col lg:flex-row justify-center gap-4">
          <button className="bg-terciary px-4 py-1 shadow rounded-md text-white hover:cursor-pointer hover:opacity-80 hover:transition-colors">
            View
          </button>
          <button
            onClick={handleClick}
            className="bg-primary px-4 py-1 shadow rounded-md text-terciary hover:cursor-pointer hover:opacity-80 hover:transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-200 px-4 py-1 shadow rounded-md text-terciary hover:cursor-pointer hover:opacity-80 hover:transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <ModalDelete
        modalDelete={modalDelete}
        setModalDelete={setModalDelete}
        transaction={transaction}
      />
    </>
  );
};

export default TransactionItem;
