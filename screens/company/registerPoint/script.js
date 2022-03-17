
function showResult(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    console.log("latitude",latitude);
    // document.getElementById('longitude').value = result.geometry.location.lng();
}

function getLatitudeLongitude(callback, address) {
    address = address || 'Ferrol, Galicia, Spain';
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
    console.log(results);
}


function validateFields() {
    let cep = document.getElementById('cep').value;
    let localidade = document.getElementById('localidade').value;
    let logradouro = document.getElementById('logradouro').value;
    let bairro = document.getElementById('bairro').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;
    let checkboxes = [...document.querySelectorAll('input[name=acceptedTrash]:checked')];
    let acceptedTrash = checkboxes.map(function (checkbox){
        return checkbox.value;
    })

     if (!cep || !logradouro || !numero || !bairro || !localidade || !complemento) {
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
     
     saveCollectionPoint({
         cep,
         localidade,
         logradouro,
         bairro,
         numero,
         complemento,
         acceptedTrash,
     })
}

function saveCollectionPoint(formFields, results) {
    
    let collectionPoint = localStorage.getItem("collectionPoint");
    let userInfo = JSON.parse(localStorage.getItem('loggedUser'));
    document.getElementById('latitude').value 
    // let latitude = JSON.parse(localStorage.setItem('latitude'));
    
//    let latitude = JSON.stringify(localStorage.getItem('latitude'));
    // latitude.push(latitude)
//    let latitude = JSON.stringify(localStorage.getItem('latitude')); 

let latitude = document.getElementById("latitude").value;



    formFields = {
        ...formFields,
        userID: userInfo.id,
        id: Math.floor(Date.now() * Math.random()).toString(36),
        results: results
    }
    console.log(formFields);
    
    if (collectionPoint == null) collectionPoint = [];
    else collectionPoint = JSON.parse(collectionPoint);
    collectionPoint.push(formFields);
    localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
     
    Swal.fire({
        title: 'Ponto de coleta cadastrado com sucesso!',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
    })

    for(i = 0; i < collectionPoint.lenght; i++){
    var address = `${collectionPoint[i].logradouro}, ${collectionPoint[i].numero}` }
    getLatitudeLongitude(showResult, address)
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