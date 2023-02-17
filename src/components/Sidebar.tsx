import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon from "../assets/DashboardIcon";
import TransactionIcon from "../assets/TransactionIcon";
import WalletIcon from "../assets/WalletIcon";
import SettingIcon from "../assets/SettingIcon";
import LogoutIcon from "../assets/LogoutIcon";

const Sidebar = () => {
  const activeStyle = {
    backgroundColor: "#C8EE44",
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <nav className="w-full mt-20 p-8">
        <ul className="text-xl">
          <li className="mb-4">
            <NavLink
              to="/dashboard"
              className="flex p-3 rounded-xl justify-start"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <DashboardIcon />
              <p className="pl-3">Dashboard</p>
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
        <button className="flex p-3 items-center rounded-md hover:bg-gray-100">
          <LogoutIcon />
          <p className="text-gray-400 pl-2 text-lg">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
