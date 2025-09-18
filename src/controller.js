document.getElementById("modal-senha").style.display = "none";
document.getElementById("modal-cadastro").style.display = "none";


function abrirModalCadastro(){
  // const btnCadastrar = document.getElementById("btnCadastrar");
  const span = document.querySelector(".cadastroClose");
  const modal = document.getElementById("modal-cadastro");
  document.getElementById("email-cadastro").value = document.getElementById("email").value;

  // btnCadastrar.onclick = () => 
  modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function abrirModalSenha(){
  // const btnSenha = document.getElementById("btnSenha");
  const span = document.querySelector(".senhaClose");
  const modal = document.getElementById("modal-senha");

  // btnSenha.onclick = () => 
  modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

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
      // alert("Login realizado com sucesso!")
      const { token } = await res.json();
      localStorage.setItem('token', token);
      retornaDados();
      fechaModalSenha();
      document.getElementById("email").value = "";
    }
    else{
      alert("Senha inválida! Tente novamente")
    }
  });
}

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


validaEmail();
submitCadastro();
submitSenha();


// submitCadastro();
// abrirModalSenha();
// abrirModalCadastro();

async function retornaDados(){
  
    const res = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json", 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    
    const dados = JSON.parse(JSON.stringify(await res.json()))

    

}

