import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../interfaces/Category";
import { delCategory } from "./categoryActions";
import {
  getCategories,
  newCategory,
  getCategory,
  editCategory,
} from "./categoryActions";

interface Error {
  msg: string;
  error: boolean;
}

interface CategoryState {
  categories: Category[];
  category: Category | null;
  modalForm: boolean;
  modalDelete: boolean;
  errorMessage: Error;
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  modalForm: false,
  modalDelete: false,
  errorMessage: {
    msg: "",
    error: false,
  },
  loading: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategory: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(getCategory.fulfilled, (state, action: any) => {
      state.category = action.payload;
    });
    builder.addCase(newCategory.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(editCategory.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(delCategory.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
  },
});

export const { clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
