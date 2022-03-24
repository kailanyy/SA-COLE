function listCollectionPoints() {
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))

  let companyCollectionPoints = collectionPoint.filter(function(collectionPoint) {
    return collectionPoint.userID === loggedUser.id 
  });

  printListCollectionPoints(companyCollectionPoints)
}

function printListCollectionPoints(collectionPoint) {
  let htmlListString = "";
  
  for(i = 0; i < collectionPoint.length; i++) {
    htmlListString += 
        `<ul class="list-group" style="width: 330px; margin: 0 0 5% 90px; display: inline-block">` +
        `<li class="list-group-item" style="text-align: center; background-color: #495371; color: white; padding: 13px;"><span class="icofont-recycle"> </span>Ponto de coleta</li>` +
        `<li class="list-group-item bg-light"><b>CEP: </b>${collectionPoint[i].cep}</li>` +
        `<li class="list-group-item bg-light"><b>Cidade: </b>${collectionPoint[i].localidade}</li>` +
        `<li class="list-group-item bg-light"><b>Bairro: </b>${collectionPoint[i].bairro}</li>` +
        `<li class="list-group-item bg-light"><b>Rua: </b>${collectionPoint[i].logradouro}</li>` +
        `<li class="list-group-item bg-light"><b>Número: </b>${collectionPoint[i].numero}</li>` +
        `<li class="list-group-item bg-light"><b>Complemento: </b>${collectionPoint[i].complemento}</li>` +
        `<li class="list-group-item bg-light"><b>Telefone: </b>${collectionPoint[i].telefone}</li>` +
        `<li class="list-group-item bg-light text-center">${getAcceptedTrash(collectionPoint[i].acceptedTrash, collectionPoint[i].id)}</li>` +
        `<li class="list-group-item"><button class='btn btn-success w-100' onclick="validateNewListItem('${collectionPoint[i].id}')">Adicionar lixos aceitos</button></li>` +
        `<li class="list-group-item"><button class='btn btn-danger w-100' onclick="removeItemById(${i})">Excluir ponto de coleta</button></li></ul>` 
    }

      document.getElementById('collectionPointsList').innerHTML = htmlListString
}

function getAcceptedTrash(acceptedTrash, pointId) {
  let htmlString = `<div class="limiter">
        <div class="wrap-table100">
            <div class="table100 ver5" style="background-color: #F8F9FA;">
                <div class="table100-head">
                    <table>
                        <thead>
                            <tr class="row100 head">
                                <th class="cell100 column9">Tipos de lixos aceitos</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div class="table100-body js-pscroll">
                    <table>
                        <tbody>`

    for(y = 0; y < acceptedTrash.length; y++) {
      htmlString +=
      `<tr class="row100 body">
          <td class="cell100 column6">${acceptedTrash[y]}</td>
          <td class="cell100 column8"><button class='btn btn-danger btn-sm' onclick="removeAcceptedItemByIndex(${y},'${pointId}')">Excluir</button></td> 
      </tr>`

    }

    return htmlString + `</tbody></table></div></div></div></div>`;
}

async function validateNewListItem(collectionPointId) {
  await Swal.fire({
      title: 'Adicionando tipos de lixo ao ponto de coleta',
      html: 
      `                    <div class="col-6">
      <input class="mx-1" name="acceptedTrash" type="checkbox" value="Lâmpada">Lâmpada</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Geladeira">Geladeira</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Pilha">Pilha</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Bateria">Bateria</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Fio">Fio</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Carregador">Carregador</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Celular">Celular</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Telefone">Telefone</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Rádio">Rádio</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Fogão">Fogão</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Micro-ondas">Micro-ondas</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Televisor">Televisor</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Aparelho de Som">Aparelho de Som</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Câmera Fotográfica">Câmera Fotográfica</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Impressora">Impressora</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Teclado">Teclado</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Monitor">Monitor</input>
      </div>
      <div class="col-6">
          <input class="mx-1" name="acceptedTrash" type="checkbox" value="Tablet">Tablet</input>
      </div>
      <div class="w-100"></div>
      <div class="col-6">
      </div>`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Adicionar',
    }).then((result) => {
      
    })

    let checkboxes = [...document.querySelectorAll('input[name=acceptedTrash]:checked')];
    let acceptedTrash = checkboxes.map(function(checkbox){
    return checkbox.value;
    })

  if (!acceptedTrash) {
      Swal.fire({
          title: 'Selecione um tipo de lixo.',
          showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
          }
      })
      return;
  }

  itemIndex = [
    acceptedTrash
  ]
  
  Swal.fire('Item Adicionado!')
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))
  let pointIndex = collectionPoint.findIndex(function(collectionPoint){
      return collectionPoint.id === collectionPointId
  });
  collectionPoint[pointIndex].acceptedTrash.push(itemIndex)
  localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
  listCollectionPoints()
}

function removeItemById(id) {
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

function removeAcceptedItemByIndex(itemIndex, collectionPointId){
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))

  let pointIndex = collectionPoint.findIndex(function(collectionPoint){
      return collectionPoint.id === collectionPointId
  });
  collectionPoint[pointIndex].acceptedTrash.splice(itemIndex, 1)
  localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
  listCollectionPoints()
}

listCollectionPoints()