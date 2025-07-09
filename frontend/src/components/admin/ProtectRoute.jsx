
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  console.log("I am user from ProtectRoute:", user?.role);

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoute;
