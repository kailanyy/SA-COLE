function listarCadastros() {
  let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
  let htmlListString = `<table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1">#</th>
                  <th class="cell100 column2">Usuário</th>
                  <th class="cell100 column6">Senha</th>
                  <th class="cell100 column6">Ação</th>
                </tr>
              </thead>
              <tbody id="listarCadastro">
              </tbody>
              </table>`

  if (usuariosCadastrados == null){
    htmlListString = ""
    Swal.fire({
      title: 'Ainda não há contas cadastradas.',
      showClass: {
      popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
      }
  })

  } else {
     for(i = 0; i < usuariosCadastrados.length; i++) {

        htmlListString += `<tbody>
        <tr class="row100 body">
            <td class="cell100 column1">${i}</td>
            <td class="cell100 column2">${usuariosCadastrados[i].username}</td>
            <td class="cell100 column5">${usuariosCadastrados[i].password}</td>
            <td class="cell100 column1"><button class='btn btn-danger' onclick="removeItemById(${i})">Excluir</button></td>
        </tr>
    </tbody>`

     }
  }

  document.getElementById('listagem').innerHTML = htmlListString
}

//  function removeItemById(id) {
//      let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
    
//      let index = usuariosCadastrados.find(function(usuariosCadastrados){
//         return usuariosCadastrados.id === id 
//      });
//      usuariosCadastrados.splice(index, 1)
//      localStorage.setItem("dadosCadastros", JSON.stringify(usuariosCadastrados)) 
//      listarCadastros()
//    }
  
//    listarCadastros()