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
        `<ul class="list-group" style="width: 310px; margin: 50px 0 0 100px; display: inline-block">` +
        `<li class="list-group-item" style="text-align: center; background-color: #3C8B63; color: white; padding: 13px;">Ponto de Coleta</li>` +
        `<li class="list-group-item bg-light"><b>CEP: </b>${collectionPoint[i].cep}</li>` +
        `<li class="list-group-item bg-light"><b>Cidade: </b>${collectionPoint[i].localidade}</li>` +
        `<li class="list-group-item bg-light"><b>Bairro: </b>${collectionPoint[i].bairro}</li>` +
        `<li class="list-group-item bg-light"><b>Rua: </b>${collectionPoint[i].logradouro}</li>` +
        `<li class="list-group-item bg-light"><b>Número: </b>${collectionPoint[i].numero}</li>` +
        `<li class="list-group-item bg-light"><b>Complemento: </b>${collectionPoint[i].complemento}</li>` +
        `<li class="list-group-item bg-light text-center">${getAcceptedTrash(collectionPoint[i].acceptedTrash)}</li>` +
        `<li class="list-group-item"><button class='btn btn-danger w-100' onclick="removeItemById(${i})">Excluir</button></li></ul>`
    }

      document.getElementById('collectionPointsList').innerHTML = htmlListString
}

function getAcceptedTrash(acceptedTrash) {
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
          <td class="cell100 column8"><button class='btn btn-danger btn-sm' onclick="">Excluir</button></td>
      </tr>`

    }

    return htmlString + `</tbody></table></div></div></div></div>`;
}

function removeItemById(id) {
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))
  
  let index = collectionPoint.find(function(collectionPoint){
      return collectionPoint.id === id 
  });
  collectionPoint.splice(index, 1)
  localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
  listCollectionPoints()
}

function removeAcceptedItemById(idItem, stockPointId){
  console.log("removeStockItemsById",idItem, stockPointId);
  let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
  
  console.log("stockPoints",stockPoints);
  
  let pointIndex = stockPoints.findIndex(function(stockPoint){
      return stockPoint.id === stockPointId
  });

  let itemIndex = stockPoints[pointIndex].stockItems.findIndex(function(stockItem){
      return stockItem.id === idItem
  });
  
  stockPoints[pointIndex].stockItems.splice(itemIndex, 1)

  localStorage.setItem("stockPoints", JSON.stringify(stockPoints)) 
  
  listStockPoints()
}

listCollectionPoints()