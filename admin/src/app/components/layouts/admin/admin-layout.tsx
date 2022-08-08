import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../../services/auth.service";

export const AdminLayout = () => {
  return isAuthenticated() ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
};
