import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { apiService } from "../../../services/api.service";
import { Pagination } from "../../layouts/admin/components/pagination";
import { toast } from "react-toastify";
import { usePagination } from "../../../hooks/usePagination";

export const BairrosPage = () => {
  const [models, setModels] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const paginationProps = usePagination({ currentPage: 1, itemsPerPage: 5 });

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
              await apiService.delete(
                `/neighborhood/neighborhoods/${model.code}`
              );
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
      const resposta = await apiService.get("/neighborhood/neighborhoods", {
        params: filters,
      });
      setModels(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  const currentItems = useMemo(
    () =>
      models.slice(
        paginationProps.indexOfFirstItem,
        paginationProps.indexOfLastItem
      ),
    [models, paginationProps.indexOfFirstItem, paginationProps.indexOfLastItem]
  );

  useEffect(() => {
    buscar();
  }, []);

  return (
    <div className="container-fluid px-4">
      <div className="mt-4 d-flex justify-content-between align-items-center">
        <h1>Bairros</h1>

        <Link className="btn btn-primary btn-sm" to="/admin/bairros/cadastrar">
          Cadastrar
        </Link>
      </div>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Bairros</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">Bairros</div>

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
                      <th scope="col">Cidade</th>
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
                          <td>{model.city ? model.city : ""}</td>
                          <td>
                            <Link
                              className="btn btn-link text-dark p-0"
                              title="Editar"
                              to={`/admin/bairros/${model.code}`}
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

                <Pagination totalItems={models.length} {...paginationProps} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
