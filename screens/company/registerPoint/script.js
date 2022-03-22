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

function formatarTelefone(telefone){
    if(telefone.value.length == 0){
        telefone.value = '(' + telefone.value

    } else if(telefone.value.length == 3){
        telefone.value = telefone.value + ') '

    } else if(telefone.value.length == 10){
        telefone.value = telefone.value + '-'
    }
}

function validateFields() {
    let cep = document.getElementById('cep').value;
    let localidade = document.getElementById('localidade').value;
    let logradouro = document.getElementById('logradouro').value;
    let bairro = document.getElementById('bairro').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;
    let telefone = document.getElementById('telefone').value;
    let checkboxes = [...document.querySelectorAll('input[name=acceptedTrash]:checked')];
    let acceptedTrash = checkboxes.map(function(checkbox){
        return checkbox.value;
    })

    // ainda sendo um  array

    // console.log("acceptedTrash Array",acceptedTrash);

    // transformando em objeto

    // let acceptedTrashobj = acceptedTrash;
    //  acceptedTrash = Object.assign({}, acceptedTrashobj);

    // console.log("acceptedTrash",acceptedTrash)
    // console.log("acceptedTrashobj",acceptedTrashobj)

    //  acceptedTrash = {...acceptedTrash};
    // console.log(acceptedTrash);


  
     if (!cep || !logradouro || !numero || !bairro || !localidade || !complemento || !telefone) {
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

    //  acceptedTrash = {
    //      id: Math.floor(Date.now() * Math.random()).toString(36),
    //      ...acceptedTrash
    //  }

    //  acceptedTrash = ({
    //     acceptedTrash,
    //     id: Math.floor(Date.now() * Math.random()).toString(36)
    // })


     saveCollectionPoint({
         cep,
         localidade,
         logradouro,
         bairro,
         numero,
         complemento,
         telefone,
         acceptedTrash,
        })
}

async function saveCollectionPoint(formFields) {    
    let collectionPoint = localStorage.getItem("collectionPoint");

    let userInfo = JSON.parse(localStorage.getItem('loggedUser'));
        
    var address = `${formFields.logradouro}, ${formFields.numero}` 

    let results = await getLatitudeLongitude(address);
    
    formFields = {
        ...formFields,
        ...results,
        id: Math.floor(Date.now() * Math.random()).toString(36),
        userID: userInfo.id, 
    }
    
    if (collectionPoint == null) collectionPoint = [];
    else collectionPoint = JSON.parse(collectionPoint);
    collectionPoint.push(formFields);
    localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
     
    await Swal.fire({
        title: 'Ponto de coleta cadastrado com sucesso!',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
    })
    window.location = "../myCollectionPoints/index.html";
}

function listCollectionPoint() {
    let collectionPoint = localStorage.getItem("collectionPoint");
    if (collectionPoint == null)
    alert("Ainda não há pontos de coleta cadastrados.");
    else {
      let elementoTela = document.getElementById("listCollectionPoint")
      collectionPoint = JSON.parse(collectionPoint);
      elementoTela.innerHTML += '<ul class="list-group"> <br>';
      collectionPoint.forEach(collectionPointInfo => {
        elementoTela.innerHTML += '<li class="list-group-item" >CEP: ' + collectionPointInfo.cep + '</li>';
        elementoTela.innerHTML += '<li class="list-group-item ">Cidade: ' + collectionPointInfo.localidade + '</li> <br>';
      });
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