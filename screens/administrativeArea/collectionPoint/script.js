function listarPontosdeColeta() {
    let collectionPoint = JSON.parse(localStorage.getItem("collectionPoint"))
    let htmlListString = ""
    for(i = 0; i < collectionPoint.length; i++) {
        htmlListString += 
            "<tr class='table-light'>" +
                `<th scope='row'></th>` +
                `<td>${collectionPoint[i].cep}, ${collectionPoint[i].cep},${collectionPoint[i].localidade},${collectionPoint[i].bairro},${collectionPoint[i].logradouro},${collectionPoint[i].numero},${collectionPoint[i].complemento} </td>` +
                `<td>${collectionPoint[i].acceptedTrash }</td>` +
                `<td><button class='btn btn-light' onclick="removeItemById(${i})">Excluir</button></td>` +
            "</tr>"
    }

    console.log(htmlListString);

    document.getElementById('listarPontosdeColeta').innerHTML = htmlListString
}

function removeItemById(id) {
    let collectionPoint = JSON.parse(localStorage.getItem("dadosCadastros"))
    
    let index = collectionPoint.find(function(collectionPoint){
        return collectionPoint.id === id 
    });
    collectionPoint.splice(index, 1)
    localStorage.setItem("dadosCadastros", JSON.stringify(collectionPoint)) 
    listarPontosdeColeta()
  }
  
  listarPontosdeColeta()