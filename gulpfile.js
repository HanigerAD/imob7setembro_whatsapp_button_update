const { exec } = require("child_process");
const path = require("path");
const { src, dest } = require("gulp");

async function buildSite() {
  return new Promise((resolve, reject) => {
    exec("cd site && npm run build", (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
}

async function buildAdmin() {
  return new Promise((resolve, reject) => {
    exec("cd admin && npm run build", (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
}

async function buildApi() {
  return new Promise((resolve, reject) => {
    exec("cd api && npm run build", (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
}

async function limparServerSite() {
  const { deleteAsync } = await import("del");

  return deleteAsync([path.join(__dirname, "server_site", "public")]);
}

async function limparServerAdmin() {
  const { deleteAsync } = await import("del");

  return deleteAsync([path.join(__dirname, "server_admin", "public")]);
}

async function copiarArquivosParaServerSite() {
  return src("site/dist/sete-setembro-site/**/*.*").pipe(
    dest("server_site/public/")
  );
}

async function copiarArquivosParaServerAdmin() {
  return src("admin/build/**/*.*").pipe(dest("server_admin/public/"));
}

async function main() {
  console.log("Realizando build do Site");
  await buildSite();
  console.log("Build do Site realizado");

  console.log("Realizando build do Admin");
  await buildAdmin();
  console.log("Build do Admin realizado");

  console.log("Realizando build da Api");
  await buildApi();
  console.log("Build da Api realizado");

  console.log("Limpando Server Site");
  await limparServerSite();
  console.log("Server Site Limpo");

  console.log("Limpando Server Admin");
  await limparServerAdmin();
  console.log("Server Admin Limpo");

  console.log("Copiando Arquivos para Server Site");
  await copiarArquivosParaServerSite();
  console.log("Arquivos Copiados para Server Site");

  console.log("Copiando Arquivos para Server Admin");
  await copiarArquivosParaServerAdmin();
  console.log("Arquivos Copiados para Server Admin");
}

exports.default = main;
