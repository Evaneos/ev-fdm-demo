
angular.module('demo')
    .controller('MainController', [ '$scope', function($scope) {
        $scope.user = {};
        $scope.password = "";

        $scope.submitted = 0;

        $scope.formHasError = function(form) {
            angular.forEach(form, function(propVal, prop) {
                if (!prop || prop.indexOf('$') == 0) {
                    return;
                }
                propVal.evBlurred = true;
                $scope.hasError(propVal);
            })
        }

        $scope.hasError = function(input) {
            input.evHasError = !!(!input.$valid && input.evBlurred);
        }

        $scope.setBlur = function(input) {
            input.evBlurred = true;

            $scope.hasError(input);
        }

        $scope.inError = function(input) {
            return !input.$valid && input.$dirty && input.evBlurred
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
