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

            <Link className="nav-link" to="/admin/corretores">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Corretores
            </Link>

            <Link className="nav-link" to="/admin/parceiros">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Parceiros
            </Link>

            <Link className="nav-link" to="/admin/imoveis">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Imóveis
            </Link>

            <button
              className="btn btn-link nav-link collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLocalizacoes"
              aria-expanded="false"
              aria-controls="collapseLocalizacoes"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-book-open"></i>
              </div>
              Localizações
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </button>
            <div
              className="collapse"
              id="collapseLocalizacoes"
              aria-labelledby="headingTwo"
              data-bs-parent="#sidenavAccordion"
            >
              <nav
                className="sb-sidenav-menu-nested nav"
                id="sidenavAccordionLocalizacoes"
              >
                <Link className="nav-link" to="/admin/cidades">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Cidades
                </Link>

                <Link className="nav-link" to="/admin/bairros">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Bairros
                </Link>
              </nav>
            </div>

            <Link className="nav-link" to="/admin/postagens">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              Postagens
            </Link>
          </div>
        </div>

        <div className="sb-sidenav-footer">
          <div className="small">Copyright &copy; Haniger 2022</div>
        </div>
      </nav>
    </div>
  );
};
