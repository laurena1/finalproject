/* We've buried the AngularJS controller/module down in the static area of the
   site.  We use the http middleware to handle a get to the user profile.
   This was set up in the routes.js Express module.
*/
angular.module('myApp', []).
    //sets up the controller on this module
    controller('myController', ['$scope', '$http',
        function($scope, $http) {
            $http.get('/user/profile')
            .success(function(data, status, headers, config) {
                $scope.user = data;
                $scope.error = "";
            }).
            error(function(data, status, headers, config) {
                $scope.user = {};
                $scope.error = data;
            });
        }
]);