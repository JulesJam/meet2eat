angular
  .module('Meet2Eat')
  .controller("ChatController", ChatController);

// we need the window object because client io load on to the window
// if you wre eserving the back end from a different server you would put the server address as this  var socket =$window.io("http://localhost:3000");
//multiple socktes on the server side only one on the client side

ChatController.$inject = ["User", "$state","$window","$scope", "$rootScope", "$auth"];
function ChatController(User, $state, $window, $scope, $rootScope, $auth){
  self = this;
  var socket =$window.io();
  
  this.connected = false;
  var username = "";
  this.sendername = $auth.getPayload().username;

  console.log ("sender name",this.sendername);

  

  this.selected = User.get($state.params,function(data){
    username = data.username;
    console.log("name",username);
    return username;
  });





  socket.on('connect', function() {

    socket
      .emit('authenticate', { token: $auth.getToken()})
      .on('authenticated', function() {
        $rootScope.$applyAsync(function() {
          self.connected = true;
          
        });
      })
      .on('unauthorized', function() {
        $rootScope.$applyAsync(function() {
          self.connected = false;
          console.log("Not authorised to connect");
        });
      });


    socket.on('disconnect', function(){
      $rootScope.$applyAsync(function() {
        self.connected = false;
      });
    });
  });     

  this.message = null;

  this.all = [];


  this.sendMessage = function() {
    console.log("trying to send",this.selected.username);
    socket.emit("pm", { message: this.message, username: this.sendername, recipient: this.selected.username});
    this.message = null;
  }

  socket.on('pm', function(message) {
      
      $rootScope.$evalAsync(function() {
        console.log("this is the message from",message.username, "to",message.recipient);
       
        self.all.push(message);
       
      });
    });
  }