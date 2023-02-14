import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Accounts from "../pages/Accounts";
import Settings from "../pages/Settings";

const ProtectedRoutes = () => {
  return (
    <div className="flex bg-white min-h-screen">
      <div className="bg-gray-50 w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12 px-4">
        <Header />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoutes;
