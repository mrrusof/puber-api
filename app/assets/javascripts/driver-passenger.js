var mapOptions;
var theMap;
var markers = [];
var directionsService;

function initMap() {
    mapOptions = {
        zoom: 15,
        center: { lat: 25.6702468, lng: -100.3778658 },
    };
    theMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsService = new google.maps.DirectionsService();

    // Try HTML5 geolocation
    // if(navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         theMap.setCenter(pos);
    //     }, function() {
    //         alert('Error: The geolocation service failed.');
    //     });
    // } else {
    //     alert('Error: Your browser does not support geolocation.');
    // }
};

function addMarker(location, map, title) {
    var marker = new google.maps.Marker({ position: location,
                                          title: title,
                                          map: map });
    markers.push(marker)
}

function removeMarkers(){
  for(var i=0; i < markers.length; i++ ){
    markers[i].setMap(null);
  }
}
