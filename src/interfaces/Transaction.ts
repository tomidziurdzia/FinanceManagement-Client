import { Account } from "./Account";
import { Category } from "./Category";

export interface Transaction {
  _id?: string;
  date: Date | number;
  description: string;
  type: string;
  category: Category;
  account: Account;
  amount: number | null;
}
