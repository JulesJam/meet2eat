angular
  .module("Meet2Eat")
  .controller("UsersEditController", UsersEditController);

UsersEditController.$inject = ["User", "$state"]

function UsersEditController(User, $state) {

  
  this.selected = User.get($state.params);
  


  console.log("selected", this.selected);

  this.save = function(){
    console.log("trying to update", this.selected);
    // find lat / lng from address
    // add to this.selected

    this.selected.$update(function(){
      console.log("updating", this.selected);
      $state.go('usersShow', $state.params);
    });
  }
}