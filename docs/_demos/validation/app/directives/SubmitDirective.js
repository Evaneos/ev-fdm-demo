'use strict';

var module = angular.module('ev-fdm')
.directive('evSubmit', ['$parse', function($parse) {
    return {
        restrict: 'A',
        require: 'form',
        link: function(scope, element, attrs, form) {
            var eventName = 'submit',
                fn = $parse(attrs['evSubmit'], /* interceptorFn */ null, /* expensiveChecks */ true);

            element.on(eventName, function(event) {
                var callback = function() {
                    if (form.$valid) {
                        fn(scope, {$event:event});
                    }
                };

                scope.$broadcast('ev-validable');

                scope.$apply(callback);
            });
        }
    };
}]);
