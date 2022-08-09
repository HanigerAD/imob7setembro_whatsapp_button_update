import { Routes as RrdRoutes, Route } from "react-router-dom";
import { AdminLayout } from "../components/layouts/admin/admin-layout";
import { GuestLayout } from "../components/layouts/guest/guest-layout";
import { DashboardPage } from "../components/pages/dashboard/dashboard-page";
import { ImoveisPage } from "../components/pages/imoveis/imoveis-page";
import { ImovelPage } from "../components/pages/imoveis/imovel-page";
import { LoginPage } from "../components/pages/login/login-page";
import { PerfilPage } from "../components/pages/perfil/perfil-page";

export const Routes = () => (
  <RrdRoutes>
    <Route path="/" element={<GuestLayout />}>
      <Route index element={<LoginPage />} />
    </Route>

    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="imoveis/cadastrar" element={<ImovelPage />} />
      <Route path="imoveis/:code" element={<ImovelPage />} />
      <Route path="imoveis" element={<ImoveisPage />} />
      <Route path="perfil" element={<PerfilPage />} />
    </Route>
  </RrdRoutes>
);
