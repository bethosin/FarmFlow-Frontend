import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch orders on mount
  useEffect(() => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/farmer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Get dynamic badge color
  const getBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning-subtle text-warning";
      case "Processing":
        return "bg-info-subtle text-info";
      case "Completed":
        return "bg-success-subtle text-success";
      case "Cancelled":
        return "bg-danger-subtle text-danger";
      default:
        return "bg-secondary-subtle text-secondary";
    }
  };

  // Update order status
  const handleStatusChange = (orderId, newStatus) => {
    axios
      .patch(
        `http://localhost:5501/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        console.log("Status updated successfully");
      })
      .catch((err) => {
        console.error("Failed to update status", err);
        alert("Error updating order status");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" />
        <p className="text-muted small">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h5 className="fw-bold mb-3">My Orders</h5>

      {orders.length === 0 ? (
        <p className="text-muted small mb-0">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Item</th>
                <th>Buyer</th>
                <th>Status</th>
                <th>Update</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="fw-semibold">{order.item}</td>
                  <td>{order.buyer?.name || order.buyer || "N/A"}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      disabled={["Completed", "Cancelled"].includes(
                        order.status
                      )}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="text-muted small">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "--"}
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

export default FarmerOrder;
