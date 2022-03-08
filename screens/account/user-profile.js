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
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    cancelButtonText: 'Não!',
    confirmButtonText: 'Sim!'
  }).then((result) => {
    if (result.isConfirmed) {

    window.location = "../../index.html"
    }
  })
}

function deleteAccount(id) {
  let registeredUser = JSON.parse(localStorage.getItem("dadosCadastros"))

  Swal.fire({
    title: 'Você tem certeza?',
    text: "Você não será capaz de reverter essa ação!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
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