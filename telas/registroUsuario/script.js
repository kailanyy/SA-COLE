function registrarNovoUsuario() {
  let camposFormulario = document.forms.formRegistrarUsuario;
  console.log(camposFormulario.email.value);
  console.log(camposFormulario.senha.value);

  if(camposFormulario.email.value === "" && camposFormulario.senha.value === "") {
    alert("Burro")
  }

  event.preventDefault();
  console.log("Chegamos na função.");
}