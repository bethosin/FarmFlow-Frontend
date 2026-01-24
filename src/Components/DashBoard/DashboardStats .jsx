const DashboardStats = ({ role, stats }) => {
  const cards = {
    ADMIN: [
      { label: "Total Users", value: stats?.totalUsers ?? "--" },
      { label: "Active Listings", value: stats?.activeListings ?? "--" },
      { label: "Transactions", value: stats?.transactions ?? "--" },
    ],
    FARMER: [
      { label: "My Listings", value: stats?.myListings ?? "--" },
      { label: "Orders", value: stats?.orders ?? "--" },
      { label: "Revenue", value: stats?.revenue ?? "--" },
    ],
    BUYER: [
      { label: "Orders", value: stats?.orders ?? "--" },
      { label: "Suppliers", value: stats?.suppliers ?? "--" },
      { label: "Total Spend", value: stats?.totalSpend ?? "--" },
    ],
    TRANSPORTER: [
      { label: "Deliveries", value: stats?.deliveries ?? "--" },
      { label: "Active Jobs", value: stats?.activeJobs ?? "--" },
      { label: "Earnings", value: stats?.earnings ?? "--" },
    ],
  };

  const formatValue = (label, value) => {
    const isMoney = ["Revenue", "Total Spend", "Earnings"].includes(label);
    if (value === "--") return value;
    return isMoney ? `₦${Number(value).toLocaleString()}` : value;
  };

  return (
    <div className="row g-4 mb-5">
      {cards[role]?.map((item, i) => (
        <div
          className="col-md-4"
          key={i}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <div className="card border-0 shadow-sm p-4 rounded-4">
            <p className="text-muted small mb-1">{item.label}</p>
            <h3 className="fw-bold mb-0">
              {formatValue(item.label, item.value)}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
