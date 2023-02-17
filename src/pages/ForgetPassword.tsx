import React from "react";
import { Link } from "react-router-dom";
import { AlertProps } from "../interfaces/User";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");
  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") {
      setAlert({ msg: "Email is required", error: true });
      return;
    }

    try {
      const { data } = await clientAxios.post("/users/forget-password", {
        email,
      });
      setAlert({ msg: data.msg, error: false });
      setEmail("");
    } catch (error) {
      console.log(error);
      // setAlert({
      //   msg: data.msg,
      //   error: true,
      // });
    }
  };

  const { msg, error } = alert;

  return (
    <div className="w-full">
      <div className="mb-5">
        <p className="text-2xl">Recovery account</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      {msg && <Alert msg={msg} error={error} />}
      <div className="flex lg:w-96 flex-col justify-center">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mt-3 p-3 border rounded-md text-sm "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Send instructions"
            className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
          />
        </form>
      </div>

      <div className="mt-6">
        <div className="flex text-sm mt-4 justify-center">
          <p className="mr-2 text-gray-500">Already have an account?</p>
          <Link to="/auth/signin" className="font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
