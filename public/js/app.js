angular
  .module("Meet2Eat", ['ui.router', 'ngResource', 'angular-jwt', 'satellizer'])
  .constant("API_URL", "http://localhost:3000/api")
  .config(setupInterceptor)
  .config(Router);

setupInterceptor.$inject = ["$httpProvider"];
function setupInterceptor($httpProvider){
  return $httpProvider.interceptors.push("AuthInterceptor");
}



Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/templates/home.html"
    })
    .state("register", {
      url: "/register",
      templateUrl: "/templates/register.html",
      controller: "RegisterController as register"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state("users", {
      url: "/users",
      templateUrl: "/templates/users.html",
      controller: "UsersController as users"
    })

    .state("usersShow",{
      url:"/users/:id",
      templateUrl:"templates/usersShow.html",
      controller: "UsersShowController as usersShow"
    })

    .state("chat", {
       url: "/chat/:id",
       templateUrl: "/templates/chat.html",
       controller: "ChatController as chat"
    })

   .state("usersEdit",{
        url:"/users/:id/edit",
        templateUrl:"templates/usersEdit.html",
        controller: "UsersEditController as usersEdit"
      })

    .state("map", {
      url: "/map",
      templateUrl: "/templates/map.html",
      controller: "MapController as main"
    })
   

  $urlRouterProvider.otherwise("/");
}


