import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css'; // Import the CSS file

function HomePage() {
  return (
    <div className="index-body">
      <header>
        <nav className="index-nav">
          <div className="index-logo">
            Employee Leave Management System
          </div>
          <div className="menu">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
        <section className="h-text">
          <h1 className="h-text-h1">Take a break to refresh, recharge, and return stronger</h1>
        </section>
      </header>
      <footer className="index-footer">
        <p>&copy; 2024 ELMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;