import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Use NavLink!

// You would import a CSS file for styling (e.g., import './Navbar.css';)

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the menu after clicking a link (good for mobile)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar w-auto">
     

      <button className="navbar-toggle" onClick={toggleMenu}>
        {/* Simple hamburger icon representation */}
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* 3. Navigation Links */}
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/Users" onClick={closeMenu}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings/Roles" onClick={closeMenu}>
              Roles
            </NavLink>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;