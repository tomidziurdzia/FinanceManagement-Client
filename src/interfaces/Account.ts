import { Transaction } from "./Transaction";

export interface Account {
  _id?: string;
  name: string;
  transactions?: Transaction[];
  color: string;
  icon: string;
  total?: number | 0;
}
