angular
  .module("Meet2Eat")
  .factory("RestaurantLookUp", RestaurantLookUp);

RestaurantLookUp.$inject = ['User'];
function Geocoder('User') {
    



    return function(latLng) {
        console.log(latLng);
        var deferred = $q.defer();

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: latLng }, function(results, status) {
            if(status === 'OK') {
                $rootScope.$apply(function() {
                    deferred.resolve(results[0]);
                });
            }
            else {
                $rootScope.$apply(function() {
                    deferred.reject(status);
                });
            }
        });

        return deferred.promise;
    }
};