import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/GoogleIcon";

const SignUp = () => {
  return (
    <div>
      <div className="mb-5">
        <p className="text-2xl">Create new account</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      <div>
        <form action="">
          <div className="mb-5">
            <label className="block" htmlFor="email">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Tomas Dziurdzia"
              className="w-full mt-3 p-3 border rounded-md text-sm "
            />
          </div>
          <div className="mb-5">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mt-3 p-3 border rounded-md text-sm "
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="*********"
              className="w-full mt-3 p-3 border rounded-md text-sm "
            />
          </div>
          <input
            type="submit"
            value="Create account"
            className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
          />
        </form>
        <button className="flex border mt-5 w-full justify-center p-2 text-gray-500 rounded-md shadow-sm">
          <GoogleIcon />
          <p className="ml-2">Sign up with Google</p>
        </button>
      </div>

      <div className="mt-6">
        <div className="flex text-sm mt-4 justify-center">
          <p className="mr-2 text-gray-500">Already have an account?</p>
          <Link to="/" className="font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
