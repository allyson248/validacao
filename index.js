const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let empresas = [];


app.get("/", (req, res) => {
  const form = `
    <html>
    <head>
      <title>Cadastro de Empresas</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .error { color: red; }
        .success { color: green; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f4f4f4; }
      </style>
    </head>
    <body>
      <h1>Cadastro de Empresas</h1>
      <form action="/" method="POST">
        <label for="cnpj">CNPJ:</label><br>
        <input type="text" id="cnpj" name="cnpj"><br><br>

        <label for="razaoSocial">Razão Social / Nome do Fornecedor:</label><br>
        <input type="text" id="razaoSocial" name="razaoSocial"><br><br>

        <label for="nomeFantasia">Nome Fantasia:</label><br>
        <input type="text" id="nomeFantasia" name="nomeFantasia"><br><br>

        <label for="endereco">Endereço:</label><br>
        <input type="text" id="endereco" name="endereco"><br><br>

        <label for="cidade">Cidade:</label><br>
        <input type="text" id="cidade" name="cidade"><br><br>

        <label for="uf">UF:</label><br>
        <input type="text" id="uf" name="uf" maxlength="2"><br><br>

        <label for="cep">CEP:</label><br>
        <input type="text" id="cep" name="cep"><br><br>

        <label for="email">E-mail:</label><br>
        <input type="email" id="email" name="email"><br><br>

        <label for="telefone">Telefone:</label><br>
        <input type="text" id="telefone" name="telefone"><br><br>

        <button type="submit">Cadastrar</button>
      </form>

      <h2>Empresas Cadastradas</h2>
      ${
        empresas.length > 0
          ? `<table>
              <tr>
                <th>CNPJ</th>
                <th>Razão Social</th>
                <th>Nome Fantasia</th>
                <th>Endereço</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Email</th>
                <th>Telefone</th>
              </tr>
              ${empresas
                .map(
                  (empresa) => `
                <tr>
                  <td>${empresa.cnpj}</td>
                  <td>${empresa.razaoSocial}</td>
                  <td>${empresa.nomeFantasia}</td>
                  <td>${empresa.endereco}</td>
                  <td>${empresa.cidade}</td>
                  <td>${empresa.uf}</td>
                  <td>${empresa.cep}</td>
                  <td>${empresa.email}</td>
                  <td>${empresa.telefone}</td>
                </tr>`
                )
                .join("")}
            </table>`
          : "<p>Nenhuma empresa cadastrada.</p>"
      }
    </body>
    </html>
  `;
  res.send(form);
});


app.post("/", (req, res) => {
  const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

  const erros = [];

 
  if (!cnpj) erros.push("CNPJ");
  if (!razaoSocial) erros.push("Razão Social / Nome do Fornecedor");
  if (!nomeFantasia) erros.push("Nome Fantasia");
  if (!endereco) erros.push("Endereço");
  if (!cidade) erros.push("Cidade");
  if (!uf) erros.push("UF");
  if (!cep) erros.push("CEP");
  if (!email) erros.push("E-mail");
  if (!telefone) erros.push("Telefone");

  if (erros.length > 0) {
    let erroHtml = `<p class="error">Os seguintes campos são obrigatórios: ${erros.join(", ")}</p>`;
    res.send(erroHtml + `<a href="/">Voltar</a>`);
  } else {
    
    empresas.push({ cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone });
    res.redirect("/");
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
