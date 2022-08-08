import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../services/api.service";
import { login } from "../../../services/auth.service";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [model, setModel] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  function atualizarModel(chave: string, valor: any) {
    setModel((modelAnt) => ({ ...modelAnt, [chave]: valor }));
  }

  async function manipularEnvio(event: any) {
    event.preventDefault();

    if (!model.email || !model.password) {
      setMessage("Preencha todos os dados do formulário");
    } else {
      entrar();
    }
  }

  async function entrar() {
    try {
      const resposta = await apiService.post("/auth/login", {
        email: model.email,
        password: model.password,
      });

      login(resposta.data.token, resposta.data.user);
      navigate("/admin", { replace: true });
    } catch (error) {
      setMessage("Houve um problema com o login, verifique suas credenciais.");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-body">
              <form onSubmit={manipularEnvio}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={model.email}
                    onChange={(event) =>
                      atualizarModel("email", event.target.value)
                    }
                  />
                  <label htmlFor="inputEmail">E-mail</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Password"
                    value={model.password}
                    onChange={(event) =>
                      atualizarModel("password", event.target.value)
                    }
                  />
                  <label htmlFor="inputPassword">Senha</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    id="inputRememberPassword"
                    type="checkbox"
                    value=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="inputRememberPassword"
                  >
                    Lembrar-me
                  </label>
                </div>
                {message ? (
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                ) : null}
                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                  <a className="small" href="password.html">
                    {/* Esqueceu sua senha? */}
                  </a>
                  <button className="btn btn-primary" type="submit">
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
