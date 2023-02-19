import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../interfaces/Category";
import { getCategories } from "./categoryActions";

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
  reducers: {},
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
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
