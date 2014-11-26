
angular.module('demo')
    .controller('MainController', [ '$scope', function($scope) {
        $scope.user = {};
        $scope.password = "";

        $scope.submitted = 0;
        $scope.emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/

        $scope.formHasError = function(form) {
            angular.forEach(form, function(propVal, prop) {
                if (!prop || prop.indexOf('$') == 0) {
                    return;
                }
                propVal.evValidable = true;
                $scope.hasError(propVal);
            })
        }

        $scope.hasError = function(input) {
            input.evHasError = !!(!input.$valid && input.evValidable);
        }

        $scope.setValidable = function(input) {
            input.evValidable = true;

            $scope.hasError(input);
        }

        $scope.submit = function() {
            var form = $scope.myForm;

            if (!form.$valid) {
                $scope.formHasError(form);
                return;
            }

            $scope.submitted++;
        }
}]);
