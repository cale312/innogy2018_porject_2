// $(document).ready(function () {
//   // This example adds a search box to a map, using the Google Place Autocomplete
    // feature. People can enter geographical searches. The search box will return a
    // pick list containing a mix of places and predicted search terms.

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    function initAutocomplete() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
      });

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
  

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if(places.length >1){
          places.map( (place) => {
            console.log(place.formatted_address)
          })
        } else{
          console.log(places[0].formatted_address)

        }

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }




// let interestingPlaces = document.getElementById("closePlaces").innerHTML;
// let template = Handlebars.compile(interestingPlaces);

//get route that gets data from the database
//$("#getPlaces").click(function () {
//   $.ajax({
//     url: 'http://localhost:8000/api/v1/places',
//     type: 'GET',
//   }).then(function (data) {
//     console.log(data.places);
//     document.querySelector(".listOfPlaces").innerHTML = template({
//       data: data.places
//     })
 
 
//   })

// // })


// $("#addPlaces").on('click', function () {

//   let addName = $('#name').val();
//   let addAddress = $('#address').val();
//   let addCity = $('#city').val();
//   let addCategory = $('#category').val();

//   var myCity = ({
//     Name: addName,
//     Address: addAddress,
//     City: addCity,
//     Category: addCategory
//   });

//   if(!addname || addName === null){
// return;
//   } else if(!addAddress || addAddress === null){
//     return;
//   }else if(!addCity|| addCity === null){
//     return;
//   } else if(!addCategory || addCategory){
//     retun;
//   }

//   console.log(myCity)
//   $.ajax({

//     url: 'http://localhost:8000/api/v1/places',
//     type: 'POST',
//     data: myCity,
//     success: function (data) {
//       console.log(data);
//     }
//   })
// });

// $("#update").on('click',function(e){
//   console.log("I want to update you");
//   console.log(e);
//})

// function main()
// {
//     var inputFileToLoad = document.createElement("input");
//     inputFileToLoad.type = "file";
//     inputFileToLoad.id = "inputFileToLoad";
//     document.body.appendChild(inputFileToLoad);

//     var buttonLoadFile = document.createElement("button");
//     buttonLoadFile.onclick = loadImageFileAsURL;
//     buttonLoadFile.textContent = "Load Selected File";
//     document.body.appendChild(buttonLoadFile);
// }

// function loadImageFileAsURL()
// {
//     var filesSelected = document.getElementById("inputFileToLoad").files;
//     if (filesSelected.length > 0)
//     {
//         var fileToLoad = filesSelected[0];

//         if (fileToLoad.type.match("image.*"))
//         {
//             var fileReader = new FileReader();
//             fileReader.onload = function(fileLoadedEvent) 
//             {
//                 var imageLoaded = document.createElement("img");
//                 imageLoaded.src = fileLoadedEvent.target.result;
//                 document.body.appendChild(imageLoaded);
//             };
//             fileReader.readAsDataURL(fileToLoad);
//         }
//     }
// }

// main();
