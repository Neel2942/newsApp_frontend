import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedValue = (sessionStorage.getItem('loggedIn'));
    if (storedValue === "true") {
      setLoggedIn(storedValue);
    } else {
      navigate('/login');
    }
  },[isLoggedIn]);

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
        <div className="d-flex align-items-center">
          <img
            src="../../logo192.png" // Replace with the actual path or URL of the user's photo
            alt="User"
            style={{ width: '30px', borderRadius: '50%', marginRight: '8px' }}
          />
          <button className="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
          <Link to="/registration" className="btn btn-link">
            Register
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/backyard" className="navbar-brand">
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
          </div>
          <div className="ms-auto">
            <UserOptions />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/backyard" className="nav-link">
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/viewUsers" className="nav-link">
                  View All Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/addCategory" className="nav-link">
                  Add Category
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/viewCategory" className="nav-link">
                  View All Category
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/addTags" className="nav-link">
                  Add Tags
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/viewTags" className="nav-link">
                  View All Tags
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/addPosts" className="nav-link">
                  Add Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/backyard/viewPosts" className="nav-link">
                  View All Posts
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminNavbar;
