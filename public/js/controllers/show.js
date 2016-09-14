angular
  .module("Meet2Eat")
  .controller("UsersShowController", UsersShowController);

  UsersShowController.$inject = ["User", "$state"]

  function UsersShowController(User, $state) {
  
    this.selected = User.get($state.params);
    console.log ("state params", $state.params);

    this.delete = function(){
      this.selected.$remove(function(){
        $state.go('users')
      });
    }
  }