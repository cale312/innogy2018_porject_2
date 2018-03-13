$(document).ready(function () {
  var allCities;

  $(".displayMap").click(function(){
  function initialize() {
    var pyrmont = new google.maps.LatLng(-33.918861, 18.423300);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15,
      scrollwheel: false
    });

    // Specify location, radius and place types for your Places API search.
    var request = {
      location: pyrmont,
      radius: '50000',
      types: ['hotel,restaurant,cafe']
    };

    //Create the PlaceService and send the request.
    //Handle the callback with an anonymous function. 
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          // console.log(place);

          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      }
    });
  };
  return initialize();
});
});

    
        //get route that gets data from the database
      
                    //delete a specific place using and id
                    // function deletePlace(placeData){
                    //  var id=$(placeData).data("id");
                    //  $.ajax({
                    //  url:"/api/v1/places"+id,
                    //  type:"Delete",
                    //  success:function(result){
                    //      $(placeData).parents("tr").remove();
                    //     //onclick='deletePlace(this);
                    //  }
                    //  })
                    //  }
                    //  deletePlace();
                    //update a specicic place using and id

                  //  function updateName(){
                  //   var id=$(name).data("id");
                  //   $("#nameId").val(id);
                  //   $.ajax({
                  //       url:"/api/v1/places"+id,
                  //       type:"GET",
                  //       success:function(product){
                  //           $("updateBtn").text("Update");
                  //       }
                  //   })

                  //  }
                  //  updateName();

                   $(':radio').change(function() {
                    console.log('New star rating: ' + this.value);
                  });

                  
                  


                   //get all from database
                  // function getAll(){
                  //   var placeTemplate = document.querySelector('#placeTemplate').innerHTML;
                  //   var template = Handlebars.compile(placeTemplate);
                     
                  //       $.ajax({
                  //           url: 'http://localhost:8000/api/v1/places',
                  //           type: 'GET',
                  //           dataType: 'json',
                  //           success: function (results) {
                  //               //handlebars template that will carry places details
                  //               $("#display").html(template({
                  //                 interestPlace: results.places
                  //                 }));
                                
                  //           },
                  //       });
                  //     };
                  //     getAll();



                    //Add places to the database
                  function add() {
                    let addName = $('#name').val();
                      let addAddress = $('#address').val();
                      let addCity = $('#city').val();
                      let addCategory = $('#category').val();
                    
                      var myCity =({
                        Name: addName,
                        Address: addAddress,
                        City: addCity,
                        Category: addCategory
                      });
                    
                    
                      console.log(myCity)
                      $.ajax({
                    
                          url: 'http://localhost:8000/api/v1/places',
                          type: 'POST',
                          data: myCity,
                          success: function(data){ 
                          }
                      })
                      getAll();
                  }

                  //Clear the form after 
                  function clearAdd(){
                    $("#name").val("");
                    $("#address").val("");
                    $("#city").val("");
                    $("#category").val("");
                    
                   }
                  

                    //Delete ajax call from the database
                    $("#deletePlace").click(function(id){
                      alert("mmmmm")
                      id=$(id).data("id");
                      $.ajax({
                        url:"/api/v1/places"+id,
                        type:"DELETE",
                        success:function(result){
                          console.log(result);
                       $(id).parents("tr").remove();
                       
                      }
                    })
                  });

                       
                      
                    
                  

let interestingPlaces = document.getElementById("closePlaces").innerHTML;
let template = Handlebars.compile(interestingPlaces);

//get route that gets data from the database
$("#getPlaces").click(function () {
  $.ajax({
    url: 'http://localhost:8000/api/v1/places',
    type: 'GET',
  }).then(function (data) {
    console.log(data.places);
    document.querySelector(".listOfPlaces").innerHTML = template({
      data: data.places
    })
  })
})


$("#addPlaces").on('click', function () {

  let addName = $('#name').val();
  let addAddress = $('#address').val();
  let addCity = $('#city').val();
  let addCategory = $('#category').val();

  var myCity = ({
    Name: addName,
    Address: addAddress,
    City: addCity,
    Category: addCategory
  });

  console.log(myCity)
  $.ajax({

    url: 'http://localhost:8000/api/v1/places',
    type: 'POST',
    data: myCity,
    success: function (data) {
      console.log(data);
    }
  })
})
