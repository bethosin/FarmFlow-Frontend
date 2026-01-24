import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddList = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    unit: "",
    quantity: "",
    category: "",
    location: "",
    delivery: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      ...form,
      images: [], // ✅ Send empty array to satisfy backend
    };

    axios
      .post(
        "https://farmflow-backend-aizi.onrender.com/api/listings",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => navigate("/dashboard/my-listings"))
      .catch((err) => {
        console.error(err);
        setError("Failed to create listing.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-green">Add New Listing</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-4">
        {/* Fields */}
        {[
          { name: "title", label: "Title", type: "text" },
          { name: "price", label: "Price (₦)", type: "number" },
          { name: "quantity", label: "Quantity", type: "number" },
          { name: "unit", label: "Unit", type: "text" },
          { name: "location", label: "Location", type: "text" },
          { name: "delivery", label: "Delivery", type: "text" },
        ].map(({ name, label, type }) => (
          <div className="col-md-6" key={name}>
            <label className="form-label fw-semibold">{label}</label>
            <input
              name={name}
              type={type}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Category</label>
          <select
            name="category"
            className="form-select"
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="Crops">Crops</option>
            <option value="Livestock">Livestock</option>
            <option value="Poultry">Poultry</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-12">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-accent btn-lg w-100"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Listing"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddList;
