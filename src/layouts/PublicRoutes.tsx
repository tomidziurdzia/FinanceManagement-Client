import { Outlet, Routes, Route } from "react-router-dom";

import image from "../assets/image.png";
import ConfirmAccount from "../pages/ConfirmAccount";
import ForgetPassword from "../pages/ForgetPassword";
import NewPassword from "../pages/NewPassword";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const PublicRoutes = () => {
  return (
    <div className="container mx-auto md:flex md:mt-20 justify-center max-w-screen-lg shadow rounded-md bg-white">
      <div className="w-1/2 m-auto">
        <div className="w-full px-10">
          {/* <Outlet /> */}
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="confirm-account" element={<ConfirmAccount />} />
            <Route path="new-password" element={<NewPassword />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Routes>
        </div>
      </div>
      <div className="w-1/2">
        <img src={image} className="rounded-r-md" />
      </div>
    </div>
  );
};

export default PublicRoutes;
