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

export const newCategory = createAsyncThunk<Object, Category>(
  "category/newCategory",
  async (category, thunkAPI) => {
    try {
      const { data } = await clientAxios.post("/categories", category);
      thunkAPI.dispatch(getCategories());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const editCategory = createAsyncThunk<Object, Category>(
  "category/editCategory",
  async (category, thunkAPI) => {
    try {
      const { data } = await clientAxios.put(
        `/categories/${category._id}`,
        category
      );
      thunkAPI.dispatch(getCategories());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const getCategory = createAsyncThunk<Object, string>(
  "category/getCategory",
  async (id, thunkAPI) => {
    try {
      const { data } = await clientAxios.get(`/categories/${id}`);
      thunkAPI.dispatch(getCategories());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const delCategory = createAsyncThunk<any, string>(
  "category/delCategory",
  async (id, thunkAPI) => {
    try {
      await clientAxios.delete(`/categories/${id}`);
      thunkAPI.dispatch(getCategories());
      return;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);
