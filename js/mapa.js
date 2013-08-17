var map, latLng, marker, infoWindow, ad;
var geocoder = new google.maps.Geocoder();

function showAddress(val) {
  infoWindow.close();
  geocoder.geocode( { 'address': val }, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
  marker.setPosition(results[0].geometry.location);
  geocode(results[0].geometry.location);
  } else {
  alert("Sorry but Google Maps could not find this location.");
  }
  });
}

function geocode(position) {
geocoder.geocode({
latLng: position
}, function(responses) {
var html = '';
if (responses && responses.length > 0) {
html += '<strong>Postal Address:</strong><hr/>' + responses[0].formatted_address;
//_gaq.push(['_trackEvent', 'Maps', 'Drag', responses[0].formatted_address, 0, true]);
} else {
html += 'Sorry but Google Maps could not determine the approximate postal address of this location.';
}

html += '<br /><br /><strong>Geo Co-ordinates</strong><hr />' + 'Latitude : ' + marker.getPosition().lat() + '<br/>Longitude: ' + marker.getPosition().lng();
map.panTo(marker.getPosition());
infoWindow.setContent("<div id='iw'>" + html + "</div>");
infoWindow.open(map, marker);
});
}

function initialize() {

var myOptions = {
zoom: 12,
panControl: false,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

map = new google.maps.Map(document.getElementById('map-canvas'),
myOptions);

defaultLocation();

}

function locationFound(position) {
showMap(position.coords.latitude, position.coords.longitude);
}

function defaultLocation() {
showMap(-12.0478, -77.0622);
}

function showMap(lat, lng) {

latLng = new google.maps.LatLng(lat, lng);

var adUnitDiv = document.createElement('div');

var width = window.innerWidth || document.documentElement.clientWidth;

var adUnitOptions = {
format: 1000,
position: google.maps.ControlPosition.TOP_CENTER,
map: map,
visible: true
}

map.setCenter(latLng);

marker = new google.maps.Marker({
position: latLng, map: map, draggable: true, animation: google.maps.Animation.DROP
});

infoWindow = new google.maps.InfoWindow({
content: '<div id="iw"><strong>Instructions:</strong><br /><br />Click and drag this red marker anywhere to know the approximate postal address of that location.</div>'
});

infoWindow.open(map, marker);

google.maps.event.addListener(marker, 'dragstart', function (e) {
infoWindow.close();
});

google.maps.event.addListener(marker, 'dragend', function (e) {
var point = marker.getPosition();
map.panTo(point);
geocode(point);
});
}

google.maps.event.addDomListener(window, 'load', initialize);


//showAddress('Ate, Peru');