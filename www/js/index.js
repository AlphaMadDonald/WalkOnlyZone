 
"use strict";


//global variables
var pos;      
var mapElement    = undefined;
var map       = undefined;
var curLatLng     = undefined;
var marker      = undefined;
var zoom      = 18;
var roadblocks = [];

/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  StatusBar.overlaysWebView(false);
  loadScript('initMap');
}

function loadScript(callback) 
{
  var script     = undefined;
  var googleAPIKey = "AIzaSyB2XMjfT6cva-JivItdDzUtPrmSxTI3pSs";
  var googleAPIUrl = "https://maps.googleapis.com/maps/api/js";

  var srcURL     = googleAPIUrl + '?key=' + googleAPIKey 
              + '&callback=' + callback;

  script       = document.createElement('script');
  script.type    = "text/javascript";
  script.async   = true;
  script.defer   = true;
  script.src     = srcURL;

  // document.body.appendChild(script);
}


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: 33.4166317, lng: -111.9341069},
    zoom: 13
  });

        //use geolocation to locate the current location of individual
        // pos is the object with current coordinates 
        //infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) 
        {
          navigator.geolocation.getCurrentPosition(function(position) 
          {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            marker = new google.maps.Marker({position:pos, map: map});
            //infoWindow.open(map);
            map.setCenter(pos);
            console.log(pos);

          }, function() 
          {
            handleLocationError(true, infoWindow, map.getCenter());
          },
          {enableHighAccuracy : true});
        } 
        else 
        {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        new AutocompleteDirectionsHandler(map);
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) 
      {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      function errorHandler(err) {
        if(err.code == 1) {
         alert("Error: Access is denied!");
       } else if( err.code == 2) {
         alert("Error: Position is unavailable!");
       }
     }

       /**
        * @constructor
        */
        function AutocompleteDirectionsHandler(map) 
        {
          this.map = map;
        // this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        // var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        // var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        
        var destinationAutocomplete = new google.maps.places.Autocomplete(
          destinationInput, {placeIdOnly: true});

        // this.setupClickListener('changemode-walking', 'WALKING');
        // this.setupClickListener('changemode-transit', 'TRANSIT');
        // this.setupClickListener('changemode-driving', 'DRIVING');

        // this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
      }

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.destinationPlaceId) {
          return;
        }
        var me = this;

        

        this.directionsService.route({
          origin: pos,
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode,
          provideRouteAlternatives: true,
          avoidFerries: true,
          avoidHighways: true,
          avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

        console.log du
      };

      function GeneratingWalkOnlyRoadblocks()
      {
        //roadblocks = 
      }