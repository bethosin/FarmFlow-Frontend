import React from "react";
import AdminSection from "./Role/Admin";
import FarmerSection from "./Role/Farmer";
import BuyerSection from "./Role/Buyer";
import TransporterSection from "./Role/Transporter";

const DashboardContent = ({ role }) => {
  if (role === "ADMIN") return <AdminSection />;
  if (role === "FARMER") return <FarmerSection />;
  if (role === "BUYER") return <BuyerSection />;
  if (role === "TRANSPORTER") return <TransporterSection />;

  return null;
};

export default DashboardContent;
