import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Quản lý danh mục", path: "/admin/categories" },
    { title: "Quản lý sản phẩm", path: "/admin/products" },
    { title: "Quản lý khách hàng", path: "/admin/customers" },
    { title: "Quản lý đơn hàng", path: "/admin/orders" },
    { title: "Quản lý tài khoản", path: "/admin/accounts" },
    { title: "Quản lý Topping", path: "/admin/topping" },
    { title: "Quản lý Kích Thước", path: "/admin/size" }, 
    { title: "Quản lý Khuyến mãi", path: "/admin/promotion" },
  ];

  const handleNavigation = (path) => {
    console.log(`Điều hướng tới: ${path}`);
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Brand Logo" className="logo" onError={() => console.error("Lỗi tải logo")} />
        <h2>Admin Pizza</h2>
      </div>
      <nav className="menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={() => handleNavigation(item.path)}
            style={{ cursor: "pointer" }}
          >
            {item.title}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;