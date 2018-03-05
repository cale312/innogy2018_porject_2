$(document).ready(function () {
    $("#Add").click(function () {
        var InterestedPlaces = new Place();
        InterestedPlaces.Name = $('#name').val();
        InterestedPlaces.Address = $('#address').val();
        InterestedPlaces.City = $('#city').val();
        InterestedPlaces.Category = $('#category').val();
        
        $.ajax({

            url: 'http://localhost:8000/api/v1/places',
            type: 'POST',
            data: place,
            success: function(data){
                console.log(data);
            }

        })
        })
    

        //get route that gets data from the database

            $.ajax({

                url: 'http://localhost:8000/api/v1/places',
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, xhr) {
                    //handlebars template that will carry places details
                    console.log(data);

                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error');

                }

            });

                    //delete a specific place using and id
                    function deletePlace(placeData){
                     var id=$(placeData).data("id");
                     $.ajax({
                     url:"/api/v1/places"+id,
                     type:"Delete",
                     success:function(result){
                         $(placeData).parents("tr").remove();
                        //onclick='deletePlace(this);
                     }
                     })
                     }
                     deletePlace();

                    //update a specicic place using and id








function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }
});
