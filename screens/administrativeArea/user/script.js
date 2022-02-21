function listarCadastros() {
    let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
    let htmlListString = `      <table>
    <thead>
    <tr class="row100 head">
    <th class="cell100 column1">#</th>
    <th class="cell100 column2">Tipo de lixo</th>
    <th class="cell100 column3">Quantidade</th>
    <th class="cell100 column4">Ação</th>
    </tr>
    </thead> 
    <div class="table100-body js-pscroll">
    <tbody id="listarCadastro">
    </tbody>
    </table>` 
    if(usuariosCadastrados == null){
    alert("Ainda não há cadastros realizados.");
    } else {
             for(i = 0; i < usuariosCadastrados.length; i++) {
                htmlListString += 
                `<tbody>
                <tr class="row100 body">
                <td class="cell100 column1">${i}</td>
                <td class="cell100 column2">${usuariosCadastrados[i].username}</td>
                <td class="cell100 column5">${usuariosCadastrados[i].password}</td>
                <td class="cell100 column1"><button class='btn btn-danger' onclick="removeItemByIndex(${i})">Excluir</button></td>
                </tr>
                </tbody>`
             }}
        
             console.log(htmlListString);
        
             document.getElementById('listarCadastro').innerHTML = htmlListString
         }

// // function excluirCadastros(idExcluir) {
// //     usuariosCadastrados = JSON.parse(usuariosCadastrados);
// //     usuariosCadastrados.filter(e => { e.id != idExcluir })
// // }

// function listarCadastros() {
//     let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
//     let htmlListString = ""
//     for(i = 0; i < usuariosCadastrados.length; i++) {
//         htmlListString += 
//             "<tr class='table-light'>" +
//                 `<th scope='row'></th>` +
//                 `<td>${usuariosCadastrados[i].username}</td>` +
//                 `<td>${usuariosCadastrados[i].password}</td>` +
//                 `<td><button class='btn btn-light' onclick="removeItemById(${i})">Excluir</button></td>` +
//             "</tr>"
//     }

//     console.log(htmlListString);

//     document.getElementById('listarCadastro').innerHTML = htmlListString
// }

 function removeItemById(id) {
     let usuariosCadastrados = JSON.parse(localStorage.getItem("dadosCadastros"))
    
     let index = usuariosCadastrados.find(function(usuariosCadastrados){
        return usuariosCadastrados.id === id 
     });
     usuariosCadastrados.splice(index, 1)
     localStorage.setItem("dadosCadastros", JSON.stringify(usuariosCadastrados)) 
     listarCadastros()
   }
  
   listarCadastros()