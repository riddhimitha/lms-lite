import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '2rem' }}>
      <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none' }}>Home</Link>
      <Link to="/courses" style={{ marginRight: '1rem', textDecoration: 'none' }}>Courses</Link>
      <Link to="/add" style={{ textDecoration: 'none' }}>Add Course</Link>
    </nav>
  );
}

export default Navbar;