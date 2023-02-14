export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  googleAcount: boolean;
}

export interface AlertProps {
  msg: string;
  error: boolean | undefined;
}
