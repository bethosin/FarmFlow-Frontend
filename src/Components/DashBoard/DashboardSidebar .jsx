import React from "react";
import { NavLink } from "react-router-dom";

const linksByRole = {
  ADMIN: [
    { label: "Overview", path: "/dashboard" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Listings", path: "/dashboard/listings" },
    { label: "Transactions", path: "/dashboard/transactions" },
  ],
  FARMER: [
    { label: "Overview", path: "/dashboard" },
    { label: "My Listings", path: "/dashboard/my-listings" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Earnings", path: "/dashboard/earnings" },
  ],
  BUYER: [
    { label: "Overview", path: "/dashboard" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Suppliers", path: "/dashboard/suppliers" },
  ],
  TRANSPORTER: [
    { label: "Overview", path: "/dashboard" },
    { label: "Deliveries", path: "/dashboard/deliveries" },
    { label: "Earnings", path: "/dashboard/transport-earnings" },
  ],
};

const DashboardSidebar = ({ role }) => {
   if (!role || !linksByRole[role]) {
     return (
       <aside className="bg-white h-100 border-end p-3">
         <p className="text-muted small">No role available</p>
       </aside>
     );
   }

  return (
    <aside className="bg-white h-100 border-end p-3">
      <h5 className="fw-bold mb-4 text-success">FarmFlow</h5>

      <ul className="list-unstyled">
        {linksByRole[role]?.map((item) => (
          <li key={item.label} className="mb-2">
            <NavLink
              to={item.path}
              className={({ isActive }) => {
                const baseClasses =
                  "d-block px-2 py-2 rounded text-decoration-none fw-semibold";

                if (item.label === "Overview") {
                  return `${baseClasses} ${
                    isActive ? "bg-green text-white" : "bg-green text-white"
                  }`;
                }

                return `${baseClasses} ${
                  isActive ? "bg-accent text-white" : "text-muted hover-accent"
                }`;
              }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
