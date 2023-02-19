import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../config/clientAxios";
import { Category } from "../../interfaces/Category";

export const getCategories = createAsyncThunk<Category[]>(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await clientAxios.get("/categories");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
