'use strict';

var module = angular.module('ev-fdm')
.directive('evErrorMessage', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            input: '='
        },
        template: '<li ng-if="input[\'evHasError\'] && input.$error[error]" ng-transclude></li>',
        link: function(scope, elements, attrs) {
            scope.error = attrs.error;
        }
    };
});
