angular
  .module("Meet2Eat")
  .controller("LoginController", LoginController);

LoginController.$inject =["User", "$state", "$rootScope"];
function LoginController(User, $state, $rootScope){

  this.credentials ={};

  this.submit = function submit(){
    User.login(this.credentials, function(res){
      $rootScope.broadcast("loggedIn");
      $state.go('home');
      console.log(res);
    });
  }
}