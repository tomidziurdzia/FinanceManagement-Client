import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../config/clientAxios";
import { Transaction } from "../../interfaces/Transaction";

export const getTransactions = createAsyncThunk<Transaction[]>(
  "transaction/getTransactions",
  async (_, thunkAPI) => {
    try {
      const { data } = await clientAxios.get("/transactions");
      data.sort(
        (
          a: { date: string | number | Date },
          b: { date: string | number | Date }
        ) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return (dateB as any) - (dateA as any);
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const newTransaction = createAsyncThunk<Object, Transaction>(
  "transaction/newTransaction",

  async (transaction, thunkAPI) => {
    try {
      const { data } = await clientAxios.post("/transactions", transaction);
      thunkAPI.dispatch(getTransactions());
      return data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const editTransaction = createAsyncThunk<Object, Transaction>(
  "transaction/editTransaction",
  async (transaction, thunkAPI) => {
    try {
      const { data } = await clientAxios.put(
        `/transactions/${transaction._id}`,
        transaction
      );
      thunkAPI.dispatch(getTransactions());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const getTransaction = createAsyncThunk<Object, string>(
  "transaction/getTransaction",
  async (id, thunkAPI) => {
    try {
      const { data } = await clientAxios.get(`/transactions/${id}`);
      thunkAPI.dispatch(getTransactions());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const delTransaction = createAsyncThunk<any, string>(
  "transaction/delTransaction",
  async (id, thunkAPI) => {
    try {
      await clientAxios.delete(`/transactions/${id}`);
      thunkAPI.dispatch(getTransactions());
      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);
