import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Store } from "../Store";

export default function PrivateRoute() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
}
