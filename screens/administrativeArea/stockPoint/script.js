function listarPontosdeEstoque() {
    let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
    let htmlListString = ""
    for(i = 0; i < stockPoints.length; i++) {
        htmlListString += 
            "<tr class='table-light'>" +
                `<th scope='row'></th>` +
                `<td>${stockPoints[i].cep}, ${stockPoints[i].cep},${stockPoints[i].localidade},${stockPoints[i].bairro},${stockPoints[i].logradouro},${stockPoints[i].numero},${stockPoints[i].complemento} </td>` +
                `<td>${stockPoints[i].acceptedTrash }</td>` +
                `<td><button class='btn btn-light' onclick="removeItemById(${i})">Excluir</button></td>` +
            "</tr>"
    }

    console.log(htmlListString);

    document.getElementById('listarPontosdeEstoque').innerHTML = htmlListString
}

function removeItemById(id) {
    let stockPoints = JSON.parse(localStorage.getItem("dadosCadastros"))
    
    let index = stockPoints.find(function(stockPoints){
        return stockPoints.id === id 
    });
    stockPoints.splice(index, 1)
    localStorage.setItem("dadosCadastros", JSON.stringify(stockPoints)) 
    listarPontosdeColeta()
  }
  
  listarPontosdeEstoque()