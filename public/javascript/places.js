var foundPlaces = document.getElementById("closePlaces").innerHTML;
$(document).ready(function () {
  var template = Handlebars.compile(foundPlaces);
  var apiURL = `http://${window.location.hostname}:8000/api/v1/places`;
  let AllRecords = document.querySelector(".listOfPlaces");

  var categories = document.getElementById("FilterCategories").innerHTML;
  var template2 = Handlebars.compile(categories);
  var displayCategories = document.querySelector(".filter");

  //get all the places that are stored in the database
  $.ajax({
    url: apiURL,
    type: "GET",
    success: (data) => {
      console.log("data from the database", data);
      AllRecords.innerHTML = template({
        place: data.places
      })

    }

  });

  function placeCategoryFilter() {
    //Populates radio buttons with available categories
    $.ajax({
      url: apiURL,
      type: "GET",
      success: (data) => {
        //maps through data in the api and returns Categories
        var uniqueT = [];
        var map = {};

        for (var i = 0; i < data.length; i++) {
          var cat = data[i];
          console.log(cat);

          if (map[cat.Category] === undefined) {
            map[cat.Category] = cat.Category;
            uniqueT.push(cat.Category)
            console.log(uniqueT);
          }
        }
        displayCategories.innerHTML = template2({
          Category: uniqueT
        });
      }
    })
  }
  placeCategoryFilter();

});
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