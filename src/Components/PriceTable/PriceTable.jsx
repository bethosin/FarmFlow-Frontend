import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const PriceTable = () => {
  const [prices, setPrices] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/prices")
      .then((res) => {
        setPrices(res.data.prices);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch prices:", err);
        setLoading(false);
      });
  }, []);

  const userRole = "user"; // or "admin"
  const filteredPrices =
    category === "All" ? prices : prices.filter((p) => p.category === category);

  return (
    <section className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h1 className="fw-bold">Price Board</h1>
          <p className="text-muted">
            Current market prices for crops and livestock. Updated regularly.
          </p>
        </div>

        <div className="alert alert-green d-flex align-items-center">
          <span className="me-2">ℹ️</span>
          <div className="small">
            Prices are indicative and may vary by location and quality.
          </div>
        </div>

        {/* Filter */}
        <div className="d-flex justify-content-end mb-3">
          <select
            className="form-select w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Crop</option>
            <option>Livestock</option>
          </select>
        </div>

        {/* Table */}
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Unit</th>
                  <th>Average Price (₦)</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      Loading prices...
                    </td>
                  </tr>
                ) : filteredPrices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No price data available.
                    </td>
                  </tr>
                ) : (
                  filteredPrices.map((price) => (
                    <tr key={price.id}>
                      <td>{price.product}</td>
                      <td>
                        <span className="badge bg-success-subtle text-green">
                          {price.category}
                        </span>
                      </td>
                      <td>{price.unit}</td>
                      <td className="fw-semibold text-green">
                        {Number(price.averagePrice).toLocaleString()}
                      </td>
                      <td className="text-muted small">
                        {moment(price.lastUpdated).fromNow()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Only */}
        {userRole === "admin" && (
          <div className="mt-3 small text-muted">
            <strong>Admin:</strong> Prices can be edited from the admin
            dashboard.
          </div>
        )}
      </div>
    </section>
  );
};

export default PriceTable;
