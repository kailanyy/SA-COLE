let newPointItems = []

function getResult(result) {
    return {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng()
    }
}

async function getLatitudeLongitude(address) {
    address = address || 'Ferrol, Galicia, Spain';
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        let geocoderSearch = await geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                return results[0];
            }
        });

        return {
            lat: geocoderSearch.results[0].geometry.location.lat(),
            lng: geocoderSearch.results[0].geometry.location.lng()
        };
    }
}

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

    if (!cep || !logradouro || !numero || !bairro || !localidade || !complemento || !newPointItems.length) {
        Swal.fire({
            title: 'Todos os campos devem estar preenchidos',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
            }
        })
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

async function saveStockPoint(formFields) {

    let stockPoint = localStorage.getItem('stockPoints');
    let userInfo = JSON.parse(localStorage.getItem('loggedUser'));

    var address = `${formFields.logradouro}, ${formFields.numero}` 

    let results = await getLatitudeLongitude(address);

    formFields = {
        ...formFields,
        ...results,
        stockItems: newPointItems,
        userID: userInfo.id,
        id: Math.floor(Date.now() * Math.random()).toString(36)
    }

    if (stockPoint == null) stockPoint = [];
    else stockPoint = JSON.parse(stockPoint);
    stockPoint.push(formFields);
    localStorage.setItem("stockPoints", JSON.stringify(stockPoint)) 
    
    await Swal.fire({
        title: 'Ponto de estoque cadastrado com sucesso!',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
    })
    window.location = "../myStockPoints/index.html";
}

function validateNewListItem() {
    let trashType = document.getElementById('trashType').value;
    let amountTrash = document.getElementById('amountTrash').value;

    if (!trashType || !amountTrash) {
        Swal.fire({
            title: 'Todos os campos devem estar preenchidos',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
            }
        })
        return;
    } 
    Swal.fire('Item Adicionado!')
    addItem({
        trashType,
        amountTrash,
        id: Math.floor(Date.now() * Math.random()).toString(36)
    })
}

function addItem(item) {
    newPointItems.push(item)
    printListItems();
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