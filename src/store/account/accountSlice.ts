import { createSlice } from "@reduxjs/toolkit";
import { Account } from "../../interfaces/Account";
import { delAccount } from "./accountActions";
import {
  getAccounts,
  newAccount,
  editAccount,
  getAccount,
} from "./accountActions";

interface Error {
  msg: string;
  error: boolean;
}

interface AccountState {
  accounts: Account[];
  account: Account | null;
  modalForm: boolean;
  modalDelete: boolean;
  errorMessage: Error;
  loading: boolean;
}

const initialState: AccountState = {
  accounts: [],
  account: null,
  modalForm: false,
  modalDelete: false,
  errorMessage: {
    msg: "",
    error: false,
  },
  loading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: (state) => {
      state.account = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccounts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
    });
    builder.addCase(getAccounts.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(getAccount.fulfilled, (state, action: any) => {
      state.account = action.payload;
    });
    builder.addCase(newAccount.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(editAccount.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(delAccount.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
  },
});

export const { clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
