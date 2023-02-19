import { Transactions } from "./Transactions";

export interface Category {
  _id?: string;
  name: string;
  type: string;
  transactions: Transactions[];
}
