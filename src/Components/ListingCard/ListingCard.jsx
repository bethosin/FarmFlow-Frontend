import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({
  id,
  image,
  title,
  category,
  price,
  unit,
  location,
  seller,
}) => {
  const displayImage =
    image || "https://via.placeholder.com/400x300?text=No+Image";

  const formattedPrice = price ? `₦${Number(price).toLocaleString()}` : "₦--";

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4">
      {/* Image */}
      <img
        src={displayImage}
        alt={title || "Listing image"}
        className="card-img-top"
        loading="lazy"
        style={{ height: "220px", objectFit: "cover" }}
      />

      {/* Body */}
      <div className="card-body d-flex flex-column">
        {category && (
          <span className="badge bg-success-subtle text-success align-self-start mb-2">
            {category}
          </span>
        )}

        <h5 className="card-title text-truncate" title={title}>
          {title || "Untitled"}
        </h5>

        <p className="text-muted small mb-2">
          📍 {location || "Unknown location"}
        </p>

        <p className="mb-3 small text-muted">
          Seller: <strong>{seller || "Unknown"}</strong>
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center gap-2 flex-wrap">
          <span className="fw-bold text-success">
            {formattedPrice} / {unit || "unit"}
          </span>

          <div className="d-flex gap-2">
            <Link
              to={`/listings/${id}`}
              className="btn btn-sm btn-outline-success"
            >
              View Details
            </Link>

            <Link
              to={`/buyer/place-order/${id}`}
              className="btn btn-sm btn-success"
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
