import { Navigate, Routes as RrdRoutes, Route } from "react-router-dom";
import { AdminLayout } from "../components/layouts/admin/admin-layout";
import { GuestLayout } from "../components/layouts/guest/guest-layout";
import { DashboardPage } from "../components/pages/dashboard/dashboard-page";
import { LoginPage } from "../components/pages/login/login-page";
import { isAuthenticated } from "../services/auth.service";

export const Routes = () => (
  <RrdRoutes>
    <Route path="/" element={<GuestLayout />}>
      <Route index element={<LoginPage />} />
    </Route>

    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<DashboardPage />} />
    </Route>
  </RrdRoutes>
);
