import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../interfaces/Transaction";
import {
  getTransactions,
  getTransaction,
  newTransaction,
  editTransaction,
  delTransaction,
} from "./transactionActions";

interface Error {
  msg: string;
  error: boolean;
}

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  modalForm: boolean;
  modalDelete: boolean;
  errorMessage: Error;
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  modalForm: false,
  modalDelete: false,
  errorMessage: {
    msg: "",
    error: false,
  },
  loading: false,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransaction: (state) => {
      state.transaction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getTransactions.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(getTransaction.fulfilled, (state, action: any) => {
      state.transaction = action.payload;
    });
    builder.addCase(newTransaction.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(editTransaction.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
    builder.addCase(delTransaction.rejected, (state, action: any) => {
      state.errorMessage = {
        msg: action.payload.msg,
        error: action.payload.error,
      };
    });
  },
});

export const { clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
