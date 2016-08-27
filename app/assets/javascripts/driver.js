var directionsDisplay;

function initDriver() {
    initMap();

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(theMap);

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


function route(start, end) {
  // var waypoint1 = { // TODO use when we allow waypoints for driver
  //   location: new google.maps.LatLng(25.669883, -100.380232),
  //   stopover: true
  // }
  // var waypoint2 = { // TODO use when we allow waypoints for driver
  //   location: new google.maps.LatLng(25.969883, -100.480232),
  //   stopover: true
  // }
  // var waypoints = [waypoint1, waypoint2]; // TODO use when we allow waypoints for driver
  var waypoints = [];
  var request = {
    origin: start.getPosition(),
    destination: end.getPosition(),
    waypoints: waypoints, // TODO use when we allow waypoints for driver
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
