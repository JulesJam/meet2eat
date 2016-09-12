 angular
  .module('Meet2Eat')
  .controller('MapController', MapController)
  .directive('map', Gmap);

console.log("linked");


MapController.$inject = ["User", "$scope"]
function MapController(User, $scope){
  var self = this;
  var users = User.query();
  this.places = [];

  User.query().$promise.then(function(data){
    for (i=0; i< data.length-1; i++){

      if(data[i].locationHome) {
        self.places.push({
          name: data[i].username,
          position: { lat: data[i].locationHome[0].lat, lng: data[i].locationHome[0].lng }
        });
      }
    }
    // console.log(this.places);
  });

  this.mapCenter = { lat: 51.4882, lng: -0.0193};
 

  // this.places = [
  //   { name: "A", position: { lat:51.4882, lng:-0.0193 } },
  //   { name: "B", position: { lat:51.5346, lng:-0.1000 } },
  //   { name: "C", position: { lat:51.6578, lng:-0.1233 } },
  //   { name: "D", position: { lat:51.4000, lng:-0.0010 } },
  // ];
  
              
 
}

Gmap.$inject = ['$timeout'];

function Gmap($timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      markers: '='
    },

    link: function(scope, element, attr){

      var markers = [];

      if(!scope.center){
        throw new Error('You must include a center point for your google map!)');
      }
      var map = new google.maps.Map(element[0],{
        center: scope.center,
        zoom: 10
      });

      scope.$watch('markers.length', updateMarkers);

      function updateMarkers() {

        markers.forEach(function(marker) {
          marker.setMap(null); // removes marker from map
        });

        markers = scope.markers.map(function(place){
          var marker = new google.maps.Marker({
            position: place.position,
            map: map,
            name: place.name
          });

          marker.addListener('click', function() {
            console.log("Ooooh, you clicked me!", this.name);
          });

          return marker;
        });
      }

      if(scope.markers){
        updateMarkers();
      }
    }
  }

}