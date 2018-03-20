$(document).ready(function(){
  $('.button-collapse').sideNav('show');
//   $('.button-collapse').sideNav({
//     menuWidth: 300,
//     edge: 'left',
//     closeOnClick: true, 
//     draggable: true, 
//     onOpen: function(ele) { 
      
//     }
// });
})

      
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.918861, lng: 18.423300},
          zoom: 15
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }


    