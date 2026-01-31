import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TrendSetter</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
    </header>
  );
};

export default Header;