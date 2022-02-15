function listCollectionPoints() {
  let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))

  let companyCollectionPoints = collectionPoint.filter(function(collectionPoint) {
    return collectionPoint.userID === loggedUser.id 
  });

  printListCollectionPoints(companyCollectionPoints)
  console.log("Filter:", companyCollectionPoints);
  console.log("listCollectionPoints:", listCollectionPoints);
}

function printListCollectionPoints(collectionPoint) {
  let htmlListString = ""
  console.log("collectionPoint.length", collectionPoint.length);
  
  for(i = 0; i < collectionPoint.length; i++) {
    console.log(i);
    htmlListString += 
        `<li class="list-group-item" style="text-align: center; background-color: #126E82; color: white;">Ponto de coleta</li>` +
        `<li class="list-group-item bg-light"><b>CEP: </b>${collectionPoint[i].cep}</li>` +
        `<li class="list-group-item bg-light"><b>Cidade: </b>${collectionPoint[i].localidade}</li>` +
        `<li class="list-group-item bg-light"><b>Bairro: </b>${collectionPoint[i].bairro}</li>` +
        `<li class="list-group-item bg-light"><b>Rua: </b>${collectionPoint[i].logradouro}</li>` +
        `<li class="list-group-item bg-light"><b>Número: </b>${collectionPoint[i].numero}</li>` +
        `<li class="list-group-item bg-light"><b>Complemento: </b>${collectionPoint[i].complemento}</li>` +
        `<li class="list-group-item bg-light text-center"><b>Tipos de lixos aceitos</b>${getAcceptedTrash(collectionPoint[i].acceptedTrash)}</li>` +
        `<li class="list-group-item mb-3"><button class='btn bg-light' onclick="removeItemById(${i})">Excluir</button></li>`
}

console.log(htmlListString);

document.getElementById('collectionPointsList').innerHTML = htmlListString

}

function getAcceptedTrash(acceptedTrash) {
  console.log(getAcceptedTrash);
  let htmlString = ""
  for(i = 0; i < acceptedTrash.length; i++) {
    htmlString +=
    `<li class="list-group-item bg-light text-center">${acceptedTrash[i]}</li>` 
  }

  return htmlString;

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

listCollectionPoints()