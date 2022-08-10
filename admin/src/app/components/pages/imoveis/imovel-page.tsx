import _ from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "react-quill";
import { toast } from "react-toastify";
import { apiService } from "../../../services/api.service";
import { ObjectHelper } from "../../../helpers/object.helper";
import { GaleriaDeImagens } from "./galeria-de-imagens";

export const ImovelPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [model, setModel] = useState({} as any);
  const [modelAnt, setModelAnt] = useState({} as any);
  const [agents, setAgents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conservationStates, setConservationStates] = useState([]);
  const [types, setTypes] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [zones, setZones] = useState([]);
  const [situations, setSituations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cities, setCities] = useState([]);
  const [federativeUnits, setFederativeUnits] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const modelId = params.code || null;

  function atualizarModel(chave: string, valor: any) {
    setModel((modelAnt: any) => ({ ...modelAnt, [chave]: valor }));
  }

  async function cancelar(event: any) {
    event.preventDefault();

    navigate(`/admin/imoveis`);
  }

  async function manipularEnvio(event: any) {
    event.preventDefault();

    try {
      await salvar(model);
    } catch (error) {
      console.log({ error });
      setCarregando(false);
    }
  }

  function removeCamposSalvar(data: any) {
    let newModel = Object.assign({}, data);

    newModel = ObjectHelper.mantemSomenteCampos(newModel, [
      "internalCode",
      "category",
      "type",
      "conservationState",
      "profile",
      "zone",
      "agent",
      "show",
      "title",
      "price",
      "dormitory",
      "unitAvailable",
      "bathroom",
      "parkingVacancy",
      "privativeArea",
      "totalArea",
      "pavement",
      "financeable",
      "description",
      "privateInfo",
      "reserved",
      "expirationDate",
      "hectare",
      "constuctionYear",
      "featured",
      "superFeatured",
      "suite",
      "rented",
      "condominiumPrice",
      "showPrice",
      "zipCode",
      "city",
      "neighborhood",
      "street",
      "number",
      "complement",
      "latitude",
      "longitude",
      "transaction",
      "situation",
    ]);

    newModel.city = newModel.city
      ? ObjectHelper.mantemSomenteCampos(newModel.city, ["code"])
      : null;
    newModel.city = newModel.city ? newModel.city.code : null;

    newModel.neighborhood = newModel.neighborhood
      ? ObjectHelper.mantemSomenteCampos(newModel.neighborhood, ["code"])
      : null;
    newModel.neighborhood = newModel.neighborhood
      ? newModel.neighborhood.code
      : null;

    newModel.category = newModel.category
      ? ObjectHelper.mantemSomenteCampos(newModel.category, ["code"])
      : null;
    newModel.category = newModel.category ? newModel.category.code : null;

    newModel.type = newModel.type
      ? ObjectHelper.mantemSomenteCampos(newModel.type, ["code"])
      : null;
    newModel.type = newModel.type ? newModel.type.code : null;

    newModel.conservationState = newModel.conservationState
      ? ObjectHelper.mantemSomenteCampos(newModel.conservationState, ["code"])
      : null;
    newModel.conservationState = newModel.conservationState
      ? newModel.conservationState.code
      : null;

    newModel.profile = newModel.profile
      ? ObjectHelper.mantemSomenteCampos(newModel.profile, ["code"])
      : null;
    newModel.profile = newModel.profile ? newModel.profile.code : null;

    newModel.zone = newModel.zone
      ? ObjectHelper.mantemSomenteCampos(newModel.zone, ["code"])
      : null;
    newModel.zone = newModel.zone ? newModel.zone.code : null;

    newModel.agent = newModel.agent
      ? ObjectHelper.mantemSomenteCampos(newModel.agent, ["code"])
      : null;
    newModel.agent = newModel.agent ? newModel.agent.code : null;

    newModel.situation = newModel.situation
      ? ObjectHelper.mantemSomenteCampos(newModel.situation, ["code"])
      : null;
    newModel.situation = newModel.situation ? newModel.situation.code : null;

    newModel.transaction = newModel.transaction
      ? ObjectHelper.mantemSomenteCampos(newModel.transaction, ["code"])
      : null;
    newModel.transaction = newModel.transaction
      ? newModel.transaction.code
      : null;

    newModel.federativeUnit = newModel.federativeUnit
      ? ObjectHelper.mantemSomenteCampos(newModel.federativeUnit, ["code"])
      : null;
    newModel.federativeUnit = newModel.federativeUnit
      ? newModel.federativeUnit.code
      : null;

    return newModel;
  }

  async function salvarImovel(data: any) {
    const newModel = removeCamposSalvar(data);
    let code = modelId || "";

    if (code) {
      await apiService.patch(`/property/properties/${code}`, newModel);
    } else {
      const resposta = await apiService.post(`/property/properties`, newModel);

      code = resposta.data.code;
    }

    return code;
  }

  async function salvarImagensDoImovel(code: string, images: any[]) {
    console.log({ code, images });

    const deletedImages = images
      .filter((image) => !!image.remove)
      .map((image) => image.photo);

    if (deletedImages.length) {
      await apiService.patch(
        `/property/properties/${code}/delete-images`,
        deletedImages
      );
    }

    const newImages = images.filter((image) => !!image.upload);

    if (newImages.length) {
      for (const image of newImages) {
        const data = new FormData();

        data.append("file", image.photo);

        await apiService.post(`/property/properties/${code}/image`, data, {
          params: { order: image.order },
        });
      }
    }

    const updatedOrderImages = images.filter(
      (image) => !image.remove && !image.upload
    );

    if (updatedOrderImages.length) {
      const data = updatedOrderImages.map((image) => ({
        path: image.photo,
        index: image.order,
      }));

      await apiService.put(`/property/properties/images-sort`, data);
    }
  }

  async function salvar(data: any) {
    setCarregando(true);

    try {
      let code = await salvarImovel(data);
      await salvarImagensDoImovel(code, data.images);

      toast.success("Registro salvo com sucesso");
      setCarregando(false);

      if (code != modelId) {
        navigate(`/admin/imoveis/${code}`);
      } else {
        buscar(code);
      }
    } catch (error) {
      console.log({ error });
      toast.error(
        "Houve um erro ao salvar o Imovel. Verifique se os campos foram preenchidos corretamente"
      );
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
      toast.error("Houve um erro ao buscar os Agenciadores.");
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
      toast.error("Houve um erro ao buscar as Categorias.");
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
      toast.error("Houve um erro ao buscar os Estados de Conservação.");
      setCarregando(false);
    }
  }

  async function buscarTiposDeImovel() {
    setCarregando(true);
    setTypes([]);

    try {
      const resposta = await apiService.get(`/property/types`);
      setTypes(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar os Tipos de Imovel.");
      setCarregando(false);
    }
  }

  async function buscarPerfis() {
    setCarregando(true);
    setProfiles([]);

    try {
      const resposta = await apiService.get(`/property/profiles`);
      setProfiles(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar os Perfis.");
      setCarregando(false);
    }
  }

  async function buscarZonas() {
    setCarregando(true);
    setZones([]);

    try {
      const resposta = await apiService.get(`/property/zones`);
      setZones(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar as Zonas.");
      setCarregando(false);
    }
  }

  async function buscarSituacoes() {
    setCarregando(true);
    setSituations([]);

    try {
      const resposta = await apiService.get(`/property/situations`);
      setSituations(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar as Situações.");
      setCarregando(false);
    }
  }

  async function buscarTransacoes() {
    setCarregando(true);
    setTransactions([]);

    try {
      const resposta = await apiService.get(`/property/transactions`);
      setTransactions(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar as Transações.");
      setCarregando(false);
    }
  }

  async function buscarCidades() {
    setCarregando(true);
    setCities([]);

    try {
      const resposta = await apiService.get(`/locality/city`);
      setCities(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar as Cidades.");
      setCarregando(false);
    }
  }

  async function buscarUfs() {
    setCarregando(true);
    setFederativeUnits([]);

    try {
      const resposta = await apiService.get(`/locality/uf`);
      setFederativeUnits(resposta.data);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar os UFs.");
      setCarregando(false);
    }
  }

  async function buscarBairros(code: string) {
    setCarregando(true);
    setNeighborhoods([]);

    try {
      const resposta = await apiService.get(
        `/locality/city/${code}/neighborhoods`
      );
      const newNeighborhoods = resposta.data;
      if (model && model.neighborhood) {
        const existe = newNeighborhoods.find(
          ({ code }: any) => code == model.neighborhood.code
        );

        if (!existe) {
          atualizarModel("neighborhood", "");
        }
      }
      setNeighborhoods(newNeighborhoods);
      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar os Bairros.");
      setCarregando(false);
    }
  }

  async function buscar(modelId: string) {
    setCarregando(true);
    setModel({});

    try {
      const resposta = await apiService.get(`/property/properties/${modelId}`);
      const respostaImagens = await apiService.get(
        `/property/properties/${modelId}/images/urls`
      );

      const images = respostaImagens.data.map((imagem: any, index: number) => ({
        photo: imagem,
        order: index + 1,
      }));

      const newModel = Object.assign({}, resposta.data);
      newModel.images = images;

      setModelAnt(newModel);
      setModel(newModel);

      setCarregando(false);
    } catch (error) {
      console.log({ error });
      toast.error("Houve um erro ao buscar o Imovel.");
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (model.city && model.city.code) {
      buscarBairros(model.city.code);
    }
  }, [model.city]);

  useEffect(() => {
    buscarAgenciadores();
    buscarCategorias();
    buscarEstadosDeConservacao();
    buscarTiposDeImovel();
    buscarPerfis();
    buscarZonas();
    buscarSituacoes();
    buscarTransacoes();
    buscarCidades();
    buscarUfs();
  }, []);

  useEffect(() => {
    setModelAnt({});

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
          <div className="card-header">Geral</div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-title"
                    type="text"
                    placeholder="Titulo"
                    value={model.title || ""}
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
                    id="input-type"
                    placeholder="Tipo"
                    value={model?.type?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "type",
                        types.find(({ code }) => code == event.target.value) ||
                          null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {types.map((type: any) => (
                      <option key={type.code} value={type.code}>
                        {type.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-type">Tipo</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-category"
                    placeholder="Categoria"
                    value={model?.category?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "category",
                        categories.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
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
                    id="input-profile"
                    placeholder="Perfil"
                    value={model?.profile?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "profile",
                        profiles.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {profiles.map((profile: any) => (
                      <option key={profile.code} value={profile.code}>
                        {profile.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-profile">Perfil</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-zone"
                    placeholder="Zona"
                    value={model?.zone?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "zone",
                        zones.find(({ code }) => code == event.target.value) ||
                          null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {zones.map((zone: any) => (
                      <option key={zone.code} value={zone.code}>
                        {zone.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-zone">Zona</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-situation"
                    placeholder="Situação"
                    value={model?.situation?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "situation",
                        situations.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {situations.map((situation: any) => (
                      <option key={situation.code} value={situation.code}>
                        {situation.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-situation">Situação</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-transaction"
                    placeholder="Transação"
                    value={model?.transaction?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "transaction",
                        transactions.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {transactions.map((transaction: any) => (
                      <option key={transaction.code} value={transaction.code}>
                        {transaction.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-transaction">Transação</label>
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-finality"
                    placeholder="Finalidade"
                    value={model?.finality?.code || ""}
                    onChange={(event) =>
                      atualizarModel("finality",
                        finalities.find(({ code }) => code == event.target.value) ||
                          null)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {finalities.map((finality: any) => (
                      <option key={finality.code} value={finality.code}>
                        {finality.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-finality">Finalidade</label>
                </div>
              </div> */}

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-conservationState"
                    placeholder="Estado de Conservação"
                    value={model?.conservationState?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "conservationState",
                        conservationStates.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
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
              value={model?.description || ""}
              onChange={(value) => atualizarModel("description", value)}
            />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Galeria de Imagens</div>
          <div className="card body">
            <GaleriaDeImagens
              imagens={model.images || []}
              onChange={(images) => atualizarModel("images", images || [])}
            />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Endereço</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-federativeUnit"
                    placeholder="UF"
                    value={model?.federativeUnit?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "federativeUnit",
                        federativeUnits.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {federativeUnits.map((federativeUnit: any) => (
                      <option
                        key={federativeUnit.code}
                        value={federativeUnit.code}
                      >
                        {federativeUnit.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-federativeUnit">UF</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-city"
                    placeholder="Cidade"
                    value={model?.city?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "city",
                        cities.find(({ code }) => code == event.target.value) ||
                          null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {cities.map((city: any) => (
                      <option key={city.code} value={city.code}>
                        {city.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-city">Cidade</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-neighborhood"
                    placeholder="Bairro"
                    value={model?.neighborhood?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "neighborhood",
                        neighborhoods.find(
                          ({ code }) => code == event.target.value
                        ) || null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    {neighborhoods.map((neighborhood: any) => (
                      <option key={neighborhood.code} value={neighborhood.code}>
                        {neighborhood.description}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="input-neighborhood">Bairro</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-zipCode"
                    type="text"
                    placeholder="CEP"
                    value={model.zipCode || ""}
                    onChange={(event) =>
                      atualizarModel("zipCode", event.target.value)
                    }
                  />
                  <label htmlFor="input-zipCode">CEP</label>
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-street"
                    type="text"
                    placeholder="Logradouro"
                    value={model.street || ""}
                    onChange={(event) =>
                      atualizarModel("street", event.target.value)
                    }
                  />
                  <label htmlFor="input-street">Logradouro</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-number"
                    type="text"
                    placeholder="Número"
                    value={model.number || ""}
                    onChange={(event) =>
                      atualizarModel("number", event.target.value)
                    }
                  />
                  <label htmlFor="input-number">Número</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-complement"
                    type="text"
                    placeholder="Complemento"
                    value={model.complement || ""}
                    onChange={(event) =>
                      atualizarModel("complement", event.target.value)
                    }
                  />
                  <label htmlFor="input-complement">Complemento</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-latitude"
                    type="text"
                    placeholder="Latitude"
                    value={model.latitude || ""}
                    onChange={(event) =>
                      atualizarModel("latitude", event.target.value)
                    }
                  />
                  <label htmlFor="input-latitude">Latitude</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-longitude"
                    type="text"
                    placeholder="Longitude"
                    value={model.longitude || ""}
                    onChange={(event) =>
                      atualizarModel("longitude", event.target.value)
                    }
                  />
                  <label htmlFor="input-longitude">Longitude</label>
                </div>
              </div>
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
                    value={model.bathroom || ""}
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
                    value={model.dormitory || ""}
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
                    value={model.parkingVacancy || ""}
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
                    value={model.suite || ""}
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
                    value={model.privativeArea || ""}
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
                    value={model.totalArea || ""}
                    onChange={(event) =>
                      atualizarModel("totalArea", event.target.value)
                    }
                  />
                  <label htmlFor="input-totalArea">Área Total</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-hectare"
                    type="number"
                    placeholder="Hectares"
                    value={model.hectare || ""}
                    onChange={(event) =>
                      atualizarModel("hectare", event.target.value)
                    }
                  />
                  <label htmlFor="input-hectare">Hectares</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-constuctionYear"
                    type="number"
                    placeholder="Ano de Construção"
                    value={model.constuctionYear || ""}
                    onChange={(event) =>
                      atualizarModel("constuctionYear", event.target.value)
                    }
                  />
                  <label htmlFor="input-constuctionYear">
                    Ano de Construção
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-pavement"
                    placeholder="Rua Pavimentada"
                    value={model?.pavement || ""}
                    onChange={(event) =>
                      atualizarModel("pavement", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-pavement">Rua Pavimentada</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Financeiro</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-price"
                    type="number"
                    placeholder="Valor"
                    value={model.price || ""}
                    onChange={(event) =>
                      atualizarModel("price", event.target.value)
                    }
                  />
                  <label htmlFor="input-price">Valor</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-condominiumPrice"
                    type="number"
                    placeholder="Valor do Condomínio"
                    value={model.condominiumPrice || ""}
                    onChange={(event) =>
                      atualizarModel("condominiumPrice", event.target.value)
                    }
                  />
                  <label htmlFor="input-condominiumPrice">
                    Valor do Condomínio
                  </label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-financeable"
                    placeholder="Financiável"
                    value={model?.financeable || ""}
                    onChange={(event) =>
                      atualizarModel("financeable", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-financeable">Financiável</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Site</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-show"
                    placeholder="Exibir"
                    value={model?.show || ""}
                    onChange={(event) =>
                      atualizarModel("show", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-show">Exibir</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-showValue"
                    placeholder="Exibir Valor"
                    value={model?.showValue || ""}
                    onChange={(event) =>
                      atualizarModel("showValue", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-showValue">Exibir Valor</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-featured"
                    placeholder="Destaque"
                    value={model?.featured || ""}
                    onChange={(event) =>
                      atualizarModel("featured", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-featured">Destaque</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-superFeatured"
                    placeholder="Super Destaque"
                    value={model?.superFeatured || ""}
                    onChange={(event) =>
                      atualizarModel("superFeatured", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-superFeatured">Super Destaque</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-rented"
                    placeholder="Alugado"
                    value={model?.rented || ""}
                    onChange={(event) =>
                      atualizarModel("rented", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-rented">Alugado</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select
                    className="form-control"
                    id="input-reserved"
                    placeholder="Reservado"
                    value={model?.reserved || ""}
                    onChange={(event) =>
                      atualizarModel("reserved", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-reserved">Reservado</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-reserveDate"
                    type="date"
                    placeholder="Data da Reserva"
                    value={model.reserveDate || ""}
                    onChange={(event) =>
                      atualizarModel("reserveDate", event.target.value)
                    }
                  />
                  <label htmlFor="input-reserveDate">Data da Reserva</label>
                </div>
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
                      value={model.code || ""}
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
                    value={model.internalCode || ""}
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
                    value={model?.agent?.code || ""}
                    onChange={(event) =>
                      atualizarModel(
                        "agent",
                        agents.find(({ code }) => code == event.target.value) ||
                          null
                      )
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
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
                    value={model?.unitAvailable || ""}
                    onChange={(event) =>
                      atualizarModel("unitAvailable", event.target.value)
                    }
                  >
                    <option value={""} disabled>
                      Selecione...
                    </option>
                    <option value={"true"}>Sim</option>
                    <option value={"false"}>Não</option>
                  </select>
                  <label htmlFor="input-unitAvailable">
                    Unidade Disponível
                  </label>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="input-privateInfo"
                    type="text"
                    placeholder="Informações Privadas"
                    value={model.privateInfo || ""}
                    onChange={(event) =>
                      atualizarModel("privateInfo", event.target.value)
                    }
                  />
                  <label htmlFor="input-privateInfo">
                    Informações Privadas
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-inline-block w-100">
          <div className="float-end">
            <button
              className="btn btn-secondary mb-4"
              type="button"
              disabled={carregando}
              onClick={cancelar}
            >
              Cancelar
            </button>
            &nbsp;
            <button
              className="btn btn-success mb-4"
              type="submit"
              disabled={carregando}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
