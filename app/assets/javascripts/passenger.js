var colors = ["#638EF2", "#BC91EA", "#D3E28E", "#9CC0E5", "#E8A4CA"];
var currentColor = 0;

function initPassenger() {
    initMap();
    getRoads();
}

function getRoads() {
    $.get( "/roads.json", function( roads ) {
        drawRoad(roads);
    });
}

function drawRoad(roads) {
    roads.forEach(function(road) {
        var path = JSON.parse(road.path);
        var request = {
            origin: path.start,
            destination: path.end,
            waypoints: path.waypoints,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
            if(status == "OK") {
                currentColor = (currentColor + 1) % colors.length;
                var dD = new google.maps.DirectionsRenderer({
                  polylineOptions: { strokeColor: colors[currentColor] }
                });
                google.maps.event.addListener(dD, 'directions_changed', function(event) {
                  var path = dD.getDirections().routes[0].overview_path;
                  var eventLine = new google.maps.Polyline({
                    path: path,
                    visible: true,
                    strokeOpacity: 0,
                    strokeColor: currentColor,
                    strokeWeight: 20,
                    zIndex: 1000
                  });
                  eventLine.setMap(theMap);
                  google.maps.event.addListener(eventLine, 'click', function(event) {
                    alert("asdfasdf");
                  });
                });
                dD.setMap(theMap);
                dD.setDirections(result);
            } else {
                alert("Could not get directions: " + status);
            }
        });
    });
}

function pickRoad(directionsDisplay, road) {
    return function() {
        alert("You selected: " + road.id);
    };
}
