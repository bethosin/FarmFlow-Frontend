// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green pt-5">
      <div className="container">
        <div className="row gy-4">
          {/* Brand & mission */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3">FarmFlow</h5>
            <p className="small opacity-75">
              Empowering farmers with direct market access, fair pricing, and
              reliable connections to buyers and transporters.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-semibold mb-3">Platform</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link
                  className="text-white text-decoration-none"
                  to="/listings"
                >
                  Marketplace
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="text-white text-decoration-none"
                  to="/price-board"
                >
                  Price Board
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  className="text-white text-decoration-none"
                  to="/register"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Roles */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold mb-3">Who We Serve</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">Farmers</li>
              <li className="mb-2">Buyers</li>
              <li className="mb-2">Transporters</li>
        
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">📧 support@farmflow.com</li>
              <li className="mb-2">📞 +234 800 000 0000</li>
              <li className="mb-2">📍 Nigeria</li>
            </ul>
          </div>
        </div>

        <hr className="border-light opacity-25 my-4" />

        {/* Bottom bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3 small opacity-75">
          <span>© {year} Farm Flow. All rights reserved.</span>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <Link className="text-white text-decoration-none" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="text-white text-decoration-none" to="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
