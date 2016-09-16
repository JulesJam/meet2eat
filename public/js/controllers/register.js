angular
  .module("Meet2Eat")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope", "$auth"]
function RegisterController(User, $state, $rootScope, $auth){
  var self = this;
  console.log("hello2" +this.user);
  this.user = {};

  this.submit = function(){
    console.log(this.user.locationNameHome);
    this.user.avatar = "no_image.png";
    var address = this.user.locationNameHome +" UK";
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address':address}, function(results, status){

      if (status == 'OK'){
        var lat = ((results[0].geometry.viewport.f.b + results[0].geometry.viewport.f.f)/2);
        var lng = ((results[0].geometry.viewport.b.b + results[0].geometry.viewport.b.f)/2);
        self.user.locationHome = {lat: lat, lng: lng};
        self.match = this.drinkPreference+this.foodPreference+this.filmPreference+this.bookPreference+this.entertainmentPreference;
        console.log("user.. ", self.user);
        $auth.signup(self.user,{
          url: "/api/register"
        })
       .then(function(){
          $rootScope.$broadcast("loggedIn");
          $state.go("login");

        });
      }
      else{console.log(status + " it went wrong" + results);
      }

    });
    
 
  }

 
}

