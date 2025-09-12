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

abrirModalSenha();

abrirModalCadastro();
