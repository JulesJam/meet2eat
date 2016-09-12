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
            age: place.age
          });

          // var infoWindow = new google.maps.InfoWindow({
          //   content: "This is the content",
          //   disableAutopan: true,
          // });

          marker.addListener('click', function() {
            console.log("Ooooh, you clicked me! "+this.name+" aged"+ this.age);
          });


          // marker.addListener('mouseover', function() {
          //   infowindow.open(map, marker);
          // });
            
              
          // marker.addListener('mouseout', function() {
          //   infowindow.close();
          // });

          return marker;
        });
      }

      if(scope.markers){
        updateMarkers();
      }
    }
  }

}