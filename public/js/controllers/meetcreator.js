angular
  .module("Meet2Eat")
  .controller("MeetCreatorController", MeetCreatorController);

  MeetCreatorController.$inject = ["User", "$state", "$auth", "Geolocator", "Geocoder"];

  function MeetCreatorController(User, $state, $auth, Geolocator, Geocoder) {
    var self = this;

    this.position = null;
    this.message = "Determining geolocation...";
    this.home = "";
    this.username = $auth.getPayload()._id;

    Geolocator()
      .then(function(position){
        self.position = position;
        return Geocoder(position);
      })
      .then(function(address) {
        self.currentLocation = address.formatted_address;
      })
      .catch(function(reason){
        self.message = "Could Note Be Determined"
      });

    User.get({id: this.username}, function(data){
      self.home = data.locationHome;
      self.work = data.locationWork;
    });
   



    
    };
  