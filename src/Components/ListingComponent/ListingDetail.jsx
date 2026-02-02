import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Added
  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderError, setOrderError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://farmflow-backend-aizi.onrender.com/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.listing;
        setListing(data);
        setActiveImage(data.images?.[0] || "");
      })
      .catch((err) => {
        console.error("Failed to fetch listing:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatPostedDate = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "1 day ago";
    return `${diff} days ago`;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderError("");

    axios
      .post(
        "https://farmflow-backend-aizi.onrender.com/api/buyer/place-orders",
        { listingId: id, quantity: parseInt(quantity) },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        toast.success("Order placed successfully!");
        setShowOrderForm(false);
        setQuantity(1);
      })
      .catch((err) => {
        console.error("Order error:", err);
        setOrderError(err.response?.data?.message || "Order failed");
      });
  };

  // ✅ Delete handler
  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?",
    );
    if (!confirm) return;

    axios
      .delete(`https://farmflow-backend-aizi.onrender.com/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Listing deleted successfully");
        navigate("/dashboard/my-listings");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete listing");
      });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container">
          <p className="text-muted">Loading listing...</p>
        </div>
      </section>
    );
  }

  if (!listing) {
    return (
      <section className="section-padding">
        <div className="container">
          <p className="text-danger">Listing not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div className="row g-4">
          {/* Image Gallery */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm overflow-hidden">
              <img
                src={activeImage || "/placeholder.jpg"}
                alt={listing.title}
                className="img-fluid"
                style={{ height: 420, objectFit: "cover" }}
              />
            </div>

            <div className="row g-3 mt-3">
              {listing.images?.map((img, index) => (
                <div className="col-4" key={index}>
                  <img
                    src={img}
                    alt="Thumbnail"
                    className={`img-fluid rounded-3 shadow-sm ${
                      activeImage === img ? "border border-success" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      height: 100,
                      objectFit: "cover",
                    }}
                    onClick={() => setActiveImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="col-lg-5">
            <span className="badge bg-success-subtle text-success mb-2">
              {listing.category}
            </span>

            <h1 className="fw-bold mt-2">{listing.title}</h1>
            <p className="text-muted">{listing.description}</p>

            <h3 className="text-green fw-bold mb-3">
              ₦{listing.price.toLocaleString()} / {listing.unit}
            </h3>

            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                📍 <strong>Location:</strong> {listing.location}
              </li>
              <li className="mb-2">
                📦 <strong>Quantity:</strong> {listing.quantity}
              </li>
              <li className="mb-2">
                🚚 <strong>Delivery:</strong> {listing.delivery}
              </li>
              <li>
                📅 <strong>Posted:</strong>{" "}
                {formatPostedDate(listing.createdAt)}
              </li>
            </ul>

            <div className="d-grid gap-2 mb-3">
              <button className="btn btn-primary btn-lg">Contact Seller</button>
              <button className="btn btn-outline-success btn-lg">
                Save Listing
              </button>
              {user?.role === "BUYER" && (
                <button
                  className="btn btn-accent btn-lg"
                  onClick={() => setShowOrderForm(!showOrderForm)}
                >
                  {showOrderForm ? "Cancel Order" : "Place Order"}
                </button>
              )}

              {/* ✅ Only show if user is the seller */}
              {user?._id === listing.seller._id && (
                <>
                  <button
                    className="btn btn-warning btn-lg"
                    onClick={() => navigate(`/listings/${listing._id}/edit`)}
                  >
                    Edit Listing
                  </button>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={handleDelete}
                  >
                    Delete Listing
                  </button>
                </>
              )}
            </div>

            {showOrderForm && (
              <form onSubmit={handlePlaceOrder} className="mt-3">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                    required
                  />
                </div>
                {orderError && (
                  <p className="text-danger small">{orderError}</p>
                )}
                <button type="submit" className="btn btn-success">
                  Confirm Order
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Seller Info */}
        <div className="card mt-5 border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                style={{ width: 56, height: 56 }}
              >
                👨🏾‍🌾
              </div>
              <div>
                <h5 className="mb-0">
                  {listing.seller.firstName} {listing.seller.lastName}
                </h5>
                <small className="text-muted">
                  {listing.seller.verified ? "Verified Farmer" : "Farmer"}
                </small>
              </div>
            </div>

            <p className="text-muted mb-3">
              {listing.seller.bio || "No bio available."}
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Link to="/messages" className="btn btn-success">
                Message Seller
              </Link>
              <Link to="/price-board" className="btn btn-outline-secondary">
                View Market Prices
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingDetail;
