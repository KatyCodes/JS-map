// var Maps = require('./../js/maps.js').MapsModule;
var apiKey = require('./../.env').apiKey;

$( document ).ready(function() {
  $('head').append('<script src=\"https://maps.googleapis.com/maps/api/js?key=' + apiKey + '\" async defer></script>');
  $('#locate_User').click(locateUser);
  $('#user_input').submit(function(event) {
    event.preventDefault();
    var userlatitude = $('#latitude').val();
    var userlongitude = $('#longitude').val();
    // var Newpoint = new NewMap();
    // console.log(Newpoint);
    var userLatLng = new google.maps.LatLng(userlatitude, userlongitude);
    var myOptions = {
      zoom : 5,
      center : userLatLng,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    // Place the marker
    new google.maps.Marker({
      map: mapObject,
      position: userLatLng
    });
  });
});

//google maps functions
function locateUser() {
  // If the browser supports the Geolocation API
  if (navigator.geolocation){
    var positionOptions = {
      enableHighAccuracy: true,
      timeout: 10 * 1000 // 10 seconds
    };
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

function newLocation(lat, long) {
  var newLocation = new google.maps.LatLng(lat, long);
  return newLocation;
}

// this is the success callback from telling the navigator (your browser) to get the current user's position
// we do this on line 13 above. We pass in a function to call on success, a function to call on error, and some options to tell the geolocation api how we want it to run.
// on successfully locating the user, geolocationSuccess() gets called automatically, and it is passed the user's position as an argument.
// on error, geolocationError is called.

function geolocationSuccess(position) {
    // here we take the `position` object returned by the geolocation api
    // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
    // it 2 arguments: one for latitude, one for longitude.
    // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
    // But you must use coordinates to use this method.
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //  var newLocation = Newpoint.newLocation(userlatitude, userlongitude);


    var myOptions = {
      zoom : 5,
      center : userLatLng,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    // Draw the map - you have to use 'getElementById' here.
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    // Place the marker
    new google.maps.Marker({
      map: mapObject,
      position: userLatLng
    });
    // new google.maps.Marker({
    //   map: mapObject,
    //   position: newLocation
    // });
}

function geolocationError(positionError) {
    alert(positionError);
}
