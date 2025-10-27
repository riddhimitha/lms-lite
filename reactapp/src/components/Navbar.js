import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/courses" className="nav-link">📚 Courses</Link>
        <Link to="/add" className="nav-link">➕ Add Course</Link>
      </div>
    </nav>
  );
}

export default Navbar;