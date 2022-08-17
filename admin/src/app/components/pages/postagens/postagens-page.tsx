import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { imageFallback } from "../../../helpers/image-fallback";
import { apiService } from "../../../services/api.service";
import { CDN_URL } from "../../../services/cdn.service";
import { Pagination } from "../../layouts/admin/components/pagination";
import { toast } from "react-toastify";

export const PostagensPage = () => {
  const [models, setModels] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  async function deletar(model: any) {
    confirmAlert({
      title: "Atenção",
      message: `Você deseja realmente deletar a postagem ${model.title} ?`,
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            try {
              setCarregando(true);
              await apiService.delete(`/blog/posts/${model.code}`);
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
      const resposta = await apiService.get("/blog/posts", {
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
        <h1>Postagens</h1>

        <Link
          className="btn btn-primary btn-sm"
          to="/admin/postagens/cadastrar"
        >
          Cadastrar
        </Link>
      </div>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Postagens</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">Postagens</div>

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
                      <th scope="col">Imagem</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Palavras chave</th>
                      <th scope="col">Data de Criação</th>
                      <th scope="col">Usuario</th>
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
                              width={50}
                              height={50}
                              style={{ borderRadius: '50%' }}
                              src={`${CDN_URL}/${model.image}`}
                              alt={model.title}
                              onError={imageFallback}
                            />
                          </td>
                          <td>{model.title}</td>
                          <td>{model.keywords}</td>
                          <td>
                            {model.createDate
                              ? new Date(model.createDate).toLocaleString()
                              : ""}
                          </td>
                          <td>{model.user && model.user.name}</td>
                          <td>
                            <Link
                              className="btn btn-link text-dark p-0"
                              title="Editar"
                              to={`/admin/postagens/${model.code}`}
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
