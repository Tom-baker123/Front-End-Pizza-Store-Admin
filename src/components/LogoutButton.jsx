import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xoá token khỏi localStorage hoặc context
    localStorage.removeItem("token"); // hoặc context logout logic

    // Chuyển hướng sau khi logout
    window.location.href = "https://nhom6thu4ca1fe.vercel.app/?logout=true";
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Đăng xuất     
    </button>
  );
};

export default LogoutButton;