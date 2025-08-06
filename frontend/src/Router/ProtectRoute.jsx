import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((store) => store.User);

  if (!userInfo) {
    return <Navigate to="/Submit" />;
  }

  return children;
};

export default ProtectedRoute;
