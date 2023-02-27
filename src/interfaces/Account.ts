import { Transactions } from "./Transactions";

export interface Account {
  _id?: string;
  name: string;
  transactions?: Transactions[];
  color: string;
  icon: string;
  total?: number | 0;
}
