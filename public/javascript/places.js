  var apiURL = `http://${window.location.hostname}:8000/api/v1/places`;
  let AllRecords = document.querySelector(".listOfPlaces");
  var foundPlaces = document.getElementById("closePlaces").innerHTML;
  var template = Handlebars.compile(foundPlaces);
  let categories = [];

  //get all the places that are stored in the database
  $.ajax({
    url: apiURL,
    type: "GET",
    success: (data) => {

      AllRecords.innerHTML = template({
        place: data.places
      })
    }
  });


  function placeCategoryFilter(Category) {
    this.Category = Category;
  }


  function AppViewmodel() {
    var self = this;
    self.place = ko.observable();

    $.getJSON(apiURL, function (data) {
      self.place(data.places);
      console.log("/....../", data)

    });




  };
  ko.applyBindings(new AppViewmodel());
