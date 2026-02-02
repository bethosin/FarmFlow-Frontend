import React, { useEffect, useState, useContext } from "react";
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
import AuthContext from "./AuthContext"; // ✅ added
import PlaceOrder from "./Pages/BuyerList/PlaceOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import FarmAddList from "./Pages/FarmerList/FarmAddList";
import PrivateRoute from "./utils/privateRoute";
import EditListing from "./Pages/FarmerList/EditListing";

const AppContent = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(true);
  const { loading } = useContext(AuthContext); // ✅ check loading state

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    // ✅ Wait until auth state is ready
    return (
      <div className="text-center mt-5">
        <p className="fw-bold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
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
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <AllDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/listings/:id/edit"
            element={
              <PrivateRoute>
                <EditListing />
              </PrivateRoute>
            }
          />
          <Route path="/add-list" element={<FarmAddList />} />
          <Route path="/buyer/place-order/:id" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
