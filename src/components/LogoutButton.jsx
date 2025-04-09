import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      <a href="https://nhom6thu4ca1fe.vercel.app/">  Đăng xuất</a>
    </button>
  );
};

export default LogoutButton;