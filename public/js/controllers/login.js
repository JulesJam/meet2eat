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
      $state.go('meetCreator');
    });
  }

  this.submit = function submit(){

    $auth.login(this.credentials, {
      url:"api/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      this.currentUser = $auth.getPayload();
      User.update({id: self.currentUser}, {loggedIn: true
      });
      $state.go('meetCreator');
      self.currentUser = $auth.getPayload();
  
    });
  };

  
}