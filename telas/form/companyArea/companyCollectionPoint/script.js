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
        `<li class="list-group-item" style="text-align: center; background-color: #126E82; color: white;">${collectionPoint[i].bairro}</li>` +
        `<li class="list-group-item bg-light">${collectionPoint[i].cep}</li>` +
        `<li class="list-group-item bg-light">${collectionPoint[i].complemento}</li>` +
        `<li class="list-group-item bg-light">${collectionPoint[i].localidade}</li>` +
        `<li class="list-group-item bg-light">${collectionPoint[i].logradouro}</li>` +
        `<li class="list-group-item bg-light">${collectionPoint[i].numero}</li>` +
        getAcceptedTrash(collectionPoint[i].acceptedTrash)
}

console.log(htmlListString);

document.getElementById('collectionPointsList').innerHTML = htmlListString

}

function getAcceptedTrash(acceptedTrash) {
  console.log(getAcceptedTrash);
  let htmlString = ""
  for(i = 0; i < acceptedTrash.length; i++) {
    htmlString +=
    `<li class="list-group-item bg-light">${acceptedTrash[i]}</li>` 
  }

  return htmlString;

}

listCollectionPoints()