import { Transaction } from "./Transaction";

export interface Category {
  _id?: string;
  name: string;
  type: string;
  transactions?: Transaction[];
  color: string;
  icon: string;
}
