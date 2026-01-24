import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Farmer = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/farmer/overview", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row g-4">
      {/* Listings */}
      <div className="col-lg-6" data-aos="fade-up">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">My Listings</h5>
          <p className="text-muted small mb-3">
            Crops and livestock you’ve listed on the platform.
          </p>

          {!data ? (
            <p className="text-muted small mb-0">Loading...</p>
          ) : (
            <>
              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-muted">Total Listings</span>
                <strong>{data?.stats?.myListings ?? "--"}</strong>
              </div>

              <div className="small text-muted mb-3">
                <div className="fw-semibold mb-2">Recent Listings</div>
                {Array.isArray(data?.recentListings) &&
                data.recentListings.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {data.recentListings.map((l) => (
                      <li key={l._id} className="mb-2">
                        <div className="fw-semibold">{l.title}</div>
                        <div className="text-muted small">
                          ₦{l.price.toLocaleString()} / {l.unit} • {l.status}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small mb-0">
                    No recent listings yet.
                  </p>
                )}
              </div>
            </>
          )}

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/add-list")}
          >
            Add New Listing
          </button>
        </div>
      </div>

      {/* Orders */}
      <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">Recent Orders</h5>

          {!data ? (
            <p className="text-muted small mb-0">Loading...</p>
          ) : Array.isArray(data?.recentOrders) &&
            data.recentOrders.length > 0 ? (
            <ul className="list-unstyled small mb-0">
              {data.recentOrders.map((o) => (
                <li key={o._id} className="mb-3">
                  <div className="fw-semibold">{o.item}</div>
                  <div className="text-muted small">Buyer: {o.buyer}</div>
                  <span className="badge bg-success-subtle text-success mt-1">
                    {o.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted small mb-0">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farmer;
