 import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";

import DashboardSidebar from "./DashboardSidebar ";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats ";
import DashboardContent from "./DashBoardContent";

// FARMER routes


import FarmerOrder from "../../Pages/FarmerList/FarmerOrder";
import FarmerEarning from "../../Pages/FarmerList/FarmerEarning";
import FarmerList from "../../Pages/FarmerList/FarmerList";
import BuyerOrder from "../../Pages/BuyerList/BuyerOrder";
import BuyerSupplier from "../../Pages/BuyerList/BuyerSupplier";
import TransporterDeliveries from "../../Pages/TransportList/TransporterDeliveries";
import TransporterEarnings from "../../Pages/TransportList/TransporterEarnings";

// ADMIN routes (example)
// import AdminUsers from "./Role/Admin/AdminUsers";
// import AdminListings from "./Role/Admin/AdminListings";
// import AdminTransactions from "./Role/Admin/AdminTransactions";

// Add more roles as needed (BUYER, TRANSPORTER, etc.)

const DashBoardLayout = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const overviewUrlByRole = {
    ADMIN: "https://farmflow-backend-aizi.onrender.com/api/admin/overview",
    FARMER: "https://farmflow-backend-aizi.onrender.com/api/farmer/overview",
    BUYER: "https://farmflow-backend-aizi.onrender.com/api/buyer/overview",
    TRANSPORTER: "https://farmflow-backend-aizi.onrender.com/api/transporter/overview",
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData = res.data.user;
        setUser(userData);

        const roleUrl = overviewUrlByRole[userData.role];
        if (!roleUrl) return;

        return axios.get(roleUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((roleRes) => {
        if (!roleRes) return;

        const d = roleRes.data;

        if (d.stats) {
          setStats(d.stats);
        } else if (d.ordersSummary) {
          setStats({
            orders: d.ordersSummary.totalOrders ?? 0,
            suppliers: d.suppliers?.length ?? 0,
            totalSpend: d.totalSpend ?? "--",
          });
        } else if (d.earnings) {
          setStats({
            deliveries: d.earnings.completedJobs ?? 0,
            activeJobs: d.activeDeliveries?.length ?? 0,
            earnings: d.earnings.total ?? 0,
          });
        } else {
          setStats({});
        }
      })
      .catch((err) => {
        console.error("Dashboard Error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate, token]);

 

  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-success mb-3" />
          <p className="text-muted small mb-0">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light-neutral">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 px-0">
            <DashboardSidebar role={user.role} />
          </div>

          {/* Main Content */}
          <div className="col-lg-10 px-4 py-4">
            <DashboardHeader user={user}  />

            {/* Always show stats */}
            <DashboardStats role={user.role} stats={stats} />

            {/* Dynamic role-based routes */}
            <Routes>
              {/* Default dashboard content (Overview) */}
              <Route index element={<DashboardContent role={user.role} />} />

              {/* FARMER Routes */}
              {user.role === "FARMER" && (
                <>
                  <Route path="my-listings" element={<FarmerList />} />
                  <Route path="orders" element={<FarmerOrder />} />
                  <Route path="earnings" element={<FarmerEarning />} />
                </>
              )}

              {/* BUYER Routes */}
              {user.role === "BUYER" && (
                <>
                  <Route path="orders" element={<BuyerOrder />} />
                  <Route path="suppliers" element={<BuyerSupplier />} />
                </>
              )}

              {/* ADMIN Routes */}
              {user.role === "ADMIN" && (
                <>
                  {/* <Route path="users" element={<AdminUsers />} />
                  <Route path="listings" element={<AdminListings />} />
                  <Route path="transactions" element={<AdminTransactions />} /> */}
                </>
              )}

              {/* TRANSPORTER Routes */}
              {user.role === "TRANSPORTER" && (
                <>
                  <Route path="deliveries" element={<TransporterDeliveries />} />
                  <Route path="transport-earnings" element={<TransporterEarnings />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
