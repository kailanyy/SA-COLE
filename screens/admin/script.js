// função que lista as contas cadastradas no sistema. pega os dados do localStorage e mostra em forma de tabela

function listAccounts() {
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
              <tbody id="list">
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
            <td class="cell100 column1"><button class='btn btn-danger' onclick="removeAccount(${i})">Excluir</button></td>
        </tr>
    </tbody>`

     }
  }

  document.getElementById('list').innerHTML = htmlListString
}

// função que exclui a conta pelo ID dela

function removeAccount(id) {
  let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))

  Swal.fire({
    title: 'Você tem certeza?',
    text: "Você não será capaz de reverter essa ação!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sim, excluir'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Excluído!',
        'A conta foi excluída.',
        'success'
        )
        let index = usuariosCadastrados.find(function(usuariosCadastrados){
          return usuariosCadastrados.id === id 
        });
        usuariosCadastrados.splice(index, 1)
        localStorage.setItem("dadosCadastros", JSON.stringify(usuariosCadastrados)) 
        listAccounts()
    }
  })
}

// função que lista os pontos de coleta cadastrados no sistema. pega os dados do localStorage e mostra em forma de tabela

function listCollectionPoints() {
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))
  let htmlListString = `<table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1">#</th>
                  <th class="cell100 column2">Localização</th>
                  <th class="cell100 column6">Lixos aceitos</th>
                  <th class="cell100 column6">Ação</th>
                </tr>
              </thead>
              <tbody id="list">
              </tbody>
              </table>`

  if (collectionPoint == null){
      htmlListString = ""
      Swal.fire({
        title: 'Ainda não há pontos de coleta cadastrados.',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
    })

  } else {
      for(i = 0; i < collectionPoint.length; i++) {

        htmlListString += `<tbody>
        <tr class="row100 body">
            <td class="cell100 column1">${i}</td>
            <td class="cell100 column2">${collectionPoint[i].cep}, ${collectionPoint[i].localidade}, ${collectionPoint[i].bairro},\n${collectionPoint[i].logradouro}, ${collectionPoint[i].numero}, ${collectionPoint[i].complemento}</td>
            <td class="cell100 column5">${collectionPoint[i].acceptedTrash}</td>
            <td class="cell100 column1"><button class='btn btn-danger' onclick="removeCollectionPoint(${i})">Excluir</button></td>
        </tr>
    </tbody>`

      }
  }

  document.getElementById('list').innerHTML = htmlListString
}

// função que exclui os pontos de coleta pelo ID

function removeCollectionPoint(id) {
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))

  Swal.fire({
    title: 'Você tem certeza?',
    text: "Você não será capaz de reverter essa ação!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Sim, excluir'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Excluído!',
        'O ponto de coleta foi excluído.',
        'success'
        )
        let index = collectionPoint.find(function(collectionPoint){
          return collectionPoint.id === id 
        });
        collectionPoint.splice(index, 1)
        localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
        listCollectionPoints()
    }
  })
}

// função que lista os estoques de lixo cadastrados no sistema. pega os dados do localStorage e mostra em forma de tabela

function listStockPoints() {
  let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
  let htmlListString = `<table>
              <thead>
                <tr class="row100 head">
                  <th class="cell100 column1">#</th>
                  <th class="cell100 column2">Localização</th>
                  <th class="cell100 column6">Contato</th>
                  <th class="cell100 column6">Ação</th>
                </tr>
              </thead>
              <tbody id="list">
              </tbody>
              </table>`

  if (stockPoints == null){
    htmlListString = ""
    Swal.fire({
      title: 'Ainda não há estoques de lixo cadastrados.',
      showClass: {
      popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
      }
  })

  } else {
     for(i = 0; i < stockPoints.length; i++) {

        htmlListString += `<tbody>
        <tr class="row100 body">
            <td class="cell100 column1">${i}</td>
            <td class="cell100 column2">${stockPoints[i].cep}, ${stockPoints[i].localidade}, ${stockPoints[i].bairro},\n${stockPoints[i].logradouro}, ${stockPoints[i].numero}, ${stockPoints[i].complemento}</td>
            <td class="cell100 column5">${stockPoints[i].telefone}</td>
            <td class="cell100 column1"><button class='btn btn-danger' onclick="removeStockPoint(${i})">Excluir</button></td>
        </tr>
    </tbody>`

     }
  }

  document.getElementById('list').innerHTML = htmlListString
}

// função que exclui os estoques de lixo pelo ID

function removeStockPoint(id) {
  let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))

  Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não será capaz de reverter essa ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Excluído!',
          'O estoque de lixo foi excluído.',
          'success'
          )
          let index = stockPoints.find(function(stockPoint){
              return stockPoint.id === id 
          });
          stockPoints.splice(index, 1)
          localStorage.setItem("stockPoints", JSON.stringify(stockPoints)) 
          listStockPoints()
      }
    })
}