export interface User {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  googleAcount?: boolean;
  password?: string;
  picture?: string;
}

export interface AlertProps {
  msg: string;
  error: boolean | undefined;
}
