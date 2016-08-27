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
        // Browser does not support geolocation
        handleLocationError(false, infoWindow, theMap.getCenter());
    }

    // Set markers when user clicks.
    google.maps.event.addListener(theMap, 'click', function(e) {
        var l = markers.length;
        if(l == 0) {
            addMarker(e.latLng, theMap, 'Origen');
        } else if(l == 1) {
            addMarker(e.latLng, theMap, 'Destino');
            route(markers[0], markers[1]);
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocatio service failed.' :
                          'Error: Your browser does not support geolocation.');
}

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

function route(start, end, waypoints=[]) {
  var waypoint = {
    location: new google.maps.LatLng(25.669883, -100.380232),
    stopover: true
  }
  var waypoint1 = {
    location: new google.maps.LatLng(25.969883, -100.480232),
    stopover: true
  }
  var waypoints = [waypoint, waypoint1];
  var request = {
    origin: start.getPosition(),
    destination: end.getPosition(),
    waypoints: waypoints,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if(status == "OK") {
      directionsDisplay.setDirections(result);
      removeMarkers();
      populateRoadInput(start, end, waypoints);
    } else {
      alert("Could not get directions: " + status);
    }
  });
}

function populateRoadInput(start, end, waypoints){
  var waypointsJSON = [];
  for(var i=0; i < waypoints.length; i++){
    waypointsJSON.push(waypoints[i].location.toJSON());
  }
  var routeJSON = { start: start.getPosition().toJSON(),
    end: end.getPosition().toJSON(),
    waypoints: waypointsJSON }
  $("#road_path").val(JSON.stringify(routeJSON));
}
