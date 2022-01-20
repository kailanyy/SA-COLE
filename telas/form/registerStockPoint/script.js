let newPointItems = []

$("#cep").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        dataType: 'json',
        
        success: function(resposta){
            $("#logradouro").val(resposta.logradouro);
            $("#complemento").val(resposta.complemento);
            $("#bairro").val(resposta.bairro);
            $("#cidade").val(resposta.localidade);
            $("#localidade").val(resposta.localidade);
            $("#numero").focus();
        }
    });
});

function validateFields() {
    let cep = document.getElementById('cep').value;
    let localidade = document.getElementById('localidade').value;
    let logradouro = document.getElementById('logradouro').value;
    let bairro = document.getElementById('bairro').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;

    if (!cep || !logradouro || !numero || !bairro || !localidade) {
        alert('Todos os campos devem estar preenchidos')
        return;
    }
    saveStockPoint({
        cep,
        localidade,
        logradouro,
        bairro,
        numero,
        complemento
    })
}

function saveStockPoint(formFields) {
    console.log("Estamos dentro da função saveStockPoint, parametros: ");
    console.log(formFields);

    let stockPoint = localStorage.getItem("stockPoints");

    if (stockPoint == null) stockPoint = [];
    else stockPoint = JSON.parse(stockPoint);
    stockPoint.push(formFields);
    localStorage.setItem("stockPoints", JSON.stringify(stockPoint)) 
    alert("Ponto de estoque cadastrado com sucesso!");
}


function validateNewListItem() {
    let trashType = document.getElementById('trashType').value;
    let amountTrash = document.getElementById('amountTrash').value;
console.log(trashType, amountTrash);
    if (!trashType || !amountTrash) {
        alert('Todos os campos devem estar preenchidos')
        return;
    } 
    addItem({
        trashType,
        amountTrash
    })
}

function addItem(item) {
    console.log(item);
    newPointItems.push(item)
    console.log(newPointItems);
    printListItems();
}

function printListItems() {
    let htmlListString = "";
    for(i = 0; i < newPointItems.length; i++) {
        htmlListString += 
            "<tr class='table-light'>" +
                `<th scope='row'>${i}</th>` +
                `<td>${newPointItems[i].trashType}</td>` +
                `<td>${newPointItems[i].amountTrash}</td>` +
                `<td><button class='btn btn-light' onclick="removeItemByIndex(${i})">Excluir</button></td>` +
            "</tr>"
    }

    console.log(htmlListString);

    document.getElementById('listRegisteredItems').innerHTML = htmlListString
}

function removeItemByIndex(index) {
    console.log(index);
    newPointItems.splice(index, 1)
    printListItems();
}