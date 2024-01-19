import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = (sessionStorage.getItem('loggedIn'));
    console.log(storedValue);
    if (storedValue === "true") {
      setLoggedIn(storedValue);
    } else {
      navigate('/login');
    }
  },[isLoggedIn,navigate]);

  const handleLogout = () => {
    // Perform logout logic
    sessionStorage.setItem("loggedIn",false);
    const loggedIn = (sessionStorage.getItem('loggedIn'));
    setLoggedIn(loggedIn);
    navigate('/login');
  };

  const UserOptions = () => {
    if (isLoggedIn === "true") {
      return (
        <>
        <div className="d-flex align-items-center">
          <img
            src="./logo192.png" // Replace with the actual path or URL of the user's photo
            alt="User"
            style={{ width: '30px', borderRadius: '50%', marginRight: '8px' }}
          />
          <button className="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
        </>
      );
    } else {
      return (
        <>
        <div>
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
          <Link to="/registration" className="btn btn-link">
            Register
          </Link>
        </div>
        </>
      );
    }
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Your Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>
          <div className="ms-auto">
            <UserOptions />
          </div>
        </div>
      </div>
    </nav>
  <Outlet />
  </>
  );

};

export default Navbar;
