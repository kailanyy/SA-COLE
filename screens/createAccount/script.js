function validarPreenchimentoCampos() {
  let usuario = document.getElementById('usuario').value;
  let senha = document.getElementById('senha').value;
  let typeUser = document.querySelector('input[name="typeUser"]:checked').value;

  if(!usuario || !senha || !typeUser) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Preencha todos os campos para realizar o cadastro!',
    })
    return;
  }
  cadastrar(usuario, senha, typeUser);
  validateUserType()
  
}

function cadastrar(usuario, senha, typeUser) {
  let dadosCadastros = {
    username: usuario,
    password: senha,
    typeUser,
    id: Math.floor(Date.now() * Math.random()).toString(36)
  };
  
  let cadastros = localStorage.getItem("dadosCadastros"); 
  
  if (cadastros == null) cadastros = [];
  else cadastros = JSON.parse(cadastros);
  cadastros.push(dadosCadastros);
  localStorage.setItem("dadosCadastros", JSON.stringify(cadastros)) 
  
  
  localStorage.setItem("loggedUser", JSON.stringify({id: dadosCadastros.id, typeUser}))

  // Swal.fire('Cadastro Realizado!')
  
  if(typeUser === "user"){
    console.log("Entered if") 
    window.location = "../userArea/myStockPoints/index.html";
  } else {
    console.log("Entered else")
    window.location = "../companyArea/registerPoint/index.html"
  }
}
  
function login() {
  let usuarioInput = document.getElementById('usuario').value
  let senhaInput = document.getElementById('senha').value

  let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"));

  for (let i=0; i<usuariosCadastrados.length; i++){
    usuariosCadastrados[i]
    let usuario = usuariosCadastrados[i]
    if (usuario.username === usuarioInput && usuario.password === senhaInput) {
      localStorage.setItem("loggedUser", JSON.stringify({id: usuario.id, typeUser}))
      return;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário ou senha incorretos!',
      })
      return;
    }
  }
}

const limpar = function (){
  localStorage.clear();
  window.location = window.location;
}  

function mostrarCadastros(){
  let cadastros = localStorage.getItem("dadosCadastros");
  if (cadastros == null)
    alert("Não existe nenhum cadastro.");
  else {
    let listagemRegistros = document.getElementById("listaDeRegistro")
    cadastros = JSON.parse(cadastros);
  };
}

function validateUserType(){
  let user = JSON.parse(localStorage.getItem('loggedUser')) 

  // if(user === "user"){
  //   window.location = "../userArea/registerStock/index.html"
  // } else {
  //   console.log("aaa")
  //   window.location = "../companyArea/registerPoint/index.html"
  // }

  console.log("user",user);
}


(function($) {

	"use strict";


})(jQuery);