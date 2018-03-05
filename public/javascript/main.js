$(document).ready(function () {
    $("#search").click(function () {
        var InterestedPlaces = new Place();
        InterestedPlaces.Name = $('#name').val();
        InterestedPlaces.Address = $('#address').val();
        InterestedPlaces.City = $('#city').val();
        InterestedPlaces.Category = $('#category').val();
        
        $.ajax({

            url: 'http://localhost:8000/api/v1/places',
            type: 'POST',
            data: place,
            success: function (data) {
                console.log(data);
            }

            }

        });
    });

});


