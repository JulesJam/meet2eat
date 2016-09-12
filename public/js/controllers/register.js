angular
  .module("Meet2Eat")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["User", "$state", "$rootScope"]
function RegisterController(User, $state, $rootScope){
  this.user = {};
  this.submit = function(){
    User.register(this.user, function(res){
      $rootScope.$broadcast("loggedIn");
      $state.go("home");
    });
  }

  this.select = function () {
      var x = document.getElementById("myRange").value;
      document.getElementById("demo").innerHTML = x;
      var y = document.getElementById("myRange1").value;
      document.getElementById("demo1").innerHTML = y;
      var z = document.getElementById("myRange2").value;
      document.getElementById("demo2").innerHTML = z;
      var w = document.getElementById("myRange3").value;
      document.getElementById("demo3").innerHTML = w;
  }
}

