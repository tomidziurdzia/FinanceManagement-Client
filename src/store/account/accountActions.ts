import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../config/clientAxios";
import { Account } from "../../interfaces/Account";

export const getAccounts = createAsyncThunk<Account[]>(
  "account/getAccounts",
  async (_, thunkAPI) => {
    try {
      const { data } = await clientAxios.get("/accounts");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const newAccount = createAsyncThunk<Object, Account>(
  "account/newAccount",
  async (account, thunkAPI) => {
    try {
      const { data } = await clientAxios.post("/accounts", account);
      thunkAPI.dispatch(getAccounts());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const editAccount = createAsyncThunk<Object, Account>(
  "account/editAccount",
  async (account, thunkAPI) => {
    try {
      const { data } = await clientAxios.put(
        `/accounts/${account._id}`,
        account
      );
      thunkAPI.dispatch(getAccounts());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const getAccount = createAsyncThunk<Object, string>(
  "account/getAccount",
  async (id, thunkAPI) => {
    try {
      const { data } = await clientAxios.get(`/accounts/${id}`);
      thunkAPI.dispatch(getAccounts());
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const delAccount = createAsyncThunk<any, string>(
  "account/delAccount",
  async (id, thunkAPI) => {
    try {
      await clientAxios.delete(`/accounts/${id}`);
      thunkAPI.dispatch(getAccounts());
      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);
