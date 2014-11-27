'use strict';

var module = angular.module('ev-fdm')
/**
 * DONE: makeValidable only happens after first blur or when ev-validable event occurs.
 * TO DO: expose makeValidable, to provides validation directly
 * on focus or on when a key is entered
 */
.directive('evValidable', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var hasError = function() {
                model.evHasError = !!(!model.$valid && model.evValidable);
            };

            var makeValidable = function() {
                model.evValidable = true;
                hasError();
            };

            element.on('blur', function() {
                scope.$apply(makeValidable);
            });

            element.on('keyup', function() {
                scope.$apply(function() {
                    hasError();
                });
            });

            scope.$on('ev-validable', makeValidable);
        }
    };
});
