  var apiURL = `http://${window.location.hostname}:8000/api/v1/places/`;
  let categories = [];
  let categoryMap = {};
  let allData = null;
  let placesObj = {};
  let placeToReview = [];

  $(document).ready(function () {
    $('.tooltipped').tooltip({
      delay: 50
    });
  });

  var placesMap = function initMap(latitude, longitude, zoom) { // This function creates another initial map

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
  };


  function AppViewmodel() { // creates a knockoutJS viewmodel
    var self = this;
    self.categories = ko.observable();
    self.places = ko.observable();
    self.loading = ko.observable(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
    self.data = ko.observable(false);
    self.review_data = ko.observable(false);
    self.selectedPlace = ko.observable();
    self.visits = ko.observable();
    self.selectedPlaceReviews = ko.observable();

    let placeReviwing; // cache the data of the place to review
    let matchedPlaces = []; // stores the searched matched places
    let matchedPlacesMap = {}; // maps the filtering categories

    self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`); 

    // get all the places that are stored in the database
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
          if (categoryMap[place.category] === undefined) {
            categoryMap[place.category] = null;
            categories.push(place.category.split("_").join(" "));
          }
        });
        //  autocomplete
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
      matchedPlaces = [];

      // if there is no text in the search box display all the places
      $('#pac-input').on('keyup', () => {
        ($('#pac-input').val().trim() == 0) ? self.places(allData): false;
      });

      let placeName = $('#pac-input').val();
      if (placeName.trim().length != 0) {
        allData.map((place) => {
          if (placeName.toLowerCase() === place.name.toLowerCase()) {
            matchedPlaces.push(place);
          }
        });
        self.places(matchedPlaces);
        return;
      } else {
        Materialize.toast("please enter valid place", 1500);
      }
      console.log('found...', matchedPlaces);
      self.places(allData);
    };

    self.reviews = (evt) => {
      console.log('clicked on', evt);
      let thePlace = [];
      placeReviwing = evt;
      
      document.getElementById("send-review").disabled = true; // disable comment button
      
      // enable submit button if both input fields filled
      $('#Username, #reviewInfo').on('keyup', () => {
        ($('#Username').val().length > 0 && $("#reviewInfo").val().length > 0) ? document.getElementById("send-review").disabled = false : document.getElementById("send-review").disabled = true;
      });

      self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
      self.data(false);

      allData.map((place) => {
        if (place.name === placeReviwing.name) {
          placeReviwing = placeReviwing.name;
          self.selectedPlace(place);
          self.selectedPlaceReviews(place.reviews);
        }
      });

      setTimeout(() => {
        self.review_data(true);
        self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
        var lat = parseFloat(placeReviwing.lat);
        var lng = parseFloat(placeReviwing.lng);

        console.log('clicked on', placeReviwing.lat);
        console.log('clicked on', placeReviwing.lng);
        initMap(lat, lng, 18);

        self.visits(`${placeReviwing.visits} people visited this place`);

      }, 1500);

    };

    self.submitReview = () => {

      // cache the usernaame and review text from the dom
      var reviewData = {
        userName: $('#Username').val(),
        review: $("#reviewInfo").val()
      };

      $.ajax(apiURL + placeReviwing + '/review', {
        data: JSON.stringify(reviewData),
        type: "POST",
        contentType: "application/json",
        success: function (result) {
          $.getJSON(apiURL, (data) => {
            setTimeout(() => {
              // caching the data for easy access
              allData = data.places;

              // if there is no data in the database, redirect to the adding places page
              if (allData.length === 0) {
                window.location = "search.html";
                return;
              }

              self.places(allData);

              // creating the check box categories for easy fiiltering
              allData.map((place) => {
                // maps the already pushed categories to stop possible diplications
                (placesObj[place.name] === undefined) ? placesObj[place.name] = null: false;
                if (categoryMap[place.category] === undefined) {
                  categoryMap[place.category] = null;
                  // remove the underscores from the text before pushing
                  categories.push(place.category.split("_").join(" "));
                }
              });

              // autocomplete
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

              allData.map((place) => {
                if (place.name === placeForReviews.name) {
                  placeReviwing = placeForReviews.name;
                  self.selectedPlace(place);
                  self.selectedPlaceReviews(place.reviews)
                }
              });
            }, 1500);
          });
        },
      });
    };

    // logic for filtering by checkboxes
    $(document).on('click', '[type=checkbox]', function (e) {
      let category = e.target.id.toLowerCase().trim().replace(" ", "_"); // cache the category of the checkbox

      if (document.getElementById(e.target.id).hasAttribute("checked") === false) { // if the checkbox is not checked, check it using javascripts setAttribute
        document.getElementById(e.target.id).setAttribute("checked", "checked");

        // push the checked places iterated from all the data from the database to the matches array
        allData.map((place) => {
          (place.category === category) ? matchedPlaces.push(place): false;
        });

      } else {
        // unchecking the box, removes it from the array of the places
        document.getElementById(e.target.id).removeAttribute("checked");

        // maps the matchedPlaces array and looks for the place with the same category to splice
        matchedPlaces.map( (place) => {
          let removeCategories = place.category !== category;
          matchedPlaces.splice(removeCategories, 1);
          console.log('unsee category', place.name);
        });

      };

      (matchedPlaces.length > 0) ? self.places(matchedPlaces): self.places(allData);

    });


    self.back = () => {
      self.loading(`<div class="progress black" style="margin-top: 0;"><div class="indeterminate white"></div></div>`);
      self.review_data(false);
      self.data(false);
      setTimeout(() => {
        self.data(true);
        self.loading(`<div class="progress black" style="visibility: hidden;margin-top: 0;"><div class="indeterminate white"></div></div>`);
      }, 1500);
    };

  };

  function initMap(latitude, longitude, zoom) {
    let data = {
      lat: -33.918861,
      lng: 18.423300
    };

    if (latitude && longitude) {
      data = {
        lat: latitude,
        lng: longitude
      };
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: data
    });
    var marker = new google.maps.Marker({
      position: data,
      map: map
    });
  };

  ko.applyBindings(new AppViewmodel());
