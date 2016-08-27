var mapOptions;
var theMap;
var infoWindow;
var markers = [];
var directionsDisplay;
var directionsService;

function initMap() {
    mapOptions = {
        zoom: 15,
        center: { lat: 23.6266557, lng: -102.5375005 },
    };
    theMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    infoWindow = new google.maps.InfoWindow({map: theMap});
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(theMap);
    directionsService = new google.maps.DirectionsService();

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            theMap.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, theMap.getCenter());
        });
    } else {
        infoWindow.setPosition(theMap.getCenter());
        infoWindow.setContent('Error: The geolocation service failed.');
    }
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
