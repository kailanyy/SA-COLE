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
    for(i = 0; i < stockPoints.length; i++) {
        htmlListString += 
            `<ul class="list-group" style="width: 40%; margin: auto;">` +
                `<li class="list-group-item list-group-item-success">${stockPoints[i].bairro}</li>` +
                `<li class="list-group-item">${stockPoints[i].cep}</li>` +
                `<li class="list-group-item">${stockPoints[i].complemento}</li>` +
                `<li class="list-group-item">${stockPoints[i].localidade}</li>` +
                `<li class="list-group-item">${stockPoints[i].logradouro}</li>` +
                `<li class="list-group-item">${stockPoints[i].numero}</li>` +
                `<li class="list-group-item mb-3"><button class='btn btn-light' onclick="removeItemByIndex(${i})">Excluir</button></li>` +
            "</ul>"
    }

    console.log(htmlListString);

    document.getElementById('stockPointsList').innerHTML = htmlListString
}

