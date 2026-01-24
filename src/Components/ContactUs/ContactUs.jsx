import React from "react";

const ContactUs = () => {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section
        className="d-flex align-items-center text-white"
        style={{
          minHeight: "80vh",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://i.pinimg.com/736x/a7/34/cb/a734cb6366fc5d82d16f6d8c66e65d96.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h1 className="fw-bold display-5 mb-3">Get in Touch</h1>
              <p className="lead mb-4">
                Whether you’re a farmer, buyer, or logistics partner, our team
                is here to support you and answer your questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* ===== IMAGE / INFO ===== */}
            <div className="col-lg-6">
              <img
                src="https://i.pinimg.com/1200x/ae/59/f0/ae59f0175d9eb3717b8a5b6b0291f4e1.jpg"
                alt="Customer support"
                className="img-fluid rounded-4 shadow-sm mb-4"
              />

              <h5 className="fw-bold mb-3">We will Love to Hear From You</h5>
              <p className="text-muted">
                Reach out to us for general inquiries, partnership
                opportunities, or technical support. We aim to respond to all
                messages within 24 hours.
              </p>

              <ul className="list-unstyled text-muted small">
                <li className="mb-2">📧 support@farmflow.com</li>
                <li className="mb-2">📍 Nigeria (Serving nationwide)</li>
                <li className="mb-2">⏱ Response time: within 24 hours</li>
              </ul>
            </div>

            {/* ===== CONTACT FORM ===== */}
            <div className="col-lg-6">
              <div className="card p-4 p-md-5 border-0 shadow-sm rounded-4">
                <h4 className="fw-bold mb-4">Send Us a Message</h4>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Send Message
                    </button>
                  </div>

                  <p className="text-muted small mt-3 mb-0">
                    By submitting this form, you agree to be contacted by the
                    Farm Flow team.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
