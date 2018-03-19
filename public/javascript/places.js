  var apiURL = `http://${window.location.hostname}:8000/api/v1/places`;
  let AllRecords = document.querySelector(".listOfPlaces");
  var foundPlaces = document.getElementById("closePlaces").innerHTML;
  var template = Handlebars.compile(foundPlaces);
  let categories = [];
  let catMap = {};
  let allData = null;

  function AppViewmodel() {
    var self = this;
    self.categories = ko.observable();
    self.place = ko.observable();

    //get all the places that are stored in the database
    $.ajax({
      url: apiURL,
      type: "GET",
      success: (data) => {
        // caching the data for easy access
        allData = data.places;
        AllRecords.innerHTML = template({
          place: data.places
        })
        allData.map((place) => {
          if (catMap[place.Category] === undefined) {
            catMap[place.Category] = null;
            categories.push(place.Category.split("_").join(" "));
          }
        });
        self.categories(categories);
      }
    });

  };
  ko.applyBindings(new AppViewmodel());