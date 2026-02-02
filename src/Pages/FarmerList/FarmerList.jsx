import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FarmerList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/farmer/my-listings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setListings(res.data.listings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    setDeletingId(id);

    axios
      .delete(`https://farmflow-backend-aizi.onrender.com/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setListings((prev) => prev.filter((l) => l._id !== id));
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete listing");
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

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
            <div className="card shadow-sm h-100 d-flex flex-column">
              <img
                src={listing.images[0] || "/placeholder.jpg"}
                alt={listing.title}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body flex-grow-1">
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

              {/* ✅ Buttons */}
              <div className="card-footer d-flex flex-wrap justify-content-between gap-2">
                <Link
                  to={`/listings/${listing._id}/edit`}
                  className="btn btn-sm btn-outline-primary w-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="btn btn-sm btn-outline-danger w-100"
                  disabled={deletingId === listing._id}
                >
                  {deletingId === listing._id ? "Deleting..." : " Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerList;
