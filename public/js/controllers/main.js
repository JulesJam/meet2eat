angular
  .module("Meet2Eat")
  .config(oAuthConfig)
  .controller("MainController", MainController);

oAuthConfig.$inject = ["$authProvider"];

function oAuthConfig($authProvider){
  $authProvider.facebook({
    url:'/api/facebook',
    clientId:'1407625159253897'
  });
}

MainController.$inject = ["TokenService", "$state", "$rootScope", "$auth"];
function MainController(TokenService, $state, $rootScope, $auth) {

  var self = this;



  this.currentUser =$auth.getPayload();
  this.errorMessage = null;



  this.logout = function logout() {
    $auth.logout();
    this.currentUser = null;
    $state.go("login");
  }
    



  $rootScope.$on("loggedIn", function() {
    self.currentUser = $auth.getPayload();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "You must be logged in!";
  });

  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });
}
