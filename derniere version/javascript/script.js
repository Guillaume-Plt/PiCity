$(document).ready(function(){
  var api_key ="58967d508ad68202652256f3bd56fba5";

  $("#champsSaisie").on("input",function(){
    $("#listeCommunes").empty();
    $.getJSON("http://infoweb-ens/~jacquin-c/codePostal/commune.php?commune="+$("#champsSaisie").val()+"&maxRows=5", function(data){
        for (var i in data) {
          $("#listeCommunes").append("<option value='"+data[i].Ville+"'>"+data[i].Ville+"</option>");
        }
      });
  });
  $("#modal").dialog({
                 autoOpen: false,
              });

  $("#soumission").on("click",function(){
    $("#imagesL").empty();
    $("#imagesT").empty();
    $.ajax({
    url:'https://api.flickr.com/services/rest/',
    type:'GET',
    dataType:'json',
    data:'method=flickr.photos.search&nojsoncallback=1&safe_search=1&tags='+$("#champsSaisie").val()+'&format=json&api_key='+api_key,
    success:function(data){
    $.each(data.photos.photo, function(i,item){
                $("<img/>").attr("src",
                "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_b.jpg"
              ).attr("height","150px").attr("padding-top","5px").attr("padding-right","5px").attr("id",item.id)
              .attr("secret",item.secret).attr("class","pictureL").click(details).appendTo("#imagesL");

              $("<img/>").attr("src",
              "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_b.jpg"
            ).attr("height","150px").attr("padding-top","5px").attr("padding-right","5px").attr("id",item.id)
            .attr("secret",item.secret).attr("class","pictureT").click(details).appendTo("#imagesT");
                 if ( i == $("#nbPhotos").val()-1 ) return false ; });
               
             
               
              },
    error: function(resultat,statut,erreur){
    alert("erreur");},
     });
  });

function details(){
  $("#modal").empty();
  $("#modal").append("<img/>").attr("src",$(this).attr("src"));
  $.getJSON(
    "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+api_key+"&format=json&nojsoncallback=1&photo_id="+$(this).attr("id")+"&secret="+$(this).attr("secret")
    ).done(function(data){
      $("#modal").append("<div>Auteur : "+data.photo.owner.realname+" aka : "+data.photo.owner.username+" originaire de :"+data.photo.owner.location+"</div>")
    }).fail(function(oldRequest,text,error){
    });
  $("#modal").dialog("open");
}

  $("#nbPhotos").on("input",function(){
    var val = $("#nbPhotos").val();
    $("#curseur").text(val);
  });
});
