import React, { useEffect, useState } from "react";
import axios from "axios";

const TransporterDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        "https://farmflow-backend-aizi.onrender.com/api/transporter/deliveries",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setDeliveries(res.data.deliveries);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deliveries:", err);
        setLoading(false);
      });
  }, []);

  const active = deliveries.filter((d) => d.status !== "Delivered");
  const completed = deliveries.filter((d) => d.status === "Delivered");

  return (
    <div>
      <h3 className="fw-bold text-green mb-4">My Deliveries</h3>

      {loading ? (
        <p>Loading deliveries...</p>
      ) : (
        <>
          {/* Active */}
          <section className="mb-5">
            <h5 className="fw-semibold text-green mb-3">Active Deliveries</h5>
            {active.length === 0 ? (
              <p className="text-muted">No active deliveries</p>
            ) : (
              <div className="list-group">
                {active.map((delivery) => (
                  <div
                    key={delivery._id}
                    className="list-group-item border-0 shadow-sm mb-2 rounded"
                  >
                    <strong>{delivery.listing.title}</strong> —{" "}
                    {delivery.status}
                    <div className="text-muted small">
                      Buyer: {delivery.buyerName}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Completed */}
          <section>
            <h5 className="fw-semibold text-green mb-3">Delivered Jobs</h5>
            {completed.length === 0 ? (
              <p className="text-muted">No completed deliveries</p>
            ) : (
              <div className="list-group">
                {completed.map((delivery) => (
                  <div
                    key={delivery._id}
                    className="list-group-item border-0 shadow-sm mb-2 rounded bg-light"
                  >
                    <strong>{delivery.listing.title}</strong>
                    <div className="text-muted small">
                      Delivered on{" "}
                      {new Date(delivery.deliveryDate).toLocaleDateString()}
                    </div>
                    <div>💰 Fee: ₦{delivery.deliveryFee.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default TransporterDeliveries;
