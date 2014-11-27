
angular.module('demo')
    .controller('MainController', [ '$scope', function($scope) {
        $scope.user = {};
        $scope.password = "";

        $scope.submitted = 0;
        $scope.emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/

        $scope.submit = function() {
            $scope.submitted++;
        }
}]);
