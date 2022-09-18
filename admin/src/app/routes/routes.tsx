import { Routes as RrdRoutes, Route } from "react-router-dom";
import { AdminLayout } from "../components/layouts/admin/admin-layout";
import { GuestLayout } from "../components/layouts/guest/guest-layout";
import { BairroPage } from "../components/pages/bairros/bairro-page";
import { BairrosPage } from "../components/pages/bairros/bairros-page";
import { CidadePage } from "../components/pages/cidades/cidade-page";
import { CidadesPage } from "../components/pages/cidades/cidades-page";
import { CorretorPage } from "../components/pages/corretores/corretor-page";
import { CorretoresPage } from "../components/pages/corretores/corretores-page";
import { DashboardPage } from "../components/pages/dashboard/dashboard-page";
import { ImoveisPage } from "../components/pages/imoveis/imoveis-page";
import { ImovelPage } from "../components/pages/imoveis/imovel-page";
import { LoginPage } from "../components/pages/login/login-page";
import { PerfilPage } from "../components/pages/perfil/perfil-page";
import { PostagemPage } from "../components/pages/postagens/postagem-page";
import { PostagensPage } from "../components/pages/postagens/postagens-page";

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
      <Route path="postagens/cadastrar" element={<PostagemPage />} />
      <Route path="postagens/:code" element={<PostagemPage />} />
      <Route path="postagens" element={<PostagensPage />} />
      <Route path="corretores/cadastrar" element={<CorretorPage />} />
      <Route path="corretores/:code" element={<CorretorPage />} />
      <Route path="corretores" element={<CorretoresPage />} />
      <Route path="cidades/cadastrar" element={<CidadePage />} />
      <Route path="cidades/:code" element={<CidadePage />} />
      <Route path="cidades" element={<CidadesPage />} />
      <Route path="bairros/cadastrar" element={<BairroPage />} />
      <Route path="bairros/:code" element={<BairroPage />} />
      <Route path="bairros" element={<BairrosPage />} />
      <Route path="perfil" element={<PerfilPage />} />
    </Route>
  </RrdRoutes>
);
