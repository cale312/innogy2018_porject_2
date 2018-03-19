$(document).ready(function () {
  var apiURL = `http://${window.location.hostname}:8000/api/v1/places`;
  let AllRecords = document.querySelector(".listOfPlaces");
  var foundPlaces = document.getElementById("closePlaces").innerHTML;
  let categories = [];

  //get all the places that are stored in the database
  $.ajax({
    url: apiURL,
    type: "GET",
    success: (data) => {
    
      AllRecords.innerHTML = template({
        place: data.places
      })
    }
  });


  function placeCategoryFilter(Category){
    this.Category = Category;
  }


  function AppViewmodel(){
    var self = this;
    self.place = ko.observable();

      $.getJSON(apiURL, function(data) { 
        self.place(data.places);
            console.log("/....../" ,data)
         
          });
      



    };
    ko.applyBindings(new AppViewmodel());
  







// function placeCategoryFilter(){


//     $.ajax({
//         url: apiURL,
//         type: "GET",
//         success: (result) =>{
//             var UniqueCategory = [];
//             var map= {};

//         for(var i = 0; i < result.length; i ++){
//         console.log("troubleshooting.....",result[i] );
//             var placeCategory = result[i];
//             console.log(placeCategory);
//             if(map[placeCategory.places.Category] === undefined){
//                 map[placeCategory.places.Category]  = placeCategory.places.Category;
//                 UniqueCategory.push(placeCategory.places.Category);
//             } 
//         }
// displayCategories.innerHTML = template2({
//          types: UniqueCategory.places
//         });

//     console.log(UniqueCategory);
//     }
// });
// };
// placeCategoryFilter();