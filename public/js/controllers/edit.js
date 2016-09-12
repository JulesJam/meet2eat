angular
  .module("Meet2Eat")
  .controller("UsersEditController", UsersEditController);

UsersEditController.$inject = ["User", "$state"]

function UsersEditController(User, $state) {

  
  this.selected = User.get($state.params);

  this.save = function(){

    // find lat / lng from address
    // add to this.selected

    this.selected.$update(function(){
      $state.go('usersShow', $state.params);
    });
  }
}