import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "react-quill";
import { apiService } from "../../../services/api.service";

export const ImovelPage = () => {
  const params = useParams();
  const [model, setModel] = useState({} as any);
  const [agents, setAgents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conservationStates, setConservationStates] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const modelId = params.code;

  function atualizarModel(chave: string, valor: any) {
    setModel((modelAnt: any) => ({ ...modelAnt, [chave]: valor }));
  }

  async function manipularEnvio(event: any) {
    event.preventDefault();

    try {
      await enviar(model);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  async function enviar(data: any) {
    setCarregando(true);

    try {
      const resposta = await apiService.patch(
        `/property/properties/${modelId}`,
        data
      );

      console.log({ resposta });

      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  async function buscarAgenciadores() {
    setCarregando(true);
    setAgents([]);

    try {
      const resposta = await apiService.get(`/agent`);
      setAgents(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  async function buscarCategorias() {
    setCarregando(true);
    setCategories([]);

    try {
      const resposta = await apiService.get(`/property/categories`);
      setCategories(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  async function buscarEstadosDeConservacao() {
    setCarregando(true);
    setConservationStates([]);

    try {
      const resposta = await apiService.get(`/property/conservation-states`);
      setConservationStates(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  async function buscar(modelId: string) {
    setCarregando(true);
    setModel({});

    try {
      const resposta = await apiService.get(`/property/properties/${modelId}`);
      setModel(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAgenciadores();
    buscarCategorias();
    buscarEstadosDeConservacao();
  }, []);

  useEffect(() => {
    if (modelId) {
      buscar(modelId);
    }
  }, [modelId]);

  return (
    <div className="container-fluid px-4">
      <div className="mt-4">
        <h1>Imóvel</h1>
      </div>

      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">Imóveis</li>
        <li className="breadcrumb-item active">Imóvel</li>
      </ol>

      <form onSubmit={manipularEnvio}>
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Geral
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-title"
                    type="text"
                    placeholder="Titulo"
                    value={model.title}
                    onChange={(event) =>
                      atualizarModel("title", event.target.value)
                    }
                  />
                  <label htmlFor="input-title">Titulo</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-category"
                    placeholder="Categoria"
                    value={model?.category?.code}
                    onChange={(event) =>
                      atualizarModel("category", event.target.value)
                    }
                  >
                    <option selected>Selecione...</option>
                    {categories.map((category: any) => (
                      <option key={category.code} value={category.code}>
                        {category.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-category">Categoria</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-conservationState"
                    placeholder="Estado de Conservação"
                    value={model?.conservationState?.code}
                    onChange={(event) =>
                      atualizarModel("conservationState", event.target.value)
                    }
                  >
                    <option selected>Selecione...</option>
                    {conservationStates.map((conservationState: any) => (
                      <option
                        key={conservationState.code}
                        value={conservationState.code}
                      >
                        {conservationState.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-conservationState">
                    Estado de Conservação
                  </label>
                </div>
              </div>
            </div>

            <TextEditor
              placeholder="Descrição"
              className=" mb-3"
              theme="snow"
              value={model?.description}
              onChange={(value) => atualizarModel("description", value)}
            />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Endereço</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6"></div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Caracteristicas</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-bathroom"
                    type="number"
                    placeholder="Banheiros"
                    value={model.bathroom}
                    onChange={(event) =>
                      atualizarModel("bathroom", event.target.value)
                    }
                  />
                  <label htmlFor="input-bathroom">Banheiros</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-dormitory"
                    type="number"
                    placeholder="Dormitórios"
                    value={model.dormitory}
                    onChange={(event) =>
                      atualizarModel("dormitory", event.target.value)
                    }
                  />
                  <label htmlFor="input-dormitory">Dormitórios</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-parkingVacancy"
                    type="number"
                    placeholder="Vagas de Garagem"
                    value={model.parkingVacancy}
                    onChange={(event) =>
                      atualizarModel("parkingVacancy", event.target.value)
                    }
                  />
                  <label htmlFor="input-parkingVacancy">Vagas de Garagem</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-suite"
                    type="number"
                    placeholder="Suítes"
                    value={model.suite}
                    onChange={(event) =>
                      atualizarModel("suite", event.target.value)
                    }
                  />
                  <label htmlFor="input-suite">Suítes</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-privativeArea"
                    type="number"
                    placeholder="Área Privada"
                    value={model.privativeArea}
                    onChange={(event) =>
                      atualizarModel("privativeArea", event.target.value)
                    }
                  />
                  <label htmlFor="input-privativeArea">Área Privada</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-totalArea"
                    type="number"
                    placeholder="Área Total"
                    value={model.totalArea}
                    onChange={(event) =>
                      atualizarModel("totalArea", event.target.value)
                    }
                  />
                  <label htmlFor="input-totalArea">Área Total</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Financeiro</div>
          <div className="card-body">
            <div className="col-md-4">
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="input-price"
                  type="number"
                  placeholder="Valor"
                  value={model.price}
                  onChange={(event) =>
                    atualizarModel("price", event.target.value)
                  }
                />
                <label htmlFor="input-price">Valor</label>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Gestão</div>
          <div className="card-body">
            <div className="row">
              {model.code ? (
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="input-code"
                      type="text"
                      placeholder="Código"
                      value={model.code}
                      disabled
                    />
                    <label htmlFor="input-code">Código</label>
                  </div>
                </div>
              ) : null}

              <div className={`col-md-${model.code ? "4" : "8"}`}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-internalCode"
                    type="text"
                    placeholder="Código Interno"
                    value={model.internalCode}
                    onChange={(event) =>
                      atualizarModel("internalCode", event.target.value)
                    }
                  />
                  <label htmlFor="input-internalCode">Código Interno</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-agent"
                    placeholder="Agenciador"
                    value={model?.agent?.code}
                    onChange={(event) =>
                      atualizarModel("agent", event.target.value)
                    }
                  >
                    <option selected>Selecione...</option>
                    {agents.map((agent: any) => (
                      <option key={agent.code} value={agent.code}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-agent">Agenciador</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-unitAvailable"
                    placeholder="Unidade Disponível"
                    value={model?.unitAvailable}
                    onChange={(event) =>
                      atualizarModel("unitAvailable", event.target.value)
                    }
                  >
                    <option selected>Selecione...</option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-unitAvailable">
                    Unidade Disponível
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            className="btn btn-success mb-4"
            type="submit"
            disabled={carregando}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};
