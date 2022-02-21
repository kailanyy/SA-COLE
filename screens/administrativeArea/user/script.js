// function excluirCadastros(idExcluir) {
//     usuariosCadastrados = JSON.parse(usuariosCadastrados);
//     usuariosCadastrados.filter(e => { e.id != idExcluir })
// }

function listarCadastros() {
    let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
    let htmlListString = ""
    for(i = 0; i < usuariosCadastrados.length; i++) {
        htmlListString += 
            "<tr class='table-light'>" +
                `<th scope='row'></th>` +
                `<td>${usuariosCadastrados[i].username}</td>` +
                `<td>${usuariosCadastrados[i].password}</td>` +
                `<td><button class='btn btn-light' onclick="removeItemById(${i})">Excluir</button></td>` +
            "</tr>"
    }

    console.log(htmlListString);

    document.getElementById('listarCadastro').innerHTML = htmlListString
}

function removeItemById(id) {
    let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
    
    let index = usuariosCadastrados.find(function(usuariosCadastrados){
        return usuariosCadastrados.id === id 
    });
    usuariosCadastrados.splice(index, 1)
    localStorage.setItem("dadosCadastros", JSON.stringify(usuariosCadastrados)) 
    listarCadastros()
  }
  
  listarCadastros()