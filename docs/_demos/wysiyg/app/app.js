'use strict';


var app = angular.module('wysiwyg-demo', [ 'ui.router', 'ev-fdm', 'ui.tinymce'])
    .controller('demo', function ($scope) {
        $scope.demoText = "The ship is more dosi now than star. united and mechanically strange.Proud, gutless scabbards begrudgingly trade a rainy, cold landlubber.";
    });
