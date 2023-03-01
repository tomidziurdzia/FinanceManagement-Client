import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertProps } from "../interfaces/User";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getCategories } from "../store/category/categoryActions";
import Alert from "./Alert";
import { Transaction } from "../interfaces/Transaction";
import { clearTransaction } from "../store/transaction/transactionSlice";
import { getAccounts } from "../store/account/accountActions";
import {
  editTransaction,
  newTransaction,
} from "../store/transaction/transactionActions";

const ModalTransactionForm = ({ modalForm, setModalForm }: any) => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);
  const { categories } = useAppSelector((state) => state.category);
  const { transaction } = useAppSelector((state) => state.transaction);
  const { errorMessage } = useAppSelector((state) => state.category);

  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  const [values, setValues] = React.useState<Transaction>({
    date: Date.now(),
    description: "",
    type: "",
    category: "" as any,
    account: "" as any,
    amount: null,
  });

  let categorySelected;
  if (values.type === "Expense") {
    categorySelected = categories.filter(
      (category) => category.type === "Expense"
    );
  } else if (values.type === "Income") {
    categorySelected = categories.filter(
      (category) => category.type === "Income"
    );
  }

  React.useEffect(() => {
    dispatch(getAccounts());
    dispatch(getCategories());
  }, []);

  React.useEffect(() => {
    if (transaction?._id) {
      setValues({
        date: (transaction.date as any).split("T")[0],
        description: transaction.description,
        type: transaction.type,
        category: transaction.category,
        account: transaction.account,
        amount: transaction.amount,
        _id: transaction._id,
      });
    }
  }, [transaction]);

  React.useEffect(() => {
    if (errorMessage) {
      setAlert({
        msg: errorMessage.msg,
        error: errorMessage.error,
      });
    }
  }, [errorMessage]);

  const handleClick = () => {
    setModalForm(!modalForm);
    setAlert({
      msg: "",
      error: undefined,
    });
    setValues({
      date: Date.now(),
      description: "",
      type: "",
      category: "" as any,
      account: "" as any,
      amount: null,
    });
    dispatch(clearTransaction());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.description === "") {
      setAlert({ msg: "Description is required", error: true });
      return;
    }

    if (values.type === "") {
      setAlert({ msg: "Type is required", error: true });
      return;
    }

    if (values.category === ("" as any)) {
      setAlert({ msg: "Category is required", error: true });
      return;
    }

    if (values.account === ("" as any)) {
      setAlert({ msg: "Account is required", error: true });
      return;
    }

    if (values.amount === undefined) {
      setAlert({ msg: "Amount is required", error: true });
      return;
    }

    if (transaction?._id) {
      const resp = await dispatch(editTransaction(values));
      if (resp.meta.requestStatus === "rejected") return;
    } else {
      const resp = await dispatch(newTransaction(values));
      if (resp.meta.requestStatus === "rejected") return;
    }

    setValues({
      date: Date.now(),
      description: "",
      type: "",
      category: "" as any,
      account: "" as any,
      amount: null,
    });
    setAlert({
      msg: "",
      error: undefined,
    });
    setModalForm(!modalForm);
  };
  const { msg, error } = alert;
  return (
    <Transition.Root show={modalForm} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 -mt-64 md:-mt-0 overflow-y-auto"
        onClose={handleClick}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={handleClick}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-boldtext-center font-bold text-center border-b pb-3"
                  >
                    {transaction?._id ? "Edit Transaction" : "New Transaction"}
                  </Dialog.Title>
                  {msg && <Alert msg={msg} error={error} />}
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="date">Travel Date</label>
                      <input
                        type="date"
                        id="date"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        name="date"
                        value={values.date as any}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="name" className="font-bold text-m">
                        Description
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Car insurance"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="type" className="font-bold text-m">
                        Type
                      </label>
                      <select
                        name="type"
                        id="type"
                        value={values.type}
                        onChange={handleChange}
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        <option value="Income" key="income">
                          Income
                        </option>
                        <option value="Expense" key="expense">
                          Expense
                        </option>
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="category" className="font-bold text-m">
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={values.category as any}
                        onChange={handleChange}
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        {categorySelected?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="account" className="font-bold text-m">
                        Account
                      </label>
                      <select
                        name="account"
                        id="account"
                        value={values.account as any}
                        onChange={handleChange}
                        className="border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        {accounts.map((account) => (
                          <option key={account._id} value={account._id}>
                            {account.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="amount" className="font-bold text-m">
                        Amount
                      </label>
                      <input
                        id="amount"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="$ 200.00"
                        name="amount"
                        value={values.amount ? values.amount : undefined}
                        onChange={handleChange}
                      />
                    </div>

                    <input
                      type="submit"
                      value={
                        transaction?._id ? "Save Changes" : "Create Transaction"
                      }
                      className="bg-primary text-center text-white py-2 w-full rounded hover:cursor-pointer hover:opacity-80 font-bold text-xl transition-colors"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalTransactionForm;
