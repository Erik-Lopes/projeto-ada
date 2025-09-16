document.getElementById("modal-senha").style.display = "none";
document.getElementById("modal-cadastro").style.display = "none";

function abrirModalCadastro(){
  const btnCadastrar = document.getElementById("btnCadastrar");
  const span = document.querySelector(".cadastroClose");
  const modal = document.getElementById("modal-cadastro");

  btnCadastrar.onclick = () => modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function abrirModalSenha(){
  const btnSenha = document.getElementById("btnSenha");
  const span = document.querySelector(".senhaClose");
  const modal = document.getElementById("modal-senha");

  btnSenha.onclick = () => modal.style.display = "block";

  span.onclick = () => modal.style.display = "none";

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//Função para formatar os dados em JSON
function submitCadastro(){
  
  const form = document.getElementById("formulario-cadastro");
  
  form.addEventListener("submit", function(event){
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
  });
}


submitCadastro();
abrirModalSenha();
abrirModalCadastro();
