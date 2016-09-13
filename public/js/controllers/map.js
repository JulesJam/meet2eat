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
    for (i=0; i< data.length; i++){
      if(data[i].locationHome) {
        console.log(data[i].locationHome, data[i].age);
        self.places.push({
          name: data[i].username,
          age: data[i].age,
          position: { lat: data[i].locationHome.lat, lng: data[i].locationHome.lng }
        });
      }
    }
    // console.log(this.places);
  });

  this.mapCenter = { lat: 51.4882, lng: -0.0193};
 
 
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

        markers.forEach(function(marker, infowindow) {
          marker.setMap(null); // removes marker from map
        });

        markers = scope.markers.map(function(place){
          var marker = new google.maps.Marker({
            position: place.position,
            map: map,
            name: place.name,
            age: place.age,
            label: "\xE2\x9C\x88",
            icon:{
             url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
            });

          marker.infoWindow = new google.maps.InfoWindow({
            content: place.name+" aged "+place.age+" looking to eat",
            disableAutopan: true,
          });

          marker.addListener('click', function() {
            markers.forEach(function(marker) {
              marker.infoWindow.close();
            });

            this.infoWindow.open(map, this);
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