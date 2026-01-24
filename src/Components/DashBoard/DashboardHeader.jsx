const DashboardHeader = ({ user, onLogout }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="fw-bold mb-1">Welcome, {user.firstName}</h2>
        <p className="text-muted mb-0">Here’s a summary of your account</p>
      </div>

      
    </div>
  );
};

export default DashboardHeader;
