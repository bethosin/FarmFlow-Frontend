// Listing.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ListingDetail from "../../Components/ListingComponent/ListingDetail";

const Listing = () => {
  const { id } = useParams(); // ✅ Get ID here
  return <ListingDetail id={id} />;
};

export default Listing;
