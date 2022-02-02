function validarPreenchimentoCampos() {
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
  
    console.log("usuario", usuario);
  
    if(!usuario || !senha) {
      alert("Preencha os dois campos para realizar o cadastro!")
      return;
    }
    cadastrar(usuario, senha);
  }
  
  function cadastrar(usuario, senha) {
    let dadosCadastros = {
      username: usuario,
      password: senha,
      id: Math.floor(Date.now() * Math.random()).toString(36)
    };
  
    let cadastros = localStorage.getItem("dadosCadastros"); 
    
   if (cadastros == null) cadastros = [];
    else cadastros = JSON.parse(cadastros);
    cadastros.push(dadosCadastros);
    localStorage.setItem("dadosCadastros", JSON.stringify(cadastros)) 
    alert("Cadastro " + "'" + usuario + "'" + " realizado com sucesso!");
    window.location="../info/index.html"
  }
  
  function listarCadastros() {
    let cadastros = localStorage.getItem("dadosCadastros");
    if (cadastros == null)
    alert("Ainda não há cadastros realizados.");
    else {
      let elementoTela = document.getElementById("listagemRegistros")
      cadastros = JSON.parse(cadastros);
      elementoTela.innerHTML += '<ul class="list-group" > <br>';
      cadastros.forEach(cadastro => {
        elementoTela.innerHTML += '<li style="background-color: white;" class="list-group-item" >Nome: ' + cadastro.username + '</li>';
        elementoTela.innerHTML += '<li class="list-group-item ">Senha: ' + cadastro.password + '</li> <br>';
      });
    }
  }
  
  function login() {
    let usuarioInput = document.getElementById('usuario').value
    let senhaInput = document.getElementById('senha').value
  
    let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"));
  
    if (usuariosCadastrados === null) {
      alert("Não existem usuários cadastrados");
    }
  
    console.log(usuariosCadastrados);
    
    for (let i=0; i<usuariosCadastrados.length; i++){
      usuariosCadastrados[i]
      let usuario = usuariosCadastrados[i]
      let senha = usuariosCadastrados[i]
      console.log(usuario);
      if (usuario.username === usuarioInput && senha.password === senhaInput) {
        localStorage.setItem("loggedUser", JSON.stringify({id: usuario.id})) 

      window.location="../form/userStockPoint/index.html"
        
        
        return;
      } else {
        alert("Usuário ou senha incorretos")
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