// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }

function listCollectionPoints() {
  let collectionPoint = JSON.parse(localStorage.getItem("saveCollectionPoint"))
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))

  
  let userCollectionPoints = collectionPoint.filter(function(collectionPoint) {
    return collectionPoint.userID === loggedUser.id 
  });

  printListCollectionPoints(userCollectionPoints)
  console.log("Filter:", userCollectionPoints);
  console.log("listCollectionPoints:", listCollectionPoints);
}


function printListCollectionPoints(collectionPoint) {
  let htmlListString = ""
  console.log("collectionPoint.length", collectionPoint.length);
  
}

listCollectionPoints()