import React from 'react'
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section
      className="text-white"
      style={{
        background:
          "linear-gradient(rgba(0,100,60,0.85), rgba(18, 139, 24, 0.85)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container section-padding">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <span className="badge bg-light text-green mb-3">
              Built for Nigerian Agriculture
            </span>

            <h1 className="fw-bold display-5 mb-3">
              Empowering Farmers.
              <br />
              Connecting Markets.
            </h1>

            <p className="lead mb-4">
              FarmFlow helps farmers sell directly to buyers, access fair market
              prices, and move produce efficiently across Nigeria.
            </p>

            <div className="d-flex gap-3 flex-wrap mb-3">
              <Link to="/register" className="btn btn-accent btn-lg">
                Get Started
              </Link>
              <Link to="/listings" className="btn btn-accent btn-lg">
                View Marketplace
              </Link>
            </div>

            <p className="small opacity-75">
              Trusted by farmers, buyers, and transporters nationwide
            </p>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src="https://i.pinimg.com/736x/ec/be/07/ecbe07eabb98f298a78001ef4892a3a0.jpg"
              alt="Farmer in field"
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeHero;

