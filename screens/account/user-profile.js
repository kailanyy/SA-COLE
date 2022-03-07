function printLoggedUser(){
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser")) 

  let htmlUser = "";

  htmlUser += document.getElementById('infoLoggedUser').innerHTML = `${loggedUser.username}`

}

function removeItemById() {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
  let index = loggedUser.find(function(loggedUser){
    return loggedUser.id === id
  });

  loggedUser.splice(index,1)
  
  localStorage.setItem("loggedUser", JSON.stringify(loggedUser)) 
  
  printLoggedUser()
}


printLoggedUser()
removeItemById()