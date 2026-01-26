import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../ListingCard/ListingCard";

const Market = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch real listings from backend
  useEffect(() => {
    setLoading(true);

    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/listings") 
      .then((res) => {
        setListings(res.data.listings);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);

  // Dynamically extract unique categories and locations
  const uniqueCategories = [
    "All",
    ...new Set(listings.map((item) => item.category).filter(Boolean)),
  ];

  const uniqueLocations = [
    "All",
    ...new Set(listings.map((item) => item.location).filter(Boolean)),
  ];

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      `${item.seller?.firstName ?? ""} ${item.seller?.lastName ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory = category === "All" || item.category === category;
    const matchesLocation =
      location === "All" ||
      item.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <section className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h1 className="fw-bold">Marketplace</h1>
          <p className="text-muted">
            Browse crops and livestock directly from verified farmers.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-3 mb-4 border-0 shadow-sm">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search produce or farmers"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 d-grid">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setLocation("All");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <p className="text-muted">Loading listings...</p>
        ) : filteredListings.length === 0 ? (
          <p className="text-muted">No listings found matching your filters.</p>
        ) : (
          <div className="row g-4">
            {filteredListings.map((listing) => (
              <div className="col-12 col-sm-6 col-lg-4" key={listing._id}>
                <ListingCard
                  id={listing._id}
                  image={listing.images?.[0]}
                  title={listing.title}
                  category={listing.category}
                  price={listing.price}
                  unit={listing.unit}
                  location={listing.location}
                  seller={
                    listing.seller
                      ? `${listing.seller.firstName} ${listing.seller.lastName}`
                      : "Unknown"
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Market;
