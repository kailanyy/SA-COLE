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
    console.log(acceptedTrash);

     if (!cep || !logradouro || !numero || !bairro || !localidade) {
         alert('Todos os campos devem estar preenchidos!')
         return;
     }
     saveCollectionPoint({
         cep,
         localidade,
         logradouro,
         bairro,
         numero,
         complemento,
         acceptedTrash
     })
}

function saveCollectionPoint(formFields) {
    
    let collectionPoint = localStorage.getItem("collectionPoint");
    let userInfo = JSON.parse(localStorage.getItem('loggedUser'));

    formFields = {
        ...formFields,
        userID: userInfo.id,
        id: Math.floor(Date.now() * Math.random()).toString(36)
    }
    console.log(formFields);
    
    if (collectionPoint == null) collectionPoint = [];
    else collectionPoint = JSON.parse(collectionPoint);
    collectionPoint.push(formFields);
    localStorage.setItem("collectionPoint", JSON.stringify(collectionPoint)) 
    alert("Ponto de coleta cadastrado com sucesso!");
    

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