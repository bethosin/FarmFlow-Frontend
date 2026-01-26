import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/buyer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4">
      <h4 className="fw-bold mb-4">My Orders</h4>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-muted">You have no orders yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Amount (₦)</th>
                <th>Status</th>
                <th>Ordered On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.listing?.title || "—"}</td>
                  <td>{order.quantity}</td>
                  <td>₦{Number(order.totalAmount || 0).toLocaleString()}</td>
                  <td>
                    <span className="badge bg-secondary">{order.status}</span>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuyerOrder;
