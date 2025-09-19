document.getElementById("modal-senha").style.display = "none";
document.getElementById("modal-cadastro").style.display = "none";
document.getElementById("modal-dados").style.display = "none";

//Abrir e fechar o modal do formulário de cadastro
function abrirModalCadastro(){
  const span = document.querySelector(".cadastroClose");
  const modal = document.getElementById("modal-cadastro");
  document.getElementById("email-cadastro").value = document.getElementById("email").value;

  modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//Abrir e fechar o modal do formulário contendo os dados do usuário
function abrirModalDados(){
  const span = document.querySelector(".dadosClose");
  const modal = document.getElementById("modal-dados");

  modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//Abrir o modal do formulário de senha
function abrirModalSenha(){
  const span = document.querySelector(".senhaClose");
  const modal = document.getElementById("modal-senha");

  modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
//Fechar o modal de dados do usuário 
function fechaModalDados(){
  const modal = document.getElementById("modal-dados");
  modal.style.display = "none";
}

//Fechar o modal do cadastro de usuário 
function fechaModalCadastro(){
  const modal = document.getElementById("modal-cadastro");
  modal.style.display = "none";
}

//Fechar o modal do formulário de senha
function fechaModalSenha(){
  const modal = document.getElementById("modal-senha");
  modal.style.display = "none";
}

//Função para cadastrar usuário
function submitCadastro(){
  
  const form = document.getElementById("formulario-cadastro");
  
  form.addEventListener("submit", async function(event){
    event.preventDefault();
    const objeto = {
      email: document.getElementById("email-cadastro").value,
      nome: document.getElementById("nome-cadastro").value,
      telefone: document.getElementById("telefone-cadastro").value,
      endereco: document.getElementById("endereco-cadastro").value,
      cpf: document.getElementById("cpf-cadastro").value,
      senha: document.getElementById("senha-cadastro").value,
    }

    const objetoJson = JSON.stringify(objeto);
    console.log(objetoJson);

    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: objetoJson
    });
    console.log(res);
    if(res.ok){
      alert("Usuario cadastrado com sucesso!");
      fechaModalCadastro();
      document.getElementById("email").value = "";
    }
    else{
      alert("CPF já cadastrado na base! Tente novamente")
    }
  });
}

//Função de Login
function submitSenha(){
  
  const form = document.getElementById("form-senha");
  
  form.addEventListener("submit", async function(event){
    event.preventDefault();
    const objeto = {
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
    }

    const objetoJson = JSON.stringify(objeto);
    
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "Authorization": 'Bearer ${email}'
      },
      body: objetoJson
    });
    
    if(res.ok){
      const { token } = await res.json();
      localStorage.setItem('token', token);
      retornaDados();
      fechaModalSenha();
      document.getElementById("email").value = "";
      document.getElementById("senha").value = "";
      abrirModalDados();
    }
    else{
      alert("Senha inválida! Tente novamente")
    }
  });
}

//Função para verificação de e-mail na base de dados
function validaEmail (){
  const form = document.getElementById("insere-email");
  
  form.addEventListener("submit", async function(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const res = await fetch(`http://localhost:3000/api/users/validate-email?email=${email}`);

    if(res.status === 409){
      abrirModalSenha();
    }else{
      abrirModalCadastro();
    }
  });
}

//Função para retornar e apresentar os dados do usuário logado
async function retornaDados(){
  
  const btnExcluir = document.getElementById("botao-excluir-dados");
  const btnSalvar = document.getElementById("botao-salvar-dados");
  const btnEditar = document.getElementById("botao-editar-dados");
  const inputs = document.querySelectorAll("#formulario-dados input")

  const res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: { "Content-Type": "application/json", 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });
    
  const dados = JSON.parse(JSON.stringify(await res.json()))

  document.getElementById("nome-dados").value = dados.nome;
  document.getElementById("email-dados").value = dados.email;
  document.getElementById("telefone-dados").value = dados.telefone;
  document.getElementById("endereco-dados").value = dados.endereco;
  document.getElementById("cpf-dados").value = dados.cpf;

  btnEditar.addEventListener("click", async function(event){
    event.preventDefault();
    
    if(btnEditar.textContent == "Editar"){
      btnEditar.textContent = "Cancelar";
      btnSalvar.style.display = "block";
      btnExcluir.style.display = "none";
      inputs.forEach(input => {
        input.readOnly = !input.readOnly;
      });
    }else{
      btnEditar.textContent = "Editar";
      btnSalvar.style.display = "none";
      btnExcluir.style.display = "block";
      inputs.forEach(input => {
        input.readOnly = !input.readOnly;
      });
      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json", 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
        
      const dados = JSON.parse(JSON.stringify(await res.json()))
      document.getElementById("nome-dados").value = dados.nome;
      document.getElementById("email-dados").value = dados.email;
      document.getElementById("telefone-dados").value = dados.telefone;
      document.getElementById("endereco-dados").value = dados.endereco;
      document.getElementById("cpf-dados").value = dados.cpf;
    }
  });

  btnExcluir.addEventListener("click", function(event){
    event.preventDefault();
    excluirUsuario(dados.id)
  });

  btnSalvar.addEventListener("click", function(event){
    event.preventDefault();
    editarUsuario(dados.id)
    btnEditar.textContent = "Editar";
    btnSalvar.style.display = "none";
    btnExcluir.style.display = "block";
    inputs.forEach(input => {
      input.readOnly = !input.readOnly;
    });
  });
}

//Função para excluir usuário da base
async function excluirUsuario(id){
  
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });
  if(res.ok){
    alert("Usuário excluído com sucesso!")
    fechaModalDados();
    localStorage.removeItem('token');
  }else{
    alert("Falha ao tentar excluir o usuário! Tente novamente!")
  }
}

//Função para editar usuário na base
async function editarUsuario(id){
  
  const objeto = {
      email: document.getElementById("email-dados").value,
      nome: document.getElementById("nome-dados").value,
      telefone: document.getElementById("telefone-dados").value,
      endereco: document.getElementById("endereco-dados").value,
      cpf: document.getElementById("cpf-dados").value,
    }
  const objetoJson = JSON.stringify(objeto);
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "PUT",
    body: objetoJson,
    headers: { "Content-Type": "application/json", 
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });
  if(res.ok){
    alert("Dados alterados com sucesso!")
  }else{
    alert("Falha ao alterar dados do usuário! Tente novamente!")
  }
}

validaEmail();
submitCadastro();
submitSenha();