import React from "react";

const HowItWorks = () => {
  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">How FarmFlow Works</h2>
          <p className="text-muted">
            A simple, transparent process for everyone in the supply chain.
          </p>
        </div>

        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="fs-1 mb-3">🧑🏾‍🌾</div>
            <h5 className="fw-bold">Farmers List Produce</h5>
            <p className="text-muted small">
              Farmers create listings, set prices, and showcase available
              produce to buyers nationwide.
            </p>
          </div>

          <div className="col-md-4">
            <div className="fs-1 mb-3">🛒</div>
            <h5 className="fw-bold">Buyers Purchase Directly</h5>
            <p className="text-muted small">
              Buyers compare listings, negotiate, and purchase directly from
              trusted farmers.
            </p>
          </div>

          <div className="col-md-4">
            <div className="fs-1 mb-3">🚚</div>
            <h5 className="fw-bold">Goods Are Delivered</h5>
            <p className="text-muted small">
              Transport partners help move produce safely and efficiently to its
              destination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
