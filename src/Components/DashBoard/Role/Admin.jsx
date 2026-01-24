import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://farmflow-backend-aizi.onrender.com/api/admin/overview", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row g-4">
      <div className="col-lg-6" data-aos="fade-up">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">Platform Activity</h5>

          {!data ? (
            <div className="text-muted small">Loading...</div>
          ) : (
            <>
              <p className="text-muted small mb-2">
                Total Users: <strong>{data.stats.totalUsers}</strong>
              </p>
              <ul className="list-unstyled small text-muted mb-0">
                <li>• New user registrations: {data.stats.newUsersToday}</li>
                <li>• New listings posted: {data.stats.activeListings}</li>
                <li>• Completed transactions: {data.stats.transactions}</li>
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h5 className="fw-bold mb-3">Admin Actions</h5>

          <div className="d-flex flex-column gap-2">
            <button className="btn btn-outline-success">Manage Users</button>
            <button className="btn btn-outline-success">Review Listings</button>
            <button className="btn btn-outline-danger">Flag Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
