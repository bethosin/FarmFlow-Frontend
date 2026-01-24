import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Market from "./Pages/Market/Market";
import Footer from "./Components/Footer/Footer";
import GetStarted from "./Components/RegisterComponent/GetStarted";
import Signin from "./Components/LoginComponent/Signin";
import PriceTable from "./Components/PriceTable/PriceTable";
import Listing from "./Pages/Listing/Listing";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import AllDashboard from "./Components/DashBoard/AllDashboard";


import { AuthProvider } from "./AuthContext";
import PlaceOrder from "./Pages/BuyerList/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FarmAddList from "./Pages/FarmerList/FarmAddList";



const App = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Navbar />

      {/* 👇 Main Route Content with animation */}
      <div className={animate ? "page-enter" : ""}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Market />} />
          <Route path="/register" element={<GetStarted />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/price-board" element={<PriceTable />} />
          <Route path="/listings/:id" element={<Listing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard/*" element={<AllDashboard />} />
          <Route path="/add-list" element={<FarmAddList />} />
          <Route path="/buyer/place-order/:id" element={<PlaceOrder />} />
        </Routes>
      </div>

      <Footer />

      {/* ✅ Toast should be rendered at root level */}
      <ToastContainer position="top-right" autoClose={1500} />
    </AuthProvider>
  );
};

export default App;
