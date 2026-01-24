import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-green" to="/">
          <FontAwesomeIcon
            icon={faLeaf}
            style={{ color: "var(--primary-green)", fontSize: "24px" }}
          />{" "}
          FarmFlow
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#agroNavbar"
          aria-controls="agroNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="agroNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active fw-semibold text-success"
                    : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/listings"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active fw-semibold text-success"
                    : "nav-link"
                }
              >
                Marketplace
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/price-board"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active fw-semibold text-success"
                    : "nav-link"
                }
              >
                Price Board
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active fw-semibold text-success"
                    : "nav-link"
                }
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active fw-semibold text-success"
                    : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Account Dropdown */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              style={{
                backgroundColor: "var(--primary-green)",
                color: "var(--white)",
              }}
              type="button"
              id="accountDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="accountDropdown"
            >
              {!user ? (
                <>
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      Get Started
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
