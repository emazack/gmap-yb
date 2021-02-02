// dicitura per rendere la pagina pronta a ricevere funzioni e terminologia jQuery
// // $(document).ready(function(){

  // serve per riferire un evento ad un elemento in pagina che è stato caricato dopo il caricamento iniziale delle pagina (magari perchè è stato creato)
  // // $(ElementoGiaPresenteACuiRiferirsi).on(EventoTriggerante, ElementoCreatoDopoACheScatenaLevento,
  // //   function(){
  // //   }
  // // );

  // gestione Handlebars:
  // Prendo quello che è contenuto nello script selezionandolo tramite id
  // // var source = $("#template-mex-inviato").html();
  // ciò che ho preso lo do a Handlebars e glielo faccio smaneggiare
  // // var template = Handlebars.compile(source);
  // creo una variabile che contiene l'informazione completa del tamplate + il testo inserito dinamicamente
  // // var html = template(testoInputObject);
  // inserisco l'informazione del template "html" dove voglio io
  // // $(".DoveVoglioIo").append(html);

  // chiamate AJAX per utilizzare api
  // // $.ajax({
  // //   url : "https://flynn.boolean.careers/exercises/api/random/int",
  // //   method : "GET",
  // //   success: function (data,stato) {
  // //     // quello che succede se tutto va bene
  // //   },
  // //   error : function (richiesta, stato, errore) {
  // //     // quello che succede se c'è un errore. Ex:
  // //     alert("E' avvenuto un errore. " + errore);
  // //   }
  // // });

// // });

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(45.697981, 9.668953),
    zoom: 15,
  });

    //directions
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var directionsMap;
  var z = document.getElementById("map");
  var start;
  var end = prompt("Dove vuoi andare, caro Biagini?")

  function getDirectionsLocation() {
    console.log("getDirectionsLocation");
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showDirectionsPosition);
      } else {
          z.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  
  function showDirectionsPosition(position) {
    console.log("showDirectionsPosition");
      directionsLatitude = position.coords.latitude;
      directionsLongitude = position.coords.longitude;
      directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
      getDirections();
  }

  function getDirections() {
    console.log('getDirections');
    directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsOptions = {
      zoom:12,
      center: start
    }
    directionsMap = new google.maps.Map(document.getElementById("map"), directionsOptions);
    directionsDisplay.setMap(directionsMap);
    calcRoute();
  }

  function calcRoute() {
    console.log("calcRoute");
    start = directionsLatLng;
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }

  getDirectionsLocation();
};