// src/pages/dashboard/FarmerListings.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const FarmerList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        "https://farmflow-backend-aizi.onrender.com/api/farmer/my-listings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setListings(res.data.listings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-muted">Loading your listings...</p>;
  }

  if (!listings.length) {
    return (
      <div className="text-center text-muted py-5">
        <h5>No listings yet</h5>
        <p>You haven’t added any produce to the marketplace.</p>
        <Link to="/add-list" className="btn btn-primary">
          Add Listing
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">My Listings</h4>
      <div className="row g-4">
        {listings.map((listing) => (
          <div className="col-md-6 col-lg-4" key={listing._id}>
            <div className="card shadow-sm h-100">
              <img
                src={listing.images[0] || "/placeholder.jpg"}
                alt={listing.title}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <p className="card-text text-muted small mb-2">
                  {listing.category} | {listing.location}
                </p>
                <p className="fw-semibold mb-2">
                  ₦{listing.price.toLocaleString()} per {listing.unit}
                </p>
                <span className="badge bg-success-subtle text-success">
                  {listing.quantity} in stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerList;
