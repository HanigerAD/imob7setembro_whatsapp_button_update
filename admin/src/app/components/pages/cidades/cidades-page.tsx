import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { imageFallback } from "../../../helpers/image-fallback";
import { apiService } from "../../../services/api.service";
import { CDN_URL } from "../../../services/cdn.service";
import { Pagination } from "../../layouts/admin/components/pagination";
import { toast } from "react-toastify";

export const CidadesPage = () => {
  const [models, setModels] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  async function deletar(model: any) {
    confirmAlert({
      title: "Atenção",
      message: `Você deseja realmente deletar o registro ${model.title} ?`,
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            try {
              setCarregando(true);
              await apiService.delete(`/locality/city/${model.code}`);
              toast.success("Registro removido com sucesso");
              buscar();
            } catch (error) {
              console.log({ error });
              setCarregando(false);
            }
          },
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  }

  async function buscar() {
    setCarregando(true);
    setModels([]);

    try {
      const filters = {};
      const resposta = await apiService.get("/locality/city", {
        params: filters,
      });
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
        <h1>Cidades</h1>

        <Link className="btn btn-primary btn-sm" to="/admin/cidades/cadastrar">
          Cadastrar
        </Link>
      </div>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Cidades</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">Cidades</div>

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
                      <th scope="col">Descrição</th>
                      <th scope="col">UF</th>
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
                          <td>{model.description}</td>
                          <td>{model.uf ? model.uf.description : ""}</td>
                          <td>
                            <Link
                              className="btn btn-link text-dark p-0"
                              title="Editar"
                              to={`/admin/cidades/${model.code}`}
                            >
                              <i className="fas fa-pen-to-square fa-fw"></i>
                            </Link>
                            &nbsp;
                            <button
                              className="btn btn-link text-dark p-0"
                              title="Deletar"
                              onClick={() => deletar(model)}
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

                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={models.length}
                  currentPage={currentPage}
                  paginate={paginate}
                  nextPage={nextPage}
                  prevPage={prevPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
