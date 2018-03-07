
$(document).ready(function() {
    function initialize() {
        var pyrmont = new google.maps.LatLng(-33.918861,18.423300);
      
        var map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15,
          scrollwheel: false
        });
      
        // Specify location, radius and place types for your Places API search.
        var request = {
          location: pyrmont,
          radius: '5000',
          types: ['hotel,restaurant,cafe']
        };
      
        // Create the PlaceService and send the request.
        // Handle the callback with an anonymous function.
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, function(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
      
              // If the request succeeds, draw the place location on
              // the map as a marker, and register an event to handle a
              // click on the marker.
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
              });
            }
          }
        });
      }
      return initialize();
      
      // Run the initialize function when the window has finished loading.
      google.maps.event.addDomListener(window, 'load', initialize);
    


     
   
    
        //get route that gets data from the database
      
                    //delete a specific place using and id
                    function deletePlace(placeData){
                     var id=$(placeData).data("id");
                     $.ajax({
                     url:"/api/v1/places"+id,
                     type:"Delete",
                     success:function(result){
                         $(placeData).parents("tr").remove();
                        //onclick='deletePlace(this);
                     }
                     })
                     }
                     deletePlace();
                    //update a specicic place using and id

                   function updateName(){
                    var id=$(name).data("id");
                    $("#nameId").val(id);
                    $.ajax({
                        url:"/api/v1/places"+id,
                        type:"GET",
                        success:function(product){
                            $("updateBtn").text("Update");
                        }
                    })

                   }
                   updateName();

                   $(':radio').change(function() {
                    console.log('New star rating: ' + this.value);
                  });

                  })
                  


                   //get all from database
                  function getAll(){
                    var placeTemplate = document.querySelector('#placeTemplate').innerHTML;
                    var template = Handlebars.compile(placeTemplate);
                     
                        $.ajax({
                            url: 'http://localhost:8000/api/v1/places',
                            type: 'GET',
                            dataType: 'json',
                            success: function (results) {
                                //handlebars template that will carry places details
                                $("#display").html(template({
                                  interestPlace: results.places
                                  }));
                                
                            },
                        });
                      };
                      getAll();



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
                      alert("mmmmm");
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

                       
                      
                    
                  

//-33.918861,18.423300



//   function createMarker() { //function that renders markers on the map
//     var marker = new google.maps.Marker({
//       position: new google.maps.LatLng(-33.918861,18.423300),
//       draggable: false,
//       animation: google.maps.Animation.DROP,
//       map: map1
//     });
//     marker.addListener('click', toggleBounce);
//   }


// });
   



  //get route that gets data from the database

//       $.ajax({

//           url: 'http://localhost:8000/api/v1/places',
//           type: 'GET',
//           dataType: 'json',
//           success: function (data, textStatus, xhr) {
//               //handlebars template that will carry places details
//               console.log(data);

//           },
//           error: function (xhr, textStatus, errorThrown) {
//               console.log('Error');

//           }

//       });

//               
//            

//               //update a specicic place using and id




// });

//

                  