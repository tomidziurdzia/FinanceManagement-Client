import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? (
    <div className="flex bg-white min-h-screen">
      <div className="bg-gray-50 w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12 px-4">
        <Header />

        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
