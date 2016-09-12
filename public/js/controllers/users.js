angular
  .module("Meet2Eat")
  .controller("UsersController", UsersController);

UsersController.$inject = ["User", "$state"]

function UsersController(User, $state) {
  
  this.all = User.query();

}


