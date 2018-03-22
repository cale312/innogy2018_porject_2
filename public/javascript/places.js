  var apiURL = `http://${window.location.hostname}:8000/api/v1/places/`;
  let AllRecords = document.querySelector(".listOfPlaces");
  let categories = [];
  let catMap = {};
  let allData = null;
  let placesObj = {};
  let placeToReview = [];

  $(document).ready(function () {
    $('.tooltipped').tooltip({
      delay: 50
    });
  });

  var placesMap = function initMap(latitude, longitude, zoom) {

    var uluru = {
      lat: -25.363,
      lng: 131.044
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: place
    });
    var marker = new google.maps.Marker({
      position: place,
      map: map
    });
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
    self.selectedPlace = ko.observable();
    self.visits = ko.observable();
    self.selectedPlaceReviews = ko.observable();

    var placeReviwing = null;

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
      }, 1500);
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
        Materialize.toast("please enter valid place", 1500);
      }
      console.log('found...', matches);
      self.places(allData);
    }

    self.reviews = (evt) => {
      console.log('clicked on', evt);
      let thePlace = [];

      self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
      self.data(false);

      allData.map((place) => {
        if (place.name === evt.name) {
          placeReviwing = evt.name;
          self.selectedPlace(place);
          self.selectedPlaceReviews(place.reviews)
        }
      })

      setTimeout(() => {
        self.review_data(true);
        self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
        var lat = parseFloat(evt.lat);
        var lng = parseFloat(evt.lng);

        console.log('clicked on', evt.lat);
        console.log('clicked on', evt.lng);
        initMap(lat, lng, 15);

        self.visits(`${evt.visits} people visited this place`);

        document.getElementById("send-review").disabled = true;

        $('#Username, #reviewInfo').on('keyup', () => {
          ($('#Username').val().length > 0 && $("#reviewInfo").val().length > 0) ? document.getElementById("send-review").disabled = false: document.getElementById("send-review").disabled = true;
        })
      }, 1500);

    }

    self.back = () => {
      self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
      self.review_data(false);
      setTimeout(() => {
        self.data(true);
        self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
      }, 1500);
    }

    self.sendReview = () => {
      var reviewData = {
        userName: $('#Username').val(),
        review: $("#reviewInfo").val()
      }
      $.ajax(apiURL + placeReviwing + '/review', {
        data: JSON.stringify(reviewData),
        type: "POST",
        contentType: "application/json",
        success: function (result) {
          console.log(result)
        }
      });
    }

  };

  function initMap(latitude, longitude, zoom) {
    let data = {
      lat: -33.918861,
      lng: 18.423300
    }

    if (latitude && longitude) {
      data = {
        lat: latitude,
        lng: longitude
      }
    }

    console.log("DATA", data);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: data
    });
    var marker = new google.maps.Marker({
      position: data,
      map: map
    });
  }

  ko.applyBindings(new AppViewmodel());