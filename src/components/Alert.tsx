import { AlertProps } from "../interfaces/User";

const Alert = ({ msg, error }: AlertProps) => {
  return (
    <div
      className={`${
        error ? "bg-red-400" : "bg-primary"
      } text-center text-white p-3 rounded-xl font-bold text-sm my-10`}
    >
      {msg}
    </div>
  );
};

export default Alert;
