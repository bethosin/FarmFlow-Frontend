import React from "react";

const features = [
  {
    icon: "🌾",
    title: "Direct Market Access",
    description:
  
  "Sell crops and livestock directly to verified buyers without unnecessary middlemen or price manipulation.",
  },
  {
    icon: "💰",
    title: "Fair Pricing",
    description:
      "Transparent pricing helps farmers get fair value for their produce.",
  },
  {
    icon: "🚚",
    title: "Logistics Support",
    description:
      "Easily connect with trusted transporters to move goods quickly and safely.",
  },
  {
    icon: "📩",
    title: "Easy Communication",
    description:
      "Built-in messaging makes negotiation and coordination simple.",
  },
];

const Feature = () => {
  return (
    <section className="section-padding bg-light-neutral">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why FarmFlow</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Everything farmers and buyers need trading, pricing, logistics,
            and communication  all in one simple platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 text-center p-4 border-0 shadow-sm rounded-4">
                <div className="mb-3 fs-1" aria-label={feature.title}>
                  {feature.icon}
                </div>
                <h5 className="card-title fw-semibold">{feature.title}</h5>
                <p className="card-text text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
