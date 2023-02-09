import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import NewPassword from "./pages/NewPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="confirm-account" element={<ConfirmAccount />} />
          <Route path="new-password" element={<NewPassword />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
