// $(document).ready(function () {
//   // This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var foundPlacesHolder = [];
var apiURL = `http://${window.location.hostname}:8000/api/v1/places`;

// $.getJSON(apiURL, (data) => {
//   if (data.places.length > 0) {
//     window.location = "search.html";
//     return;
//   }
// });

function Place(placeName, adress, category, lng, lat) {
  this.Name = placeName;
  this.Address = adress;
  this.Category = category;
  this.Lng = lng;
  this.Lat = lat;
}

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -33.918861,
      lng: 18.423300
    },
    zoom: 13,
    mapTypeId: 'roadmap',
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
  },
  zoomControl: true,
  zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
  },
  scaleControl: true,
  streetViewControl: true,
  streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
  },
  fullscreenControl: true
  });



  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

    
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);


  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();
    foundPlacesHolder.length = 0;
    if (places.length > 1) {
      places.map((place) => {
        foundPlacesHolder.push(new Place(place.name, place.formatted_address, place.types[0], place.geometry.viewport.b.b, place.geometry.viewport.f.b));
      })
    } else {
      console.log("******", places[0])
      foundPlacesHolder.push(new Place(places[0].name, places[0].formatted_address, places[0].types[0], places[0].geometry.viewport.b.b, places[0].geometry.viewport.f.b));
    }

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
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
        title: place.name,
        animation: google.maps.Animation.DROP,
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

function Redirect() {
  setTimeout(() => {
    window.location = "index.html";
  }, 5000);
}

function AppViewmodel() {
  const self = this;
  self.loading = ko.observable(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
  self.place = ko.observable();
  self.map = ko.observable(false);
  self.error = ko.observable();

  self.search = () => {
    self.map(false);
    self.error('');
    document.querySelector('.search-box').classList.add('search-box-after');
    document.querySelector('.btn').classList.add('btn-width');
    self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
    self.place('');

    setTimeout(() => {
      if (foundPlacesHolder.length === 0) {
        self.map(false);
        self.error('could not find place');
      } else {
        self.map(true)
        self.place(foundPlacesHolder);
      }
      self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
    }, 2000)
  }

  self.savePlace = (data) => {
    // saving shit to the database
    self.map(false);
    self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
    document.querySelector('.search-box-wrapper').classList.add('none');
    setTimeout(() => {
      $.ajax({
        url: apiURL,
        data: JSON.stringify(data),
        type: "POST",
        contentType: "application/json",
        success: (result) => {
          console.log('saved place', result);

          if (result.msg === "exists") {
            Materialize.toast(data.Name + " has already been saved", 2000);
            return;
          }
          Materialize.toast(data.Name + " is saved for Viewing", 2000);
        }
      })
    }, 2000);
  }

}

ko.applyBindings(new AppViewmodel());
