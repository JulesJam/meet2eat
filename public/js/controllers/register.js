angular
  .module("Meet2Eat")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope"]
function RegisterController(User, $state, $rootScope){
  var self = this;
  console.log("hello2" +this.user);
  this.user = {};

  this.submit = function(){
    console.log(this.user.locationNameHome);
    var address = this.user.locationNameHome +" UK";
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address':address}, function(results, status){

      if (status == 'OK'){
        var lat = ((results[0].geometry.viewport.f.b + results[0].geometry.viewport.f.f)/2);
        var lng = ((results[0].geometry.viewport.b.b + results[0].geometry.viewport.b.f)/2);
        self.user.locationHome = {lat: lat, lng: lng};
        User.register(self.user, function(res){
          $rootScope.$broadcast("loggedIn");
          $state.go("home");

        });
      }
      else{console.log(status + "it went wrong" + results);
      }

    });
    
 
  }

 
}

