import React, { Dispatch, SetStateAction } from "react";
import WalletIcon from "../assets/WalletIcon";
import { Category } from "../interfaces/Category";
import { useAppDispatch } from "../store/store";
import { delCategory, getCategory } from "../store/category/categoryActions";
import ModalDelete from "./ModalDelete";
import { formatAmount } from "../helpers/formatAmount";

interface CategoryProps {
  category: Category;
  modalForm: boolean;
  setModalForm: Dispatch<SetStateAction<boolean>>;
}

const CategoryItem: React.FC<CategoryProps> = ({
  category,
  modalForm,
  setModalForm,
}) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    await dispatch(getCategory(category._id as string));
    setModalForm(!modalForm);
  };

  const total = category.transactions
    ?.map((transaction) => transaction.amount)
    .reduce((tot: number, next) => next! + tot, 0);

  const [modalDelete, setModalDelete] = React.useState(false);

  const handleDelete = async () => {
    setModalDelete(!modalDelete);
  };

  return (
    <>
      <div className="flex justify-center items-center text-lg px-4 py-2 border-b-2 border-gray-50">
        <div className="w-1/12 flex justify-center">
          <div
            style={{ backgroundColor: category.color }}
            className="rounded-full p-2 opacity-80"
          >
            <WalletIcon />
          </div>
        </div>
        <div className="w-2/12 flex justify-start">
          <p className="text-start pl-12">{category.name}</p>
        </div>
        <p className="w-2/12 text-center">{category.type}</p>
        <p className="w-2/12 text-center">{formatAmount(total)}</p>
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
        category={category}
      />
    </>
  );
};

export default CategoryItem;
