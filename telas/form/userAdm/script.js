function mostrarCadastros(cadastros){
    let usuariosCadastrados = localStorage.getItem("dadosCadastros");
    let listagemRegistros ='<table class="table"><thead><tr>'
    '<th scope="col">Id</th>' +
    '<th scope="col">Usuario</th>' +
    '<th scope="col">Senha</th>' +
    '<th scope="col">Ação</th></tr></thead>' +
    '<tbody><tr>';
    for (i = 0; i < usuariosCadastrados.length; i++){
    
    listagemRegistros +=
    "<tr class='table-light'>" +
    `<td>${cadastro[i].username}</td>` +
    `<td>${cadastro[i].password}</td>` +
    "</tr>"
    document.getElementById("listaDeRegistro").innerHTML = listagemRegistros
    }}