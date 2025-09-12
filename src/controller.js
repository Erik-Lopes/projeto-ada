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

abrirModalCadastro();
