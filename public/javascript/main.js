$(document).ready(function () {
  var allCities;

  function initialize() {
    var pyrmont = new google.maps.LatLng(-33.918861, 18.423300);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15,
      scrollwheel: false
    });

    // Specify location, radius and place types for your Places API search.
    var request = {
      location: pyrmont,
      radius: '50000',
      types: ['hotel,restaurant,cafe']
    };

    //Create the PlaceService and send the request.
    //Handle the callback with an anonymous function. 
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log(place);

          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      }
    });
  };
  return initialize();
});


    
        //get route that gets data from the database
      
                    //delete a specific place using and id
                    // function deletePlace(placeData){
                    //  var id=$(placeData).data("id");
                    //  $.ajax({
                    //  url:"/api/v1/places"+id,
                    //  type:"Delete",
                    //  success:function(result){
                    //      $(placeData).parents("tr").remove();
                    //     //onclick='deletePlace(this);
                    //  }
                    //  })
                    //  }
                    //  deletePlace();
                    //update a specicic place using and id

                  //  function updateName(){
                  //   var id=$(name).data("id");
                  //   $("#nameId").val(id);
                  //   $.ajax({
                  //       url:"/api/v1/places"+id,
                  //       type:"GET",
                  //       success:function(product){
                  //           $("updateBtn").text("Update");
                  //       }
                  //   })

                  //  }
                  //  updateName();

      
                   //get all from database
                  // function getAll(){
                  //   var placeTemplate = document.querySelector('#placeTemplate').innerHTML;
                  //   var template = Handlebars.compile(placeTemplate);
                     
                  //       $.ajax({
                  //           url: 'http://localhost:8000/api/v1/places',
                  //           type: 'GET',
                  //           dataType: 'json',
                  //           success: function (results) {
                  //               //handlebars template that will carry places details
                  //               $("#display").html(template({
                  //                 interestPlace: results.places
                  //                 }));
                                
                  //           },
                  //       });
                  //     };
                  //     getAll();



                    //Add places to the database
                  function add() {
                    let addName = $('#name').val();
                      let addAddress = $('#address').val();
                      let addCity = $('#city').val();
                      let addCategory = $('#category').val();
                    
                      var myCity =({
                        Name: addName,
                        Address: addAddress,
                        City: addCity,
                        Category: addCategory
                      });
                    
                    
                      console.log(myCity)
                      $.ajax({
                    
                          url: 'http://localhost:8000/api/v1/places',
                          type: 'POST',
                          data: myCity,
                          success: function(data){ 
                          }
                      })
                      getAll();
                  }

                  //Clear the form after 
                  function clearAdd(){
                    $("#name").val("");
                    $("#address").val("");
                    $("#city").val("");
                    $("#category").val("");
                    
                   }
                   clearAdd();

                    //Delete ajax call from the database
                    $("#deletePlace").click(function(id){
                      alert("mmmmm")
                      id=$(id).data("id");
                      $.ajax({
                        url:"/api/v1/places"+id,
                        type:"DELETE",
                        success:function(result){
                          console.log(result);
                       $(id).parents("tr").remove();
                       
                      }
                    })
                  });

                       
                      
                    
                  

let interestingPlaces = document.getElementById("closePlaces").innerHTML;
let template = Handlebars.compile(interestingPlaces);

//get route that gets data from the database
//$("#getPlaces").click(function () {
  $.ajax({
    url: 'http://localhost:8000/api/v1/places',
    type: 'GET',
  }).then(function (data) {
    console.log(data.places);
    document.querySelector(".listOfPlaces").innerHTML = template({
      data: data.places
    })
  })

// })


$("#addPlaces").on('click', function () {

  let addName = $('#name').val();
  let addAddress = $('#address').val();
  let addCity = $('#city').val();
  let addCategory = $('#category').val();

  var myCity = ({
    Name: addName,
    Address: addAddress,
    City: addCity,
    Category: addCategory
  });

  if(!addname || addName === null){
return;
  } else if(!addAddress || addAddress === null){
    return;
  }else if(!addCity|| addCity === null){
    return;
  } else if(!addCategory || addCategory){
    retun;
  }

  console.log(myCity)
  $.ajax({

    url: 'http://localhost:8000/api/v1/places',
    type: 'POST',
    data: myCity,
    success: function (data) {
      console.log(data);
    }
  })
})

//filter using radio buttons
var diplaySelectedPlaces=$("#diplaySelectedPlaces");   //Where filtered data displayed

//ajax call that gets all the filtered data

$("#all").on('click', function () {
  alert("all");
  var all=$("#all").val();
  
  $.ajax({
    url:"api/v1/places",
    type:"GET",
    dataType:all,
    success:function(product){
      diplaySelectedPlaces.innerHTML = template({
        data: product.places
      })
      console.log("*****",all);
  }
})
})



//ajax call that gets all coffeeshops

$("#coffee").on('click', function () {
  alert("coffee");
  var coffeeShop=$("#coffee").val();
  
  $.ajax({
    url:"api/v1/places",
    type:"GET",
    dataType:coffeeShop,
    success:function(coffeeData){
      diplaySelectedPlaces.innerHTML = template({
        data: coffeeData.coffeeShop
      })
      console.log("*****",coffeeShop);
  }
})
})


$(':radio').change(function() {
  alert("museum");
  console.log('New star rating: ' + this.value);
  var museums=$("#museums").val();
  if($(this).val()==museums){
    $.ajax({
      url:"api/v1/places",
      type:"GET",
      dataType:museums,
      success:function(museumsData){
        diplaySelectedPlaces.innerHTML = template({
          data: museumsData.museums
        })
        console.log("*****",museumsData);
    }
  })
  
  }
});





//ajax call that get all museums
$("#museums").on('click', function () {
  
})


//call that get all artshops
$("#artshops").on('click', function () {
  alert("artShops");
  var artshops=$("#artshops").val();
  $.ajax({
    url:"api/v1/places",
    type:"GET",
    dataType:artshops,
    success:function(artshopsData){
      console.log("artshopsData");
      diplaySelectedPlaces.innerHTML = template({
        data: artshopsData.artshops
      })
  }
})
})




//ajax call that gets all the clubs

$("#clubs").on('click', function () {
  alert("clubs");
  var clubs=$("#clubs").val();
  $.ajax({
    url:"api/v1/places",
    type:"GET",
    dataType:clubs,
    success:function(clubsData){
      diplaySelectedPlaces.innerHTML = template({
        data: clubsData.clubs
      })
  }
})
})





$("#park").on('click', function () {
  alert("park");
  var park=$("#park").val();
  $.ajax({
    url:"api/v1/places",
    type:"GET",
    dataType:park,
    success:function(rsltparkData){
      diplaySelectedPlaces.innerHTML = template({
        data: rsltparkData.park
      })
  }
})
})





