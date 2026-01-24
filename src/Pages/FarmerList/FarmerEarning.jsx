import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerEarning = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/farmer/earnings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEarnings(res.data.earnings);
      })
      .catch((err) => {
        console.error("Earnings Fetch Error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4">
      <h4 className="fw-bold mb-3">Earnings Overview</h4>

      {loading ? (
        <div className="text-muted small">Loading earnings...</div>
      ) : earnings ? (
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="rounded-4 p-4 text-white"
              style={{ backgroundColor: "var(--primary-green)" }}
            >
              <p className="mb-1 fw-semibold small">Total Earnings</p>
              <h3 className="fw-bold mb-0">
                ₦{earnings.total.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="rounded-4 p-4 text-white"
              style={{ backgroundColor: "var(--accent-orange)" }}
            >
              <p className="mb-1 fw-semibold small">This Month</p>
              <h3 className="fw-bold mb-0">
                ₦{earnings.thisMonth.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted small">No earnings data available.</p>
      )}
    </div>
  );
};

export default FarmerEarning;
