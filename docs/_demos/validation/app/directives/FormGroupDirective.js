'use strict';

var module = angular.module('ev-fdm')
.directive('formGroup', ['$parse', '$rootScope', function($parse, $rootScope) {
    return {
        restrict: 'C',
        scope: true,
        link: function(scope, element, attrs, form) {
            scope.$on('ev-validate-invalid', function(e) {
                element.addClass('has-error');
                e.stopPropagation();
            });

            scope.$on('ev-validate-valid', function(e) {
                element.removeClass('has-error');
                e.stopPropagation();
            });
        }
    };
}]);
