import React, { useEffect, useState } from "react";
import axios from "axios";

const Buyer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/buyer/overview", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row g-4">
      {/* Orders */}
      <div className="col-lg-6" data-aos="fade-up">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">My Orders</h5>

          {!data ? (
            <p className="text-muted small mb-0">Loading...</p>
          ) : (
            <>
              <div className="d-flex gap-2 flex-wrap mb-3">
                <span className="badge bg-secondary-subtle text-secondary">
                  Total: {data?.ordersSummary?.totalOrders ?? "--"}
                </span>
                <span className="badge bg-warning-subtle text-warning">
                  Pending: {data?.ordersSummary?.pending ?? "--"}
                </span>
                <span className="badge bg-primary-subtle text-primary">
                  In Transit: {data?.ordersSummary?.inTransit ?? "--"}
                </span>
                <span className="badge bg-success-subtle text-success">
                  Completed: {data?.ordersSummary?.completed ?? "--"}
                </span>
              </div>

              <div className="small text-muted">
                <div className="fw-semibold mb-2">Recent Orders</div>
                <ul className="list-unstyled mb-0">
                  {data?.recentOrders?.length > 0 ? (
                    data.recentOrders.map((o) => (
                      <li key={o._id} className="mb-2">
                        <div className="fw-semibold">{o.item}</div>
                        <div className="text-muted small">
                          ₦{o.amount.toLocaleString()} • {o.status}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-muted small mb-0">No recent orders.</p>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Suppliers */}
      <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">Saved Suppliers</h5>

          {!data ? (
            <p className="text-muted small mb-0">Loading...</p>
          ) : data?.suppliers?.length > 0 ? (
            <ul className="list-unstyled mb-0 small">
              {data.suppliers.map((s) => (
                <li key={s._id} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{s.name}</div>
                      <div className="text-muted small">{s.location}</div>
                    </div>
                    {s.verified ? (
                      <span className="badge bg-success-subtle text-success">
                        Verified
                      </span>
                    ) : (
                      <span className="badge bg-secondary-subtle text-secondary">
                        Unverified
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted small mb-0">No saved suppliers yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buyer;
