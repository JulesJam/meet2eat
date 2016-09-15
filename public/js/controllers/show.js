angular
  .module("Meet2Eat")
  .controller("UsersShowController", UsersShowController);

  UsersShowController.$inject = ["User", "$state", "$auth"]

  function UsersShowController(User, $state, $auth) {

    this.edictable = false;

    this.currentUser = $auth.getPayload()._id;


  
    this.selected = User.get($state.params);

    $state.params.id === this.currentUser? this.editable = false : this.editable = true;
    
    console.log($state.params.id, this.currentUser, this.editable);


    console.log ("state params", $state.params);

    this.delete = function(){
      this.selected.$remove(function(){
        $state.go('users')
      });
    }
  }