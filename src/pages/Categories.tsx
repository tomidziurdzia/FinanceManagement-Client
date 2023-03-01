import React from "react";
import WalletIcon from "../assets/WalletIcon";
import CategoryItem from "../components/CategoryItem";
import ModalCategoryForm from "../components/ModalCategoryForm";
import { Category } from "../interfaces/Category";
import { getCategories } from "../store/category/categoryActions";
import { useAppSelector, useAppDispatch } from "../store/store";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.category);

  const [modalForm, setModalForm] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [categories.length]);

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
        <ModalCategoryForm modalForm={modalForm} setModalForm={setModalForm} />
      </div>
      <div className="bg-gray-100 shadow-sm rounded-md">
        <div className="flex w-full justify-center text-center p-4 border-b-2 text-xl">
          <p className="w-1/12">Icon</p>
          <p className="w-2/12">Name</p>
          <p className="w-2/12">Type</p>

          <p className="w-2/12">Amount</p>
          <p className="w-5/12">Actions</p>
        </div>
        <div>
          {categories &&
            categories.map((category: Category) => (
              <CategoryItem
                category={category}
                key={category._id}
                modalForm={modalForm}
                setModalForm={setModalForm}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
