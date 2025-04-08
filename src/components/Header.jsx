import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="admin-header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;