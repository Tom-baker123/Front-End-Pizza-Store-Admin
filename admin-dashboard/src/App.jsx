import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import CategoryManagement from "./pages/CategoryManagement/CategoryManagement";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import CustomerManagement from "./pages/CustomerManagement/CustomerManagement";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import AccountManagement from "./pages/AccountManagement/AccountManagement";
import ToppingManagement from "./pages/ToppingManagement/ToppingManagement";
import SizeManagement from "./pages/SizeManagement/SizeManagement";
import PromotionManagement from "./pages/PromotionManagement/PromotionManagement"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<div>Chào mừng đến trang Admin của Pizza Bốn Anh Tài</div>} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="accounts" element={<AccountManagement />} />
          <Route path="topping" element={<ToppingManagement />} />
          <Route path="size" element={<SizeManagement />} />
          <Route path="promotion" element={<PromotionManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;