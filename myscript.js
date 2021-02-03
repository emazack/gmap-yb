// dicitura per rendere la pagina pronta a ricevere funzioni e terminologia jQuery
// // $(document).ready(function(){

  // serve per riferire un evento ad un elemento in pagina che è stato caricato dopo il caricamento iniziale delle pagina (magari perchè è stato creato)
  // // $(ElementoGiaPresenteACuiRiferirsi).on(EventoTriggerante, ElementoCreatoDopoACheScatenaLevento,
  // //   function(){
  // //   }
  // // );

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
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var directionsMap;
  var directionsLatLng;
  var directionsLatitude;
  var directionsLongitude;
  var map;
  var start;
  var end;
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(45.697981, 9.668953),
    zoom: 15,
  });


  function getInputValue(idInputDomElement){
    var inputVal = document.getElementById(idInputDomElement).value;
    return inputVal;
  }  
  
  function setInputValue(idInputDomElement, valueToBeSet){
    var inputVal = document.getElementById(idInputDomElement).value = valueToBeSet;
    return inputVal;
  }

  function getDirectionsLocation() {
    console.log("getDirectionsLocation");
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showDirectionsPosition);
      } else {
          map.innerHTML = "La geolocalizzazione non è supportata in questo dispositivo";
      }
  }
  
  function showDirectionsPosition(position) {
    console.log("showDirectionsPosition");
      directionsLatitude = position.coords.latitude;
      directionsLongitude = position.coords.longitude;
      directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
  }

  function getDirections(startingPoint) {
    console.log('getDirections');
    directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsOptions = {
      zoom:12,
      center: startingPoint
    }
    directionsMap = new google.maps.Map(document.getElementById("map"), directionsOptions);
    directionsDisplay.setMap(directionsMap);
    calcRoute();
  }

  function calcRoute() {
    console.log("calcRoute");    
    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    console.log(request);
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  }

  getDirectionsLocation();
  

  document.getElementById("position-partenza").addEventListener("click", function() {
    if (directionsLatLng) {
      setInputValue('partenza', directionsLatitude + ',' + directionsLongitude);
    } else {
      getDirectionsLocation();
    }
  } );

  document.getElementById("position-destinazione").addEventListener("click", function() {
    if (directionsLatLng) {
      setInputValue('destinazione', directionsLatitude + ',' + directionsLongitude);
    } else {
      getDirectionsLocation();
    }
  } );  
  
  document.getElementById("calc-route").addEventListener("click", function() { 
    start = getInputValue('partenza');
    end = getInputValue('destinazione');
    getDirections();
  } );
};