import React, { useEffect, useState } from "react";
import axios from "axios";

const TransporterEarnings = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        "https://farmflow-backend-aizi.onrender.com/api/transporter/transport-earnings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setStats(res.data.stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching earnings:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3 className="fw-bold text-green mb-4">Earnings Summary</h3>

      {loading ? (
        <p>Loading earnings...</p>
      ) : (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded text-center p-4">
              <h6 className="text-muted">Total Deliveries</h6>
              <h4 className="fw-bold text-success">{stats?.deliveries ?? 0}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded text-center p-4">
              <h6 className="text-muted">Active Jobs</h6>
              <h4 className="fw-bold text-success">{stats?.activeJobs ?? 0}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded text-center p-4">
              <h6 className="text-muted">Total Earnings</h6>
              <h4 className="fw-bold text-success">
                ₦{stats?.earnings?.toLocaleString() ?? 0}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransporterEarnings;
