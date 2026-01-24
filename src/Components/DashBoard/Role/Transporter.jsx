import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Transporter = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        "https://farmflow-backend-aizi.onrender.com/api/transporter/overview",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Always fallback to an array so .length and .map never crash
  const activeDeliveries = useMemo(() => data?.activeDeliveries ?? [], [data]);

  // ✅ Always fallback to object so reading fields won’t crash
  const earnings = useMemo(
    () => data?.earnings ?? { total: 0, thisMonth: 0, completedJobs: 0 },
    [data]
  );

  return (
    <div className="row g-4">
      {/* Active Deliveries */}
      <div className="col-lg-6" data-aos="fade-up">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">Active Deliveries</h5>

          {!data ? (
            <p className="text-muted small mb-0">Loading...</p>
          ) : activeDeliveries.length === 0 ? (
            <p className="text-muted small mb-0">No active deliveries.</p>
          ) : (
            <ul className="list-unstyled small mb-0">
              {activeDeliveries.map((d) => (
                <li key={d._id} className="mb-2">
                  <div className="fw-semibold">{d.item}</div>
                  <div className="text-muted">
                    {d.pickup} → {d.dropoff}
                  </div>
                  <span className="badge bg-success-subtle text-success mt-1">
                    {d.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Earnings */}
      <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">Earnings</h5>

          {!data ? (
            <p className="text-muted small mb-0">Loading...</p>
          ) : (
            <div className="small text-muted">
              <div className="d-flex justify-content-between mb-2">
                <span>Total Earnings</span>
                <strong className="text-success">
                  ₦{Number(earnings.total).toLocaleString()}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>This Month</span>
                <strong className="text-success">
                  ₦{Number(earnings.thisMonth).toLocaleString()}
                </strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Completed Jobs</span>
                <strong>{earnings.completedJobs}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transporter;
