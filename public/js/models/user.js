angular
  .module('Meet2Eat')
  .factory('User', User);

User.$inject = ["$resource", "API_URL"];
function User($resource, API_URL){
  return $resource(API_URL + "/users/:id", { id: '@_id'},{
    update: { 
      method: "PUT",
      headers: { 'Content-Type': undefined},
    },

    save:{
      method: "POST",
      headers: { 'Content-Type': undefined},
    },

    login: { method: "POST", url: API_URL + "/login" },
    register: { method: "POST", url: API_URL + "/register"},
    facebook: { method: "POST", url: API_URL + "/facebook"}
  });
}