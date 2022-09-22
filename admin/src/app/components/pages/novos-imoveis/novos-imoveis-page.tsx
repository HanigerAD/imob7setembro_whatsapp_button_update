import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { imageFallback } from "../../../helpers/image-fallback";
import { apiService } from "../../../services/api.service";
import { CDN_URL } from "../../../services/cdn.service";
import { Pagination } from "../../layouts/admin/components/pagination";
import { toast } from "react-toastify";
import { usePagination } from "../../../hooks/usePagination";
import {
  converterParaMoeda,
  converterParaTelefone,
} from "../../../utils/parser.utils";

export const NovosImoveisPage = () => {
  const [models, setModels] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const paginationProps = usePagination({ currentPage: 1, itemsPerPage: 5 });

  async function deletar(model: any) {
    confirmAlert({
      title: "Atenção",
      message: `Você deseja realmente deletar o novo imovel ${model.title} ?`,
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            try {
              setCarregando(true);
              await apiService.delete(`/contact/new-properties/${model.code}`);
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
      const resposta = await apiService.get("/contact/new-properties", {
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
        <h1>Novos Imoveis</h1>

        <Link
          className="btn btn-primary btn-sm"
          to="/admin/novos-imoveis/cadastrar"
        >
          Cadastrar
        </Link>
      </div>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Formulários do Cliente</li>
      </ol>

      <div className="card mb-4">
        <div className="card-header">Novos Imoveis</div>

        <div className="card-body">
          {carregando ? (
            <div className="text-center">Carregando...</div>
          ) : (
            <>
              {currentItems.length ? (
                <>
                  {currentItems.map((model: any) => (
                    <div
                      key={`imoveis-${model.code}`}
                      className="row p-2 bg-white border rounded mb-2"
                    >
                      <div className="col-md-3 mt-1">
                        <div className="mt-1 mb-1 spec-1">
                          <p className="text-justify text-truncate para mb-0">
                            <b>Código:</b>
                            &nbsp;
                            <span>{model.code}</span>
                          </p>

                          <p className="text-justify text-truncate para mb-0">
                            <b>Data:</b>
                            &nbsp;
                            <span>{model.date}</span>
                          </p>

                          <p className="text-justify text-truncate para mb-0">
                            <b>Nome:</b>
                            &nbsp;
                            <span>{model.fullname}</span>
                          </p>

                          <p className="text-justify text-truncate para mb-0">
                            <b>E-mail:</b>
                            &nbsp;
                            <span>{model.email}</span>
                          </p>

                          <p className="text-justify text-truncate para mb-0">
                            <b>Telefone:</b>
                            &nbsp;
                            <span>{converterParaTelefone(model.phone)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="col-md-3 mt-1">
                        <div className="mt-1 mb-1 spec-1">
                          <p className="text-justify text-truncate para mb-0">
                            <b>Logradouro:</b>
                            &nbsp;
                            <span>{model.address}</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>Bairro:</b>
                            &nbsp;
                            <span>{model.neighborhood}</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>Cidade:</b>
                            &nbsp;
                            <span>{model.city}</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>UF:</b>
                            &nbsp;
                            <span>{model.uf}</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>Quartos:</b>
                            &nbsp;
                            <span>{model.bedrooms || 0}</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>Vagas de Garagem:</b>
                            &nbsp;
                            <span>{model.parking || 0}</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>Area Privada:</b>
                            &nbsp;
                            <span>{model.privativeArea || 0} m2</span>
                          </p>
                          <p className="text-justify text-truncate para mb-0">
                            <b>Area Total:</b>
                            &nbsp;
                            <span>{model.totalArea || 0} m2</span>
                          </p>
                        </div>
                      </div>
                      <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                        <div className="d-flex flex-row align-items-center">
                          <h4 className="mr-1">
                            R$ {converterParaMoeda(model.price || 0)}
                          </h4>
                        </div>

                        <p className="text-justify text-truncate para mb-0">
                          <b>Tipo:</b>
                          &nbsp;
                          <span>{model.type}</span>
                        </p>

                        <div className="d-flex flex-column mt-4">
                          <Link
                            className="btn btn-warning btn-sm"
                            title="Editar"
                            to={`/admin/imoveis/${model.code}`}
                          >
                            <i className="fas fa-pen-to-square fa-fw"></i>
                            <span>Editar</span>
                          </Link>

                          <Link
                            className="btn btn-danger btn-sm mt-2"
                            title="Deletar"
                            to={`/admin/imoveis/${model.code}`}
                          >
                            <i className="fas fa-pen-to-square fa-fw"></i>
                            <span>Deletar</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Pagination totalItems={models.length} {...paginationProps} />
                </>
              ) : (
                <p>Nenhum registro encontrado</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
