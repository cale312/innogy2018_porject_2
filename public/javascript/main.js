
$(document).ready(function() {

 let world = new google.maps.LatLng(-33.918861,18.423300)
var mapOptions1 = {
      center: world,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map1 = new google.maps.Map(document.getElementById("googleMap1"), mapOptions1);
    return map1;
  //}
  
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

});