function listStockPoints() {
    let stockPoints = JSON.parse(localStorage.getItem("stockPoints"))
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    
    let userStockPoints = stockPoints.filter(function(stockPoint) {
        return stockPoint.userID === loggedUser.id 
    });
    printListStockPoints(userStockPoints)
}

function printListStockPoints(stockPoints) {
    let htmlListString = "";
    for(i = 0; i < stockPoints.length; i++) {
        htmlListString += 
            `<ul class="list-group" style="width: 310px; margin: 50px 0 0 100px; display: inline-block">` +
            `<li class="list-group-item" style="text-align: center; background-color: #3c8b63; color: white; padding: 13px;">Ponto de Estoque</li>` +
            `<li class="list-group-item bg-light"><b>CEP:</b> ${stockPoints[i].cep}</li>` +
            `<li class="list-group-item bg-light"><b>Cidade:</b> ${stockPoints[i].localidade}</li>` +
            `<li class="list-group-item bg-light"><b>Bairro:</b> ${stockPoints[i].bairro}</li>` +
            `<li class="list-group-item bg-light"><b>Rua:</b> ${stockPoints[i].logradouro}</li>` +
            `<li class="list-group-item bg-light"><b>Número:</b> ${stockPoints[i].numero}</li>` +
            `<li class="list-group-item bg-light"><b>Complemento:</b> ${stockPoints[i].complemento}</li>` +
            `${getHtmlStockPointItemsList(stockPoints[i].stockItems, stockPoints[i].id)}` +
            `<li class="list-group-item"><button class='btn btn-danger w-100' onclick="removeItemById(${i})">Excluir estoque</button></li></ul>` 
    }
    document.getElementById('stockPointsList').innerHTML = htmlListString
}

function getHtmlStockPointItemsList(stockItems, stockPointId) {
    console.log(stockPointId);
    let htmlString = `<div class="limiter">
                <div class="wrap-table100">
                    <div class="table100 ver5" style="background-color: #F8F9FA;">
                        <div class="table100-head">
                            <table>
                                <thead>
                                    <tr class="row100 head">
                                        <th class="cell100 column7">Tipo de lixo</th>
                                        <th class="cell100 column8">Quantidade</th>
                                        <th class="cell100 column8">Opções</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="table100-body js-pscroll">
                            <table>
                                <tbody>`

    for(y = 0; y < stockItems.length; y++) {
        "qbr123"
        htmlString += 
        `<tr class="row100 body">
            <td class="cell100 column7">${stockItems[y].trashType}</td>
            <td class="cell100 column8">${stockItems[y].amountTrash}</td>
            <td class="cell100 column8"><button class='btn btn-danger btn-sm' onclick="removeStockItemsById('${stockItems[y].id}','${stockPointId}')">Excluir</button></td>
        </tr>`
    }

    return htmlString + `</tbody></table></div></div></div></div>`;

} 

function removeItemById(id) {

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
            'O ponto com estoque foi excluído',
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

function removeStockItemsById(idItem, stockPointId){
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

(function ($) {
	"use strict";
	$('.column100').on('mouseover',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).addClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).addClass('hov-column-head-'+ verTable);
	});

	$('.column100').on('mouseout',function(){
		var table1 = $(this).parent().parent().parent();
		var table2 = $(this).parent().parent();
		var verTable = $(table1).data('vertable')+"";
		var column = $(this).data('column') + ""; 

		$(table2).find("."+column).removeClass('hov-column-'+ verTable);
		$(table1).find(".row100.head ."+column).removeClass('hov-column-head-'+ verTable);
	});
    
})(jQuery);

listStockPoints()