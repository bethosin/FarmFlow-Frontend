import React, { useEffect, useState } from "react";
import axios from "axios";

const BuyerSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/buyer/suppliers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuppliers(res.data.suppliers || []);
      })
      .catch((err) => {
        console.error("Failed to fetch suppliers", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4">My Suppliers</h2>

      {loading ? (
        <p className="text-muted">Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <p className="text-muted">No suppliers found yet.</p>
      ) : (
        <div className="row g-4">
          {suppliers.map((supplier) => (
            <div className="col-md-4" key={supplier._id}>
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h5 className="card-title mb-1">{supplier.name}</h5>
                  <p className="text-muted small mb-0">
                    Supplier ID: {supplier._id}
                  </p>
                  {/* You can link to messaging or profile if needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BuyerSupplier;
