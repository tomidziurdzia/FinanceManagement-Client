import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/GoogleIcon";

const ForgetPassword = () => {
  return (
    <div>
      <div className="mb-5">
        <p className="text-2xl">Recovery account</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      <div className="flex w-96 flex-col justify-center">
        <form action="">
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
