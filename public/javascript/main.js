$(document).ready(function () {
  //-33.918861,18.423300
    let world = new google.maps.LatLng(-33.918861,18.423300)
    var mapOptions1 = {
          center: world,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map1 = new google.maps.Map(document.getElementById("googleMap1"), mapOptions1);
        return map1;
      //}
      var marker = new google.maps.Marker({
        position: world,
        mapOptions1: map,
        
      });
      marker.setMap(map1);
      





      
      // function myMarker(Latitude, Longitude, map1) { //function that renders markers on the map
      //   var marker = new google.maps.Marker({
      //     position: new google.maps.LatLng(Latitude, Longitude),
      //     draggable: false,
      //     animation: google.maps.Animation.DROP,
      //     map: map1
      //   });
      //   marker.addListener('click', toggleBounce);
      // }
      
      
      // function toggleBounce() { //Function that controls the markers to bounce and toggle as well as animation
      //   if (marker.getAnimation() !== null) {
      //     marker.setAnimation(null);
      //   } else {
      //     marker.setAnimation(google.maps.Animation.BOUNCE);
      //   }
      // }
    
      var infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
    
      document.getElementById('submit').addEventListener('click', function() {
        placeDetailsByPlaceId(service, map, infowindow);
      });
    
    
    function placeDetailsByPlaceId(service, map, infowindow) {
      // Create and send the request to obtain details for a specific place,
      // using its Place ID.
      var request = {
        placeId: document.getElementById('place-id').value
      };
    
      service.getDetails(request, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // If the request succeeds, draw the place location on the map
          // as a marker, and register an event to handle a click on the marker.
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
    
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
              place.formatted_address + '</div>');
            infowindow.open(map, this);
          });
          console.log(place);
         // map.panTo(place.geometry.location);
        }
      });
    }
    var adding=document.getElementById("add");
    
    function addingPlaces(){
      alert("mmmm");
      var addBtn=$("#add").val();
      var placeName=$("#name").val();
      var placeAddress=$("#address").val();
      var placeCity=$("#city").val();
      var placeCategory=$("#category").val();
      
      var InterestedPlaces = {
        Name:placeName,
        Address:placeAddress,
        City:placeCity,
        Category:placeCategory
      }
     
      $.ajax({
          url: 'localhost:8000/api/v1/places',
          type: 'POST',
          data: InterestedPlaces,
          success: function(data){
          console.log(data);
          }
      })
  
    };
        //get route that gets data from the database
        var placeTemplate = document.getElementById('placeTemplate').innerHTML;
        var template = Handlebars.compile(placeTemplate);
         console.log("**",template);
            $.ajax({
                url: 'localhost:8000/api/v1/places',
                type: 'GET',
                dataType: 'json',
                success: function (results) {
                  console.log("***",results);
                    //handlebars template that will carry places details
                    $("#display").html(template({
                      interestPlace: results.place
                      }));
                    console.log(results);
                },
            });

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




                    })





