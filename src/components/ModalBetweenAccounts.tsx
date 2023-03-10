import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertProps } from "../interfaces/User";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAccounts } from "../store/account/accountActions";
import { Account } from "../interfaces/Account";
import Alert from "./Alert";
import { Transaction } from "../interfaces/Transaction";
import { newTransaction } from "../store/transaction/transactionActions";
import { getCategories } from "../store/category/categoryActions";
import { clearTransaction } from "../store/transaction/transactionSlice";

const ModalBetweenAccounts = ({
  modalFormBetween,
  setModalFormBetween,
}: any) => {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.account);
  const { categories } = useAppSelector((state) => state.category);
  const { errorMessage } = useAppSelector((state) => state.account);
  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  React.useEffect(() => {
    dispatch(getAccounts());
    dispatch(getCategories());
  }, []);

  const transfer = categories.filter(
    (category) => category.name === "Transfer"
  );

  const [valuesFrom, setValuesFrom] = React.useState<Transaction>({
    date: Date.now(),
    description: "Transfer Account",
    type: "Expense",
    category: transfer[0]?._id as any,
    account: "" as any,
    amount: null,
  });

  const [valuesTo, setValuesTo] = React.useState<Transaction>({
    date: Date.now(),
    description: valuesFrom.description,
    type: "Income",
    category: transfer[0]?._id as any,
    account: "" as any,
    amount: null,
  });

  React.useEffect(
    () =>
      setValuesTo({
        date: valuesFrom.date,
        description: valuesFrom.description,
        type: "Income",
        category: transfer[0]?._id as any,
        account: valuesTo.account,
        amount: valuesFrom.amount,
      }),
    [valuesFrom]
  );

  React.useEffect(() => {
    setValuesTo({
      ...valuesTo,
      category: transfer[0]?._id as any,
    });
  }, []);

  const handleChangeFrom = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValuesFrom({
      ...valuesFrom,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeTo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValuesTo({
      ...valuesTo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    setModalFormBetween(!modalFormBetween);
    setAlert({
      msg: "",
      error: undefined,
    });

    dispatch(clearTransaction());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (valuesFrom.account === ("" as any)) {
      setAlert({ msg: "Account from is required", error: true });
      return;
    }

    if (valuesTo.account === ("" as any)) {
      setAlert({ msg: "Account to is required", error: true });
      return;
    }

    if (valuesFrom.amount === undefined || valuesFrom.amount === null) {
      setAlert({ msg: "Amount is required", error: true });
      return;
    }

    await Promise.all([
      dispatch(newTransaction(valuesFrom)),
      dispatch(newTransaction(valuesTo)),
    ]);
    setValuesFrom({
      ...valuesFrom,
      date: Date.now(),
      account: "" as any,
      amount: null,
    });
    setValuesTo({
      date: valuesFrom.date,
      description: valuesFrom.description,
      type: "Income",
      category: transfer[0]?._id as any,
      account: "" as any,

      amount: valuesFrom.amount,
    });
    setAlert({
      msg: "",
      error: undefined,
    });
    setModalFormBetween(!modalFormBetween);
  };
  const { msg, error } = alert;
  return (
    <Transition.Root show={modalFormBetween} as={Fragment}>
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
                    Transfer between accounts
                  </Dialog.Title>
                  {msg && <Alert msg={msg} error={error} />}
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="date" className="font-bold text-m">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        name="date"
                        value={valuesFrom.date as any}
                        onChange={handleChangeFrom}
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="account" className="font-bold text-m">
                        From
                      </label>
                      <select
                        name="account"
                        id="account"
                        value={valuesFrom.account as any}
                        onChange={handleChangeFrom}
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
                      <label htmlFor="account" className="font-bold text-m">
                        To
                      </label>
                      <select
                        name="account"
                        id="account"
                        value={valuesTo.account as any}
                        onChange={handleChangeTo}
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
                        type="number"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="$ 200.00"
                        name="amount"
                        value={
                          valuesFrom.amount ? valuesFrom.amount : undefined
                        }
                        onChange={handleChangeFrom}
                      />
                    </div>

                    <input
                      type="submit"
                      value="Create Transaction"
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

export default ModalBetweenAccounts;
