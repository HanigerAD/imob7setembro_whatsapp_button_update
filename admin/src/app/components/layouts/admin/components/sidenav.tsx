import { Link } from "react-router-dom";

export const Sidenav = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            {/* <div className="sb-sidenav-menu-heading">Core</div> */}
            <Link className="nav-link" to="/admin">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Painel
            </Link>

            <Link className="nav-link" to="/admin/imoveis">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Imóveis
            </Link>

            <Link className="nav-link" to="/admin/blog">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Blog
            </Link>

            <button
              className="btn btn-link nav-link collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseConfiguracoes"
              aria-expanded="false"
              aria-controls="collapseConfiguracoes"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-book-open"></i>
              </div>
              Configurações
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </button>
            <div
              className="collapse"
              id="collapseConfiguracoes"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                className="sb-sidenav-menu-nested nav"
                id="sidenavAccordionConfiguracoes"
              >
                <Link className="nav-link" to="/admin/configuracoes-site">
                  Site
                </Link>
                <Link className="nav-link" to="/admin/usuarios">
                  Usuários
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
