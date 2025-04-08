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
      Đăng xuất
    </button>
  );
};

export default LogoutButton;