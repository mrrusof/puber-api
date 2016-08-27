var directionsDisplays = [];
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
                directionsDisplays.push(dD);
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
