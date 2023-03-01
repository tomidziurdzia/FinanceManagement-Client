import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./auth/authSlice";
import categorySlice from "./category/categorySlice";
import accountSlice from "./account/accountSlice";
import transactionSlice from "./transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    account: accountSlice,
    transaction: transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
