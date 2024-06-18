// components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for additional styles

function Home() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center gradient-bg py-5">
      <div className="text-center">
        <h1 className="display-1 mb-4" style={{ color: '#3f51b5' }}>Welcome to Our Online Voting System</h1>
        <p className="fs-5 mb-5" style={{ color: '#757575' }}>
          Welcome to our online voting system, designed to provide you with a secure and convenient way to participate in democratic processes from anywhere in the world.
        </p>
        <div>
          <Link to="/login" className="btn btn-primary btn-lg me-3">Login</Link>
          <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
