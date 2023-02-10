import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/GoogleIcon";

const NewPassword = () => {
  return (
    <div>
      <div className="mb-5">
        <p className="text-2xl">Recovery account</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      <div>
        <form action="">
          <div className="mb-5">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="*********"
              className="w-full mt-3 p-3 border rounded-md text-sm "
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password">Repeat password</label>
            <input
              type="text"
              placeholder="*********"
              className="w-full mt-3 p-3 border rounded-md text-sm "
            />
          </div>
          <input
            type="submit"
            value="Save new password"
            className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
          />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
