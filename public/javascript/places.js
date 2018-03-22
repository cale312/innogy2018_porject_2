// $(document).ready(() => {
  var apiURL = `http://${window.location.hostname}:8000/api/v1/places`;
  let AllRecords = document.querySelector(".listOfPlaces");
  let categories = [];
  let catMap = {};
  let allData = null;
  let placesObj = {};

  $(document).ready(function () {
    $('.tooltipped').tooltip({
      delay: 50
    });
  });

  var map, infoWindow;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -33.918861,
        lng: 18.423300
      },
      zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function AppViewmodel() {
    var self = this;
    self.categories = ko.observable();
    self.place = ko.observable();
    self.places = ko.observable();
    self.matches = ko.observable();
    self.loading = ko.observable(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
    self.data = ko.observable(false);
    self.review_data = ko.observable(false);

    self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);

    //get all the places that are stored in the database
    $.getJSON(apiURL, (data) => {
      setTimeout(() => {
        // caching the data for easy access
        allData = data.places;

        if (allData.length === 0) {
          window.location = "search.html";
          return;
        }

        self.places(allData);
        allData.map((place) => {
          (placesObj[place.name] === undefined) ? placesObj[place.name] = null: false;
          if (catMap[place.category] === undefined) {
            catMap[place.category] = null;
            categories.push(place.category.split("_").join(" "));
          }
        });
        $('input.autocomplete').autocomplete({
          data: placesObj,
          limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
          onAutocomplete: function (val) {
            // Callback function when value is autcompleted.
          },
          minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
        self.data(true);
        self.loading('');
        self.categories(categories);
      }, 2000);
    });

    self.search = () => {
      var matches = [];
      let placeName = $('#pac-input').val();
      if (placeName.trim().length != 0) {
        allData.map((place) => {
          if (placeName.toLowerCase() === place.name.toLowerCase()) {
            matches.push(place);
          }
        })
        self.places(matches);
        return;
      } else {
        Materialize.toast("please enter valid place", 2000);
      }
      console.log('found...', matches);
      self.places(allData);
    }

    self.reviews = (evt) => {
      console.log('clicked on', evt);
      self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
      self.data(false);

      setTimeout(() => {
        self.review_data(true);
        self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
        var map, infoWindow;
  
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {
              lat: evt.lat,
              lng: evt.lng
            },
            zoom: 15
          });
          infoWindow = new google.maps.InfoWindow;
  
          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
  
              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);
            }, function () {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        }
        
      }, 2000);

    }

    self.back = () => {
      self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
      setTimeout(() => {
        self.data(true);
        self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
        self.review_data(false);
      }, 2000);
    }

  };

  ko.applyBindings(new AppViewmodel());

// })