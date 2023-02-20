import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CirclePicker } from "react-color";
import { AlertProps } from "../interfaces/User";
import { Category } from "../interfaces/Category";
import { useAppDispatch, useAppSelector } from "../store/store";
import { newCategory, editCategory } from "../store/category/categoryActions";
import Alert from "./Alert";
import { clearCategory } from "../store/category/categorySlice";

const ModalCategoryForm = ({ modalForm, setModalForm }: any) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state) => state.category);
  const { errorMessage } = useAppSelector((state) => state.category);
  const [currentColor, setCurrentColor] = React.useState("#f44336");

  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  const [values, setValues] = React.useState<Category>({
    name: "",
    type: "",
    color: "",
    icon: "",
  });

  React.useEffect(() => {
    if (category?._id) {
      setValues({
        name: category.name,
        type: category.type,
        color: category.color,
        icon: "",
        _id: category._id,
      });
      setCurrentColor(category.color);
    }
  }, [category]);

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
      name: "",
      type: "",
      color: "",
      icon: "",
    });
    dispatch(clearCategory());
    setCurrentColor("#f44336");
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
    values.color = currentColor;

    if (values.name === "") {
      setAlert({ msg: "Name is required", error: true });
      return;
    }

    if (values.type === "") {
      setAlert({ msg: "Type is required", error: true });
      return;
    }

    if (category?._id) {
      const resp = await dispatch(editCategory(values));
      if (resp.meta.requestStatus === "rejected") return;
    } else {
      const resp = await dispatch(newCategory(values));
      if (resp.meta.requestStatus === "rejected") return;
    }

    setValues({
      name: "",
      type: "",
      color: "",
      icon: "",
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
                    {category?._id ? "Edit Platform" : "New Platform"}
                  </Dialog.Title>
                  {msg && <Alert msg={msg} error={error} />}
                  <form onSubmit={handleSubmit} className="my-10" action="">
                    <div className="mb-5">
                      <label htmlFor="name" className="font-bold text-m">
                        Category
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="border w-full mt-2 placeholder-gray-400 rounded-md p-2"
                        placeholder="Groceries"
                        name="name"
                        value={values.name}
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
                      <label htmlFor="color" className="font-bold text-m">
                        Select color
                      </label>
                      <div className="mt-2 flex justify-center items-center">
                        <div className="w-2/3">
                          <CirclePicker
                            // color={category?._id && category.color}
                            onChangeComplete={(color) =>
                              setCurrentColor(color.hex)
                            }
                          />
                        </div>
                        <div className="w-1/3 justify-center items-center flex">
                          <div
                            className={` w-16 h-16 rounded-full border-4`}
                            style={{ backgroundColor: currentColor }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <input
                      type="submit"
                      value={category?._id ? "Save Changes" : "Create Category"}
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

export default ModalCategoryForm;
