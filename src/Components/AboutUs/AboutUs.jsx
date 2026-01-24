import React from "react";

const AboutUs = () => {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section
        className="d-flex align-items-center text-white"
        style={{
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://i.pinimg.com/736x/59/73/e0/5973e099147f06a5a14dbb3846fab840.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h1 className="fw-bold display-4 mb-3">
                Empowering Agriculture Through Connection
              </h1>
              <p className="lead mb-4">
                Farm Flow connects farmers, buyers, and logistics partners on
                one trusted platform making agricultural trade transparent,
                efficient, and profitable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">Our Story</h2>
              <p className="text-muted">
                Across Nigeria, farmers produce quality crops and livestock but
                often struggle with unfair pricing, limited access to buyers,
                and unreliable logistics. Farm Flow was built to solve these
                challenges by using technology to create visibility, trust, and
                direct market access.
              </p>
            </div>
          </div>

          {/* ===== MISSION / VISION / VALUES ===== */}
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center shadow-sm border-0 rounded-4">
                <div className="fs-1 mb-3">🌾</div>
                <h5 className="fw-bold">Our Mission</h5>
                <p className="text-muted">
                  To empower farmers with direct access to markets and fair
                  pricing while improving agricultural supply chains.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 text-center shadow-sm border-0 rounded-4">
                <div className="fs-1 mb-3">👁️</div>
                <h5 className="fw-bold">Our Vision</h5>
                <p className="text-muted">
                  A transparent and efficient agricultural marketplace where
                  everyone trades with confidence.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 text-center shadow-sm border-0 rounded-4">
                <div className="fs-1 mb-3">🤝</div>
                <h5 className="fw-bold">Our Values</h5>
                <p className="text-muted">
                  Trust, fairness, sustainability, and community-driven growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">How Farm Flow Works</h2>
              <p className="text-muted">
                We bring all key players in agricultural trade onto one simple
                and secure platform.
              </p>
            </div>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="fs-1 mb-3">🧑‍🌾</div>
              <h6 className="fw-bold">Farmers List Produce</h6>
              <p className="text-muted small">
                Farmers list crops and livestock, set prices, and reach buyers
                beyond their local markets.
              </p>
            </div>

            <div className="col-md-4">
              <div className="fs-1 mb-3">🛒</div>
              <h6 className="fw-bold">Buyers Purchase Directly</h6>
              <p className="text-muted small">
                Buyers source directly from verified farmers, ensuring quality
                and fair pricing.
              </p>
            </div>

            <div className="col-md-4">
              <div className="fs-1 mb-3">🚚</div>
              <h6 className="fw-bold">Logistics Deliver</h6>
              <p className="text-muted small">
                Trusted transport partners move goods safely and on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-9">
              <h2 className="fw-bold mb-3">Our Impact</h2>
              <p className="text-muted mb-4">
                Farm Flow is helping improve farmer income, reduce post-harvest
                losses, and strengthen food supply chains across Nigeria.
              </p>

              <div className="row g-4">
                <div className="col-md-4">
                  <h3 className="fw-bold text-green">+40%</h3>
                  <p className="text-muted small">Average income improvement</p>
                </div>
                <div className="col-md-4">
                  <h3 className="fw-bold text-green">1,000+</h3>
                  <p className="text-muted small">
                    Active marketplace listings
                  </p>
                </div>
                <div className="col-md-4">
                  <h3 className="fw-bold text-green">Nationwide</h3>
                  <p className="text-muted small">Reach across Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
