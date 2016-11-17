angular
  .module("Meet2Eat")
  .factory("RestaurantLookUp", RestaurantLookUp);

RestaurantLookUp.$inject = ['User', '$http'];
function RestaurantLookUp(User, $http) {
  return {
    getCuisines: function(location) {
      return $http({
        method: 'GET',
        url: '/api/restaurants/cuisines',
        params: location
      })
      .then(function(results) {
        return results.data;
      });
    }
  }
}