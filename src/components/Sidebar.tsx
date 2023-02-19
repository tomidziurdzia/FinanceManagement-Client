import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "../assets/DashboardIcon";
import TransactionIcon from "../assets/TransactionIcon";
import WalletIcon from "../assets/WalletIcon";
import SettingIcon from "../assets/SettingIcon";
import LogoutIcon from "../assets/LogoutIcon";
import CategoryIcon from "../assets/CategoryIcon";
import { useAppDispatch } from "../store/store";
import { startLogout } from "../store/auth/authActions";

const Sidebar = () => {
  const activeStyle = {
    backgroundColor: "#C8EE44",
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(startLogout());
    navigate("auth/signin");
  };

  const activeDashboard = () => {
    if (
      window.location.pathname.length === 1 ||
      window.location.pathname === "/auth/signin"
    ) {
      return true;
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <nav className="w-full mt-20 p-8">
        <ul className="text-xl">
          <li className="mb-4">
            <NavLink
              to="/"
              className="flex p-3 rounded-xl justify-start"
              style={activeDashboard() ? activeStyle : undefined}
            >
              <DashboardIcon />
              <p className="pl-3">Dashboard</p>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="categories"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="flex p-3  rounded-xl justify-start"
            >
              <CategoryIcon />
              <p className="pl-3">Categories</p>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="transactions"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="flex p-3  rounded-xl justify-start"
            >
              <TransactionIcon />
              <p className="pl-3">Transactions</p>
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="accounts"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="flex p-3  rounded-xl justify-start"
            >
              <WalletIcon />
              <p className="pl-3">Accounts</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="flex p-3  rounded-xl justify-start"
            >
              <SettingIcon />
              <p className="pl-3">Settings</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-8">
        <button
          onClick={handleLogout}
          className="flex p-3 items-center rounded-md hover:bg-gray-100"
        >
          <LogoutIcon />
          <p className="text-gray-400 pl-2 text-lg">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
