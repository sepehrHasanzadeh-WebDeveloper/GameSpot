import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { userInfo } = useSelector((store) => store.User);
  if (!userInfo) {
    return <Navigate to={"/Submit"} />;
  }
  if (userInfo.role !== "admin") {
    return <Navigate to={"/"} />;
  }
  return children;
}
export default AdminRoute;
