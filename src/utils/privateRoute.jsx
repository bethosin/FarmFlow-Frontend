// src/utils/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const privateRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default privateRoute;
