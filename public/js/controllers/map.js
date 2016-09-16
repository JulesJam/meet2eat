 angular
  .module('Meet2Eat')
  .controller('MapController', MapController)
  .directive('map', Gmap);

console.log("linked");


MapController.$inject = ["User", "$scope", "$auth"]
function MapController(User, $scope, $auth){
  var self = this;
  var users = User.query();
  self.home = "";
  self.homeLatLng = {};
  self.work = "";
  self.locationChosen ={};
  self.meetDay = "";
  self.meetMeal = "";
  self.meetGroup = 0;
  this.mapCenter = { lat: 51.4882, lng: -0.0193};



  this.currentUser = $auth.getPayload()._id;

  console.log("Current User", this.currentUser)

  User.get({id: this.currentUser}, function(data){
    self.home = data.locationNameHome;
    self.homeLatLng = data.locationHome;
    self.work = data.locationNameWork;
    self.locationChosen =data.locationChosen;
    self.meetDay = data.meetDay;
    self.meetMeal = data.meetMeal;
    self.meetGroup = data.meetGroup;
    self.mapCenter =data.locationChosen;
    

    console.log("map",self.mapCenter);

    
  });


  this.places = [];


  User.query().$promise.then(function(data){
    for (i=0; i< data.length; i++){
      if(data[i].locationHome && data[i].loggedIn) {
        console.log(data[i].locationHome, data[i].age);
        self.places.push({
          name: data[i].username,
          age: data[i].age,
          meal: data[i].meetMeal,
          cuisine: data[i].meetCuisine,
          occupation:data[i].occupation,
          position: { lat: data[i].locationHome.lat, lng: data[i].locationHome.lng }
        });
      }
    }
    // console.log(this.places);
  });

  console.log("current user location chosen", self.locationChosen)


 
 
}

Gmap.$inject = ['$timeout', "$auth", "User"];



function Gmap($timeout, $auth, User) {
  var self = this
  
  this.currentUser = $auth.getPayload()
  console.log("new center yeah!", this.currentUser);

  User.get({id: this.currentUser._id}, function(data){

    self.currentUserMatch = data.match;
    self.locationChosen = data.locationChosen

    
  });






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
            meal: place.meal,
            label: place.name,
            icon:{
             url: 'https://s3-eu-west-1.amazonaws.com/meetoeat/man.png'}
            });

          marker.infoWindow = new google.maps.InfoWindow({
            content: place.name+" aged "+place.age+" who spends most of the day "+place.occupation+" is looking to eat "+place.meal,
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