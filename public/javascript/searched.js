$(document).ready(function(){
    var foundPlaces = document.getElementById("closePlaces").innerHTML;
    var template =Handlebars.compile(foundPlaces);
    var apiURL = 'http://localhost:8000/api/v1/places';
    var AllRecords = document.querySelector(".listOfPlaces");

//get all the places that are stored in the database
    $.ajax({
    url: apiURL,
    type: "GET",
    success: (data) =>{
       console.log("data from the database",data);
AllRecords.innerHTML = template({
    place:data.places
})
    }

});
});
