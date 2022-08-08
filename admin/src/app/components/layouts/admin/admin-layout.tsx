import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../../services/auth.service";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import { Sidenav } from "./components/sidenav";
import { SidebarProvider, useSidebar } from "./hooks/useSidebar";

const Layout = () => {
  const { toggled } = useSidebar();

  useEffect(() => {
    console.log(toggled);
  }, [toggled]);

  return (
    <div className={`sb-nav-fixed ${toggled ? "sb-sidenav-toggled" : ""}`}>
      <Navbar />
      <div id="layoutSidenav">
        <Sidenav />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export const AdminLayout = () => {
  return !isAuthenticated() ? (
    <Navigate to={{ pathname: "/" }} />
  ) : (
    <SidebarProvider>
      <Layout />
    </SidebarProvider>
  );
};
