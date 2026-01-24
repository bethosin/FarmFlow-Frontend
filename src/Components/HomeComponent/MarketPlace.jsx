import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const previewListings = [
  {
    id: 1,
    title: "Fresh Yellow Maize",
    category: "Maize",
    price: "₦45,000 / bag",
    description: "Bulk supply available directly from local farmers.",
    image: "https://images.unsplash.com/photo-1602524202855-6bd8c36b9c1a",
  },
  {
    id: 2,
    title: "Organic Cassava Tubers",
    category: "Cassava",
    price: "₦38,000 / ton",
    description: "Harvested weekly and ready for processing.",
    image: "https://images.unsplash.com/photo-1582515073490-dc798b83add3",
  },
  {
    id: 3,
    title: "Grade A Tomatoes",
    category: "Tomatoes",
    price: "₦22,000 / basket",
    description: "Fresh produce suitable for markets and restaurants.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
];

const MarketPlace= () => {
 
  return (
    <section className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h2 className="fw-bold mb-1">Marketplace</h2>
            <p className="text-muted mb-0">
              Explore fresh produce listed by verified farmers across Nigeria.
            </p>
          </div>

          <Link to="/listings" className="btn btn-primary">
            View All Listings
          </Link>
        </div>

        {/* Preview Cards */}
        <div className="row g-4">
          {previewListings.map((listing, index) => (
            <div
              className="col-md-6 col-lg-4"
              key={listing.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <img
                  src={listing.image}
                  className="card-img-top"
                  alt={listing.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <span className="badge bg-green-subtle text-green mb-2 align-self-start">
                    {listing.category}
                  </span>

                  <h5 className="card-title">{listing.title}</h5>

                  <p className="card-text text-muted flex-grow-1">
                    {listing.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <strong className="text-green">{listing.price}</strong>

                    <Link
                      to="/listings"
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPlace;
