import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo;

  // If no user info or no token, redirect to login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Only allow access if user is admin or blogger
  if (userInfo.admin || userInfo.blogger) {
    return <Outlet />;
  }

  // Redirect all other users
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;