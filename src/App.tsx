import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import PublicRoutes from "./layouts/PublicRoutes";

import { useAppSelector, useAppDispatch } from "./store/store";
import { setLoggedIn } from "./store/auth/authActions";

const App = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkAuth = async () => {
      await dispatch(setLoggedIn());
    };
    checkAuth();
  }, [setLoggedIn]);

  if (status === "checking") return "Loading...";

  return (
    <BrowserRouter>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/auth/*" element={<PublicRoutes />} />
            <Route path="/*" element={<Navigate to="/auth/signin" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<ProtectedRoutes />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
