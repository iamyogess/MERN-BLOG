import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userState = useSelector((state) => state.user);

  if (userState?.userInfo.admin) {
    return <Outlet />;
  }
  return <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
