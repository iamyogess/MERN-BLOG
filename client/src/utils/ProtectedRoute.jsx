import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo;

  // If user is admin or blogger, redirect them away
  if (userInfo?.admin || userInfo?.blogger) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Allow access to all other users
  return <Outlet />;
};

export default ProtectedRoute;
