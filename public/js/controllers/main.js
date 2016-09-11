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

  this.currentUser = TokenService.decodeToken();
  this.errorMessage = null;

  this.logout = function logout() {
    TokenService.clearToken();
    this.currentUser = null;
    $state.go("login");
  }


  this.authenticate = function(provider) {
    console.log("Facebook?", provider);
    $auth.authenticate(provider);
    $rootScope.$broadcast("loggedIn");
    $state.go('users');
  }


  $rootScope.$on("loggedIn", function() {
    self.currentUser = TokenService.decodeToken();
  });

  $rootScope.$on("unauthorized", function() {
    $state.go("login");
    self.errorMessage = "You must be logged in!";
  });

  $rootScope.$on("$stateChangeStart", function() {
    self.errorMessage = null;
  });
}
