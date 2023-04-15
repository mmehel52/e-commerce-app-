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
import Dashboard from "./pages/AdminDashboard";
import UsersAdmin from "./pages/AdminUsers";
import ProductAdmin from "./pages/AdminProduct";
import CategoryAdmin from "./pages/AdminCat";
import OrderAdmin from "./pages/AdminOrder";
import AdminDelivery from "./pages/AdminDelivery";
import AdminAnalitic from "./pages/AdminAnalitic";
import AdminReview from "./pages/AdminReview";

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
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/category" element={<ProductAdmin />} />
      <Route path="/admin/product" element={<CategoryAdmin />} />
      <Route path="/admin/order" element={<OrderAdmin />} />
      <Route path="/admin/delivery" element={<AdminDelivery />} />
      <Route path="/admin/analitic" element={<AdminAnalitic />} />
      <Route path="/admin/review" element={<AdminReview />} />
    </Routes>
  );
};

export default AppRoute;
