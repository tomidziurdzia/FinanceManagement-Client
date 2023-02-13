import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/GoogleIcon";
import { useAppDispatch } from "../store/store";
import { loginUser } from "../store/auth/authActions";

interface UserForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [user, setUser] = React.useState<UserForm>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginUser(user));
  };
  return (
    <div>
      <div className="mb-5">
        <p className="text-2xl">Welcome back !</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mt-3 p-3 border rounded-md text-sm "
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Sign in"
            className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
          />
        </form>
        <button className="flex border mt-5 w-full justify-center p-2 text-gray-500 rounded-md shadow-sm">
          <GoogleIcon />
          <p className="ml-2">Sign in with Google</p>
        </button>
      </div>

      <div className="mt-6">
        <div className="flex text-sm mt-4 justify-center">
          <p className="mr-2 text-gray-500">Don't have an account?</p>
          <Link to="/signup" className="font-bold">
            Sign up for free
          </Link>
        </div>
        <Link
          className="flex justify-center text-sm mt-4 text-gray-500"
          to="/forget-password"
        >
          Forgot password
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
