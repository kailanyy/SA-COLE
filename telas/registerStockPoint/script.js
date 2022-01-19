// função cep
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

// função add e listagem de itens registrados antes de finalizar o estoque
let itens = []

const add = function(){
    let item = document.getElementById('item')
    let qntdLixo = document.getElementById('qntdLixo')
    
    itens = JSON.parse(localStorage.getItem('itensRegistrados'))
    itens.push([item.value, qntdLixo.value])
    console.log(itens);
    localStorage.setItem('itensRegistrados', JSON.stringify(itens))
    item.value = ""
    qntdLixo.value = ""
}

const list = function(){
    let paragrafoItens = document.getElementById('itensRegistrados')
    paragrafoItens.innerHTML = ""

    itens = JSON.parse(localStorage.getItem('itensRegistrados'))
    
    itens.forEach(item => {
    paragrafoItens.innerHTML += item[0] + " - " + item[1] + "<br>"
    });
}