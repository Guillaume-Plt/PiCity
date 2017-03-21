$(document).ready(function(){
  $("#champsSaisie").on("keyup",function(){
    $("#listeCommunes").empty();
    $.getJSON("http://infoweb-ens/~jacquin-c/codePostal/commune.php?commune="+$("#champsSaisie").val()+"&maxRows=5", function(data){
        for (var i in data) {
          $("#listeCommunes").append("<option value='"+data[i].Ville+"'>"+data[i].Ville+"</option>");
        }
      });
  });


  $("#soumission").on("click",function(){
    $("#images").empty();
    $.ajax({
    url:'http://api.flickr.com/services/feeds/photos_public.gne',
    type:'GET',
    dataType:'jsonp',
    jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
    data:'tags='+$("#champsSaisie").val()+'&tagmode=any&format=json',
    success:function(data){
    $.each(data.items, function(i,item){
                $("<img/>").attr("src", item.media.m).appendTo("#images");
                if ( i == $("#nbPhotos").val()-1 ) return false ; });
              },
    error: function(resultat,statut,erreur){
    alert("erreur");},
     });
  });





});
