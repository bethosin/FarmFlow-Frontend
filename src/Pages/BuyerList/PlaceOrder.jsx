import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Load Listings and Orders
  useEffect(() => {
    axios
      .get("http://localhost:5501/api/listings")
      .then((res) => setListings(res.data.listings))
      .catch((err) => console.error("Listings Error", err));

    axios
      .get("http://localhost:5501/api/buyer/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.error("Orders Error", err));
  }, []);

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (!selectedListing || quantity <= 0) {
      return setMessage("Please select a listing and valid quantity.");
    }

    setLoading(true);
    setMessage("");

    axios
      .post(
        "https://farmflow-backend-aizi.onrender.com/api/buyer/place-orders",
        {
          listingId: selectedListing,
          quantity: parseInt(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setMessage("✅ Order placed successfully!");
        setOrders((prev) => [...prev, res.data.order]);
        setQuantity(1);
        setSelectedListing("");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || " Order failed.";
        setMessage(msg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4">Place an Order</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Select Item</label>
          <select
            className="form-select"
            value={selectedListing}
            onChange={(e) => setSelectedListing(e.target.value)}
          >
            <option value="">Choose listing...</option>
            {listings.map((l) => (
              <option key={l._id} value={l._id}>
                {l.title} – ₦{l.price} per {l.unit} (Available: {l.quantity})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-semibold">Quantity</label>
          <input
            type="number"
            className="form-control"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button
            className="btn btn-accent w-100"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing..." : "Order"}
          </button>
        </div>
      </div>

      <hr />

      <h4 className="fw-semibold mt-5 mb-3">My Orders</h4>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.listing?.title || "—"}</td>
                <td>{order.quantity}</td>
                <td>₦{order.totalAmount}</td>
                <td>{order.status || "Pending"}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default PlaceOrder;
