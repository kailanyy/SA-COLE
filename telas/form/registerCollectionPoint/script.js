function validateFields() {
    let cep = document.getElementById('cepField').value;
    let rua = document.getElementById('ruaField').value;
    let bairro = document.getElementById('bairroField').value;
    let complemento = document.getElementById('complementoField').value;

    if (!cep || !rua || !bairro || !complemento) {
        alert('Todos os campos devem estar preenchidos!')
        return;
    }
    saveCollectionPoint({
        cep,
        rua,
        bairro,
        complemento
    })
}

function saveCollectionPoint(formFields) {
    console.log("Estamos dentro da função saveCollectionPoint, parametros: ");
    console.log(formFields);
}