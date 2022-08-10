import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { imageFallback } from "../../../helpers/image-fallback";
import { apiService } from "../../../services/api.service";
import { CDN_URL } from "../../../services/cdn.service";
import { Pagination } from "../../layouts/admin/components/pagination";

export const ImoveisPage = () => {
  const [models, setModels] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  async function buscar() {
    setCarregando(true);
    setModels([]);

    try {
      const resposta = await apiService.get("/property/properties");
      setModels(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  const indexOfLastItem = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const indexOfFirstItem = useMemo(
    () => indexOfLastItem - itemsPerPage,
    [indexOfLastItem, itemsPerPage]
  );

  const currentItems = useMemo(
    () => models.slice(indexOfFirstItem, indexOfLastItem),
    [models, indexOfFirstItem, indexOfLastItem]
  );

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="container-fluid px-4">
      <div className="mt-4 d-flex justify-content-between align-items-center">
        <h1>Imóveis</h1>

        <Link className="btn btn-primary btn-sm" to="/admin/imoveis/cadastrar">
          Cadastrar
        </Link>
      </div>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Imóveis</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">Imóveis</div>

        <div className="card-body">
          {carregando ? (
            <div className="text-center">Carregando...</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Foto</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Cidade</th>
                      <th scope="col">Financiavel</th>
                      <th scope="col">Bairro</th>
                      <th scope="col">Quartos</th>
                      <th scope="col">Vagas de Garagem</th>
                      <th scope="col">Preço</th>
                      <th scope="col">Area Total</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Zona</th>
                      <th scope="col" style={{ minWidth: 60 }}>
                        Opções
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length ? (
                      currentItems.map((model: any) => (
                        <tr key={model.code}>
                          <th scope="row">{model.code}</th>
                          <td>
                            <img
                              width={80}
                              src={`${CDN_URL}/${model.photo}`}
                              alt={model.title}
                              onError={imageFallback}
                            />
                          </td>
                          <td>{model.title}</td>
                          <td>{model.category}</td>
                          <td>{model.city}</td>
                          <td>{model.financeable ? "Sim" : "Não"}</td>
                          <td>{model.neighborhood}</td>
                          <td>{model.bedroom || 0}</td>
                          <td>{model.parkingVacancy || 0}</td>
                          <td>{model.price || 0}</td>
                          <td>{model.totalArea || 0} m2</td>
                          <td>{model.transaction}</td>
                          <td>{model.zone}</td>
                          <td>
                            <Link
                              className="btn btn-link text-dark p-0"
                              title="Editar"
                              to={`/admin/imoveis/${model.code}`}
                            >
                              <i className="fas fa-pen-to-square fa-fw"></i>
                            </Link>
                            &nbsp;
                            <button
                              className="btn btn-link text-dark p-0"
                              title="Deletar"
                            >
                              <i className="fas fa-trash fa-fw"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          Nenhum registro encontrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={models.length}
                currentPage={currentPage}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
