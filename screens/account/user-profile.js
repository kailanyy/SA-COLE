var iPassword = 0 

function printLoggedUser(){
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) 

  let htmlUser = "";

  htmlUser += document.getElementById('infoLoggedUser').innerHTML = `${loggedUser.username}`

}

function exitAccount() {

  Swal.fire({
    title: 'Sair da conta?',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Voltar',
    confirmButtonText: 'Sim'
  }).then((result) => {
    if (result.isConfirmed) {

    window.location = "../../index.html"
    }
  })
}

function changePassword(){
  
  (async () => {
    const { value: password_id } = await Swal.fire({
      title: 'Digite sua nova senha',
      input: 'password',
      icon: 'warning',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    
    if (password_id) {
      let registeredUser = JSON.parse(localStorage.getItem("dadosCadastros"))

      for(i=0; i < registeredUser.length; i++){
            iPassword = i
          }
  
      registeredUser[iPassword].password = password_id
      localStorage.setItem("dadosCadastros", JSON.stringify(registeredUser))
      Swal.fire('Sua senha foi alterada com sucesso!', '', 'success')

  }
  })()
}

function deleteAccount(id) {
  let registeredUser = JSON.parse(localStorage.getItem("dadosCadastros"))

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

    let index = registeredUser.find(function(registeredUser){
        return registeredUser.id === id 
    });
    registeredUser.splice(index, 1)
    localStorage.setItem("dadosCadastros", JSON.stringify(registeredUser))

    // Swal.fire(
    //   'Sua conta foi excluída com sucesso!',
    //   'success'
    // )

    window.location = "../../index.html"
    }
  })
}

printLoggedUser()