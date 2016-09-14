angular
  .module('Meet2Eat')
  .factory('User', User);

User.$inject = ["$resource", "API_URL", "formData"];
function User($resource, API_URL, formData){
  return $resource(API_URL + "/users/:id", { id: '@_id'},{
    update: { 
      method: "PUT",
      headers: { 'Content-Type': undefined },
      transformRequest: formData.transform
    },
    login: { method: "POST", url: API_URL + "/login" },
    register: {
     method: "POST",
     headers: { 'Content-Type': undefined },
     transformRequest: formData.transform
    },
    facebook: { method: "POST", url: API_URL + "/facebook"}
  });
}