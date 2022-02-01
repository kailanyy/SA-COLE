function listStockPoints() {
    let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    
    let userStockPoints = stockPoints.filter(function(stockPoint) {
        return stockPoint.userID === loggedUser.id 
    });
    printListStockPoints(userStockPoints)

    console.log("Resultado do filter", userStockPoints);
    console.log(stockPoints);
}

function printListStockPoints(stockPoints) {
    let htmlListString = "";
    console.log("stockPoints.length", stockPoints.length);
    for(i = 0; i < stockPoints.length; i++) {
        console.log(i);
        htmlListString += 
            `<li class="list-group-item" style="text-align: center; background-color: #126E82; color: white;">Ponto de Estoque</li>` +
            `<li class="list-group-item bg-light"><b>CEP:</b> ${stockPoints[i].cep}</li>` +
            `<li class="list-group-item bg-light"><b>Cidade:</b> ${stockPoints[i].localidade}</li>` +
            `<li class="list-group-item bg-light"><b>Bairro:</b> ${stockPoints[i].complemento}</li>` +
            `<li class="list-group-item bg-light"><b>Rua:</b> ${stockPoints[i].logradouro}</li>` +
            `<li class="list-group-item bg-light"><b>Número:</b> ${stockPoints[i].numero}</li>` +
            `<li class="list-group-item bg-light"><b>Complemento:</b> ${stockPoints[i].complemento}</li>` +
            `${getHtmlStockPointItemsList(stockPoints[i].stockItems)}` +
            `<li class="list-group-item mb-3"><button class='btn bg-light' onclick="removeItemById(${i})">Excluir</button></li>`
    }

    console.log(htmlListString);

    document.getElementById('stockPointsList').innerHTML = htmlListString
}

function getHtmlStockPointItemsList(stockItems) {
    
    console.log("Items de estoque", stockItems);
    let htmlString = "<table class='table table-light' style='text-align: center;'>" +
        "<thead>" +
          "<tr>" +
            "<th scope='col'>Tipo de Lixo</th>" + 
            "<th scope='col'>Quantidade</th>" + 
          "</tr>" +
        "</thead>" +
        `<tbody>`

    for(y = 0; y < stockItems.length; y++) {
        console.log("for item");
        htmlString += 
            "<tr class='table-light'>" +
            `<td>${stockItems[y].trashType}</td>` +
            `<td>${stockItems[y].amountTrash}</td>` +
            "</tr>"
    }

    console.log("htmlString:", htmlString);

    return htmlString + "</tbody></table>";

} 

function removeItemById(id) {
    let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
    
    let index = stockPoints.find(function(stockPoint){
        return stockPoint.id === id 
    });
    stockPoints.splice(index, 2)
    localStorage.setItem("stockPoints", JSON.stringify(stockPoints)) 
    listStockPoints()
}

listStockPoints()

