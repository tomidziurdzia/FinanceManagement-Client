import { Outlet, Routes, Route } from "react-router-dom";

import image from "../assets/image.png";
import ConfirmAccount from "../pages/ConfirmAccount";
import ForgetPassword from "../pages/ForgetPassword";
import NewPassword from "../pages/NewPassword";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const PublicRoutes = () => {
  return (
    <div className="lg:container lg:mx-auto lg:flex lg:mt-20 justify-center lg:max-w-screen-lg shadow rounded-md bg-white mx-3 mt-10">
      <div className="lg:w-1/2 w-full m-auto">
        <div className="w-full flex justify-center p-3 lg:px-10">
          {/* <Outlet /> */}
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="confirm-account/:token" element={<ConfirmAccount />} />
            <Route path="new-password/:token" element={<NewPassword />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Routes>
        </div>
      </div>
      <div className="lg:w-1/2 hidden lg:flex">
        <img src={image} className="rounded-r-md" />
      </div>
    </div>
  );
};

export default PublicRoutes;
