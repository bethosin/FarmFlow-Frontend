import React from "react";
import { Link } from "react-router-dom";

const HomeImpact = () => {
  return (
    <>
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Why Farmers Choose FarmFlow</h2>
          <p className="text-muted mb-5">
            Built to reduce market inefficiencies and improve agricultural
            trade.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <h3 className="fw-bold text-green">Fair Pricing</h3>
              <p className="text-muted small">
                Transparent listings help farmers avoid exploitative middlemen.
              </p>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold text-green">Wider Reach</h3>
              <p className="text-muted small">
                Access buyers beyond local markets and regions.
              </p>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold text-green">Better Logistics</h3>
              <p className="text-muted small">
                Coordinate delivery with trusted transport partners.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-green text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">
            Ready to Trade Smarter in Agriculture?
          </h2>
          <p className="mb-4">
            Join FarmFlow today and become part of a more transparent food
            system.
          </p>
          <Link to="/register" className="btn btn-accent btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeImpact;
