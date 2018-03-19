$(document).ready(function(){
    var foundPlaces = document.getElementById("closePlaces").innerHTML;
    var template =Handlebars.compile(foundPlaces);
    var apiURL = 'http://localhost:8000/api/v1/places';
    var AllRecords = document.querySelector(".listOfPlaces");
    var selectedValue = $("input[name='filter']:checked").val();
    $('.filter-box input').on('change', function(){
//get all the places that are stored in the database
if(($('input[type="radio"]').is(':checked'))){
    $.ajax({
    url: apiURL,
    type: "GET",
    success: (data) =>{
       //console.log("data from the database",data);
       AllRecords.innerHTML = template({
       place:data.places
      })
    }
});

}
// var radioForInterest=$('input[type="radio"]:checked', '.filter-box').val();
// console.log("####",radioForInterest);
else if(($('input[type="radio"]').is(':checked'))){
//  if(radioForInterest==coffee){
  $.ajax({
          url:apiURL,
          type:"GET",
          success:function(product){
              console.log("%%%%%%%",product);
            product.types.map(function(elem){
              AllRecords.innerHTML=template({
                place:elem
        })
        console.log("***",elem);
       
    }) 
  }     
    });
 

}
  
  });
});