import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { loginUser } from "../store/auth/authActions";
import { AlertProps } from "../interfaces/User";
import Alert from "../components/Alert";
import GoogleButton from "../components/GoogleButton";

interface UserForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [user, setUser] = React.useState({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [values, setValues] = React.useState<UserForm>({
    email: "",
    password: "",
  });
  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  const { errorMessage } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (errorMessage) {
      setAlert({ msg: errorMessage.msg, error: errorMessage.error });
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([values.email, values.password].includes("")) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }

    await dispatch(loginUser(values));

    navigate("/dashboard");
  };

  const { msg, error } = alert;

  return (
    <div className="w-full">
      <div className="mb-5">
        <p className="text-2xl">Welcome back !</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      <div className="flex w-full lg:w-96 flex-col justify-center">
        {msg && <Alert msg={msg} error={error} />}
        <form action="" onSubmit={handleSubmit} className="lg:w-96">
          <div className="mb-5">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mt-3 p-3 border rounded-md text-sm "
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*********"
              className="w-full mt-3 p-3 border rounded-md text-sm "
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Sign in"
            className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
          />
        </form>
        <div className="mt-5">
          <GoogleButton setUser={setUser} />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex text-sm mt-4 justify-center">
          <p className="mr-2 text-gray-500">Don't have an account?</p>
          <Link to="/auth/signup" className="font-bold">
            Sign up for free
          </Link>
        </div>
        <Link
          className="flex justify-center text-sm mt-4 text-gray-500"
          to="/auth/forget-password"
        >
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
