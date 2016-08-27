function initMap() {
    var mapOptions = {
        zoom: 5,
        center: { lat: 23.6266557, lng: -102.5375005 },
    };
    var theMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var infoWindow = new google.maps.InfoWindow({map: theMap});

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
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocatio service failed.' :
                          'Error: Your browser does not support geolocation.');
}
