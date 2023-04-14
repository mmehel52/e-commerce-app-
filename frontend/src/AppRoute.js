import React from "react";
import { Route, Routes } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify";
import ForgetPassword from "./pages/ForgetPassword";
import Main from "./pages/Main";
import ResetPassword from "./pages/ResetPassword";
import Signin from "./pages/Signin";
import SearchPage from "./pages/SearchPage";
import ProductDetail from "./pages/ProductDetail";
import CardPage from "./pages/CardPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/verify/:id/:token" element={<EmailVerify />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/card" element={<CardPage />} />
    </Routes>
  );
};

export default AppRoute;
