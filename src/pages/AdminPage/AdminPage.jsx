import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import LogoutButton from '../../components/LogoutButton';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <div className="header-container">
          <LogoutButton />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;