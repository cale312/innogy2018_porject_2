
 $(document).ready(function () {
//populating radio buttons
 


   $('.filter-box input').on('change', function(){
        var RadioTemplate = document.getElementById('closePlaces').innerHTML;
        var template = Handlebars.compile(RadioTemplate);
        var radioForInterest=$('input[type="radio"]:checked', '.filter-box').val();
         console.log("",radioForInterest);
         if($('input[type="radio"]').is(':checked')){
        //var val = $('input[type="radio"]').val();
        $.ajax({
        url:apiURL,
        type:"GET",
        success:function(product){
            console.log(product);
            document.getElementById("display").innerHTML=template({
            data:product.places
            })
       }
     })
    }
    else if($('input[type="radio"]').is(':checked')){

      $.ajax({
        url:apiURL,
        type:"GET",
        success:function(product){
            console.log(product);
            document.getElementById("display").innerHTML=template({
            data:product.places
            })
       }
     })
    }
        

    }
  
     
   
    //  else if(radioForInterest==coffee){
    //   alert('second ajax call ');
    //   }
    //   else if(radioForInterest==artshops){
    //     alert('second ajax call ');
    //     }
    //     else if(radioForInterest==clubs){
    //       alert('second ajax call ');
    //       }
    //       else if(radioForInterest==park){
    //         alert('second ajax call ');
    //         }
  
          })
        })