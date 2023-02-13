import { createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import clientAxios from "../../config/clientAxios";
import { User } from "../../interfaces/User";

export const loginUser = createAsyncThunk<User | any, Object>(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const { data } = await clientAxios.post("users/login", user);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        msg: error.response.data.msg,
        error: true,
      });
    }
  }
);

export const setLoggedIn = createAsyncThunk(
  "auth/currentUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Not found");

    try {
      const { data } = await clientAxios("users/perfil");
      console.log(data);
      //   localStorage.setItem("token", data.token);
      return data;
    } catch (error: any) {
      localStorage.clear();
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
