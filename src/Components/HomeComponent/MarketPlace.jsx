import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MarketPlace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/listings")
      .then((res) => {
        // Only take first 3 listings for homepage preview
        setListings(res.data.listings.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch listings:", err);
        setLoading(false);
      });
  }, []);

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

        {/* Listings Preview */}
        <div className="row g-4">
          {loading ? (
            <p className="text-muted">Loading listings...</p>
          ) : listings.length === 0 ? (
            <p className="text-muted">No listings available right now.</p>
          ) : (
            listings.map((listing, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={listing._id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <img
                    src={listing.images?.[0] || "/placeholder.jpg"}
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
                      {listing.description?.slice(0, 80)}...
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <strong className="text-green">
                        ₦{listing.price.toLocaleString()} / {listing.unit}
                      </strong>

                      <Link
                        to={`/listings/${listing._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketPlace;
