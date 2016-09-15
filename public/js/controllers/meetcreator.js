angular
  .module("Meet2Eat")
  .controller("MeetCreatorController", MeetCreatorController);

MeetCreatorController.$inject = ["User", "$state", "$auth", "Geolocator", "Geocoder", "RestaurantLookUp"];

function MeetCreatorController(User, $state, $auth, Geolocator, Geocoder, RestaurantLookUp) {
  var self = this;

  this.locationChosen = "";
  this.meetDay = "";
  this.meetMeal = "";
  this.group = false;
  this.meetGroup = 1
  this.position = null;
  this.chosenCuisine;
  this.message = "Determining geolocation...";
  this.home = "";
  this.currentUser = $auth.getPayload()._id;

  Geolocator()
    .then(function(position){
      self.position = position;
      var latLng = {
          lat: position.lat,
          lng: position.lng
      };
      User.update({id: self.currentUser}, {locationCurrent: latLng }, function(res) {
      });
      return Geocoder(position);
    })
    .then(function(address) {
      self.currentLocation = address.formatted_address;

      return RestaurantLookUp.getCuisines(self.position)
    })
    .then(function(cuisines) {
      self.cuisines = cuisines
      self.cuisines.reverse();
    })
    .catch(function(reason){
      self.message = "Could Note Be Determined"
    });

  this.submit = function submit(){

    var latLng = {
        lat: self.homeLatLng.lat,
        lng: self.homeLatLng.lng
    };
   

    if (self.locationChosen === self.home){
      console.log ("converted latlng", latLng.lat, latLng.lng);
      self.locationChosen =latLng;
      console.log("chosen", self.locationChosen);
      
    }
    else if (self.locationChosen === self.work){
      self.locationChosen = self.workLatLng
    }
    else {
      self.locationChosen = self.locationCurrent};

    if (!self.meetGroup) self.meetGroup = 0;


    User.update({id: self.currentUser}, {locationChosen: self.locationChosen, meetDay: self.meetDay, meetMeal: self.meetMeal, meetGroup: self.meetGroup}, function(res) {
      console.log(res);
    });

  }

 console.log("cusines", self.cuisines);

  User.get({id: this.currentUser}, function(data){
    self.home = data.locationNameHome;
    self.homeLatLng = data.locationHome;
    self.workLatLng = data.locationWork;
    self.work = data.locationNameWork;
    self.locationChosen =data.locationChosen;
    self.meetDay = data.meetDay;
    self.meetMeal = data.meetMeal;
    self.meetGroup = data.meetGroup;
    self.locationCurrent = data.locationCurrent;
    console.log("location", self.locationChosen, data.locationHome, self.homeLatLng)

    
  });
};
  