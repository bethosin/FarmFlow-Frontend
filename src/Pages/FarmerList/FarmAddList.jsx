import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FarmAddList = () => {
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
  const [imageBase64, setImageBase64] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Convert image to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  // ✅ Upload base64 image to backend
  const uploadImage = async () => {
    if (!imageBase64) return null;
    try {
      const res = await axios.post(
        "https://farmflow-backend-aizi.onrender.com/api/upload",
        {
          file: imageBase64,
        },
      );
      return res.data.imageUrl;
    } catch (err) {
      console.error("Upload error", err);
      setError("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    let imageUrl = "";

    // ✅ Upload image if present
    if (imageBase64) {
      imageUrl = await uploadImage();
      if (!imageUrl) {
        setSubmitting(false);
        return;
      }
      setUploadedImageUrl(imageUrl);
    }

    const payload = {
      ...form,
      images: imageUrl ? [imageUrl] : [], // Send uploaded image URL
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

        {/* ✅ File Upload */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {/* ✅ Image Preview */}
        {imageBase64 && (
          <div className="col-md-6">
            <label className="form-label d-block fw-semibold">Preview</label>
            <img
              src={imageBase64}
              alt="Preview"
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
          </div>
        )}

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

export default FarmAddList;
