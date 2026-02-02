import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditListing = () => {
  const { id } = useParams();
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
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch listing by ID
  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://farmflow-backend-aizi.onrender.com/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.listing;
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          unit: data.unit,
          quantity: data.quantity,
          category: data.category,
          location: data.location,
          delivery: data.delivery,
        });
      })
      .catch((err) => {
        console.error("Failed to load listing:", err);
        setError("Failed to load listing");
      });
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  // ✅ Upload image to backend (base64)
  const uploadImage = () => {
    return axios
      .post("https://farmflow-backend-aizi.onrender.com/api/upload", {
        file: imageBase64,
      })
      .then((res) => res.data.imageUrl)
      .catch((err) => {
        console.error("Upload error", err);
        setError("Image upload failed");
        return null;
      });
  };

  // ✅ Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const updateData = () => {
      const payload = { ...form };
      if (imageBase64) {
        uploadImage().then((imageUrl) => {
          if (!imageUrl) {
            setSubmitting(false);
            return;
          }
          payload.images = [imageUrl];
          sendUpdate(payload);
        });
      } else {
        sendUpdate(payload);
      }
    };

    const sendUpdate = (payload) => {
      axios
        .put(
          `https://farmflow-backend-aizi.onrender.com/api/listings/${id}`,
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
          setError("Failed to update listing.");
        })
        .finally(() => setSubmitting(false));
    };

    updateData();
  };

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-green">Edit Listing</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-4">
        {/* Standard Input Fields */}
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
              value={form[name]}
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
            value={form.category}
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
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Upload Image */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">Upload New Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {/* Preview */}
        {imageBase64 && (
          <div className="col-md-6">
            <label className="form-label fw-semibold d-block">Preview</label>
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
            {submitting ? "Updating..." : "Update Listing"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditListing;
