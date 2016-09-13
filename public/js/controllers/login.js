angular
  .module("Meet2Eat")
  .controller("LoginController", LoginController);



LoginController.$inject =["User", "$state", "$rootScope", "$auth"];
function LoginController(User, $state, $rootScope, $auth){

  this.credentials ={};


  this.authenticate = function(provider) {
    console.log("Facebook?", provider)
    $auth.authenticate(provider)
    .then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('users');
    });
  }

  this.submit = function submit(){
    $auth.login(this.credentials, {
      url:"api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('users');
      self.currentUser = $auth.getPayload();
  
    });
  };

  
}