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

            infoWindow.setPosition(pos);
            infoWindow.setContent('This is your location');
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

function route(start, end) {
    var request = {
        origin: start.LatLng,
        destination: end.LatLng,
        travelMode: google.maps.TravelMode.CAR
    };
    directionsService.route(request, function(result, status) {
        if(status == google.maps.Directionstatus.OK) {
            directionsDisplay.setDirections(result);
        } else {
            alert("Could not get directions: " + status);
        }
    });
}
