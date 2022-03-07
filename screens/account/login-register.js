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
  localStorage.setItem("loggedUser", JSON.stringify({id: dadosCadastros.id, typeUser, username: dadosCadastros.username}))
  if(typeUser === "user"){
    window.location = "../user/registerStock/index.html";
  }
  if(typeUser === "company"){
    window.location = "../company/registerPoint/index.html"
  }
}
  
function login(typeUser){
  let usuarioInput = document.getElementById('usuario').value
  let senhaInput = document.getElementById('senha').value

  let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"));

  for (let i=0; i<usuariosCadastrados.length; i++){
    if(usuarioInput === usuariosCadastrados[i].username && senhaInput === usuariosCadastrados[i].password){
      localStorage.setItem("loggedUser", JSON.stringify({id: usuariosCadastrados.id, typeUser}))
      if (usuariosCadastrados[i].typeUser === "user") {
        window.location = "../userArea/registerStock/index.html"
        return;
      }
      if (usuariosCadastrados[i].typeUser === "company") {
        window.location = "../companyArea/registerPoint/index.html"
        return;
      }
      return;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuário ou senha incorretos!',
      })
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
  // let user = JSON.parse(localStorage.getItem('loggedUser')) 

  // if(user === "user"){
  //   window.location = "../userArea/registerStock/index.html"
  // } else {
  //   window.location = "../companyArea/registerPoint/index.html"
  // }
}

(function($) {

	"use strict";

})(jQuery);