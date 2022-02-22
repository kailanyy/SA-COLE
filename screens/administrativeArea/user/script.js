


/* FUNÇÃO Q FUNCIONA
   function listarCadastros() {
   let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
   let htmlListString = `<table class='table table-light' style="text-align: center;">
   <thead>
     <tr> 
       <th scope='col'>ID</th> 
       <th scope='col'>Usuário</th> 
       <th scope='col'>Senha</th> 
       <th scope='col'>Ação</th> 
     </tr> 
   </thead> 
   <tbody id="listarCadastro">
   </tbody>
 </table>`

   if (usuariosCadastrados == null){
   alert("Ainda não há cadastros realizados.");

   } else {
      for(i = 0; i < usuariosCadastrados.length; i++) {

         htmlListString += 
         "<tr class='table-light'>" +
         `<th scope='row'></th>` +
         `<td>${usuariosCadastrados[i].username} </td>` +
         `<td>${usuariosCadastrados[i].password}</td>` +
         `<td><button class='btn btn-light' onclick="removeItemById(${i})">Excluir</button></td>` +
     "</tr>"

      }
   }

   document.getElementById('listarCadastro').innerHTML = htmlListString
}*/


//  function removeItemById(id) {
//      let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
    
//      let index = usuariosCadastrados.find(function(usuariosCadastrados){
//         return usuariosCadastrados.id === id 
//      });
//      usuariosCadastrados.splice(index, 1)
//      localStorage.setItem("dadosCadastros", JSON.stringify(usuariosCadastrados)) 
//      listarCadastros()
//    }
  
//    listarCadastros()