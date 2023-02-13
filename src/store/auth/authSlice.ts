import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User";
import { loginUser, setLoggedIn } from "./authActions";

interface Error {
  msg: string;
  error: boolean;
}
interface AuthState {
  status: "checking" | "not-authenticated" | "authenticated";
  user: User | null;
  errorMessage: Error;
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  status: "not-authenticated",
  errorMessage: {
    msg: "",
    error: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "checking";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "authenticated";
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(setLoggedIn.pending, (state) => {
      state.status = "checking";
    });
    builder.addCase(setLoggedIn.fulfilled, (state, action) => {
      state.status = "authenticated";
      state.user = action.payload;
    });
    builder.addCase(setLoggedIn.rejected, (state) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = { msg: "", error: false };
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
