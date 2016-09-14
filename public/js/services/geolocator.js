angular
  .module("Meet2Eat")
  .factory("Geolocator", Geolocator);

Geolocator.$inject = ['$q', '$window', '$rootScope'];
function Geolocator($q, $window, $rootScope) {
    return function() {
        var deferred = $q.defer();

        if (!$window.navigator) {
            $rootScope.$apply(function() {
                deferred.reject(new Error("Geolocation is not supported"));
            });
        } else {
            $window.navigator.geolocation.getCurrentPosition(function (position) {
                $rootScope.$apply(function() {
                    var latLng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    deferred.resolve(latLng);
                });
            }, function (error) {
                $rootScope.$apply(function() {
                    deferred.reject(error);
                });
            });
        }

        return deferred.promise;
    }
};


//http://www.proccli.com/2013/10/angularjs-geolocation-service