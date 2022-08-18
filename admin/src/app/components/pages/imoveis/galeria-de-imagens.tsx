import { imageFallback } from "../../../helpers/image-fallback";
import { CDN_URL } from "../../../services/cdn.service";
import AddImage from "../../../assets/images/add-image.jpg";
import { useMemo } from "react";

export const GaleriaDeImagens = ({
  imagens,
  onChange,
}: {
  imagens: any[];
  onChange: (imagens: any[]) => void;
}) => {
  function ajustarOrdem(imagem: any, index: number) {
    const newOrder = index + 1;
    return {
      ...imagem,
      order: newOrder,
    };
  }

  function tormarPrincipal(photo: any) {
    const imagemPrincipal = imagens.find(
      (imagem: any) => imagem.photo == photo
    );

    let newImagens = imagens.filter((imagem: any) => imagem != imagemPrincipal);

    newImagens = [imagemPrincipal, ...newImagens].map(ajustarOrdem);

    onChange(newImagens);
  }

  function remover(photo: any) {
    const imagemParaRemover = imagens.find(
      (imagem: any) => imagem.photo == photo
    );

    imagemParaRemover.remove = true;

    let newImagens = imagens.filter(
      (imagem: any) => imagem != imagemParaRemover
    );

    newImagens = [...newImagens, imagemParaRemover].map(ajustarOrdem);

    onChange(newImagens);
  }

  function mover(fromIndex: number, toIndex: number) {
    let newImagens = [...imagens];

    const element = newImagens[fromIndex];
    newImagens.splice(fromIndex, 1);
    newImagens.splice(toIndex, 0, element);

    newImagens = newImagens.map(ajustarOrdem);

    onChange(newImagens);
  }

  function moverParaEsquerda(photo: any) {
    const index = imagens.findIndex((imagem) => imagem.photo == photo);
    mover(index, index - 1);
  }

  function moverParaDireita(photo: any) {
    const index = imagens.findIndex((imagem) => imagem.photo == photo);
    mover(index, index + 1);
  }

  function onImageChange(event: any) {
    event.preventDefault();

    let newImagens = [...imagens];

    for (const file of event.target.files) {
      newImagens.push({
        photo: file,
        upload: true,
      });
    }

    newImagens = newImagens.map(ajustarOrdem);

    onChange(newImagens);
  }

  function criarImagemTemp(imagem: any) {
    return URL.createObjectURL(imagem);
  }

  const imagensSemRemover = useMemo(() => {
    return imagens.filter(({ remove }) => !remove);
  }, [imagens]);

  return (
    <div className="row">
      {imagensSemRemover.map(({ photo, title }, index) => (
        <div className="col-md-3 mb-3 mt-3" key={index}>
          <div className="card">
            <img
              className="card-img-top"
              src={
                typeof photo == "string"
                  ? `${CDN_URL}/${photo}`
                  : criarImagemTemp(photo)
              }
              alt={title}
              onError={imageFallback}
            />
            <div className="card-body">
              <button
                className="btn btn-primary btn-sm btn-block"
                disabled={index == 0}
                type="button"
                onClick={() => tormarPrincipal(photo)}
              >
                Tormar Principal
              </button>

              <button
                className="btn btn-danger btn-sm btn-block"
                type="button"
                onClick={() => remover(photo)}
              >
                Remover
              </button>

              <div className="text-center">
                <span className="">Mover</span>

                <div>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={index == 0}
                    type="button"
                    onClick={() => moverParaEsquerda(photo)}
                  >
                    {"<"}
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    disabled={index == imagensSemRemover.length - 1}
                    onClick={() => moverParaDireita(photo)}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="col-md-3 mb-3 mt-3">
        <input
          type="file"
          className="d-none"
          id="add-file"
          accept="image/*"
          multiple
          onChange={onImageChange}
        />

        <label className="card btn" htmlFor="add-file">
          <img
            className="card-img-top"
            src={AddImage}
            alt={"Adicionar Imagem"}
            onError={imageFallback}
          />
          <div className="card-body text-center">Adicionar Imagens</div>
        </label>
      </div>
    </div>
  );
};
