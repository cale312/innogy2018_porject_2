// $(document).ready(function () {
//   // This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var foundPlacesHolder = [];
var apiURL = 'http://localhost:8000/api/v1/places'

function Place(placeName, adress, category) {
  this.Name = placeName;
  this.Address = adress;
  this.Category = category;
}

function initAutocomplete() {
  foundPlacesHolder = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -33.8688,
      lng: 151.2195
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

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
    if (places.length > 1) {
      places.map((place) => {
        foundPlacesHolder.push(JSON.stringify(place));
      })
    } else {
      foundPlacesHolder.push(new Place(JSON.stringify(places[0].name), JSON.stringify(places[0].formatted_address, JSON.stringify(places[0].types[0]))));
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

function AppViewmodel() {
  const self = this;

  self.loading = ko.observable(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
  self.place = ko.observable();
  self.map = ko.observable(false);

  self.showMap = () => {
    console.log(foundPlacesHolder[0]);

    // saving shit to the database
    $.ajax({
      url: apiURL,
      data: JSON.stringify(foundPlacesHolder[0]),
      type: "POST", contentType: "application/json",
      success: () => {
        console.log('nawe viwe');
      }
    })

    document.querySelector('.search-box').classList.add('search-box-after');
    document.querySelector('.btn').classList.add('btn-width');
    self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
    self.place('');

    setTimeout( () => {
      if (foundPlacesHolder.length === 0) {
        self.place('could not find place');
      } else {
        self.map(true)
        self.place(foundPlacesHolder);
      }
      self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
    }, 2000)
  }

  
}




ko.applyBindings(new AppViewmodel());
